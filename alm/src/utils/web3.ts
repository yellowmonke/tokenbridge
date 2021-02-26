import Web3 from 'web3'
import { BlockTransactionString } from 'web3-eth'
import { TransactionReceipt } from 'web3-eth'
import { AbiItem } from 'web3-utils'
import memoize from 'fast-memoize'
import promiseRetry from 'promise-retry'
import { HOME_AMB_ABI, FOREIGN_AMB_ABI } from '../abis'
import { SnapshotProvider } from '../services/SnapshotProvider'
import { FOREIGN_BRIDGE_ADDRESS } from '../config/constants'

export interface ArbitraryMessageObject {
  id: string
  data: string
}

export interface NativeMessageObject {
  recipient : string
  value : string
  txhash : string
  contract : string
  _hash : string
  _hashSansContract : string
  
}

export const encodeNativeMessageObject = (
  message : NativeMessageObject,
  web3: Web3
) : string => {
  let s = '';
  const recipient = message.recipient.replace('0x' , '').toLowerCase()
  const value = web3.eth.abi.encodeParameter('uint256' , message.value).replace('0x' , '').toLowerCase()
  const txhash = message.txhash.replace('0x' , '').toLowerCase()
  const contract = message.contract.replace('0x' , '').toLowerCase()
  s = '0x' + recipient + value + txhash + contract
  return s
}



const rawGetWeb3 = (url: string) => new Web3(new Web3.providers.HttpProvider(url))
const memoized = memoize(rawGetWeb3)

export const getWeb3 = (url: string) => memoized(url)



export const filterEventsByAbi = (
  txReceipt: TransactionReceipt,
  web3: Web3,
  bridgeAddress: string,
  eventAbi: AbiItem
): NativeMessageObject[] => {
  const eventHash = web3.eth.abi.encodeEventSignature(eventAbi)
  const events = txReceipt.logs.filter(e => e.address === bridgeAddress && e.topics[0] === eventHash)

  return events.map(e => {
    let decodedLogs: { [p: string]: string } = {
      recipient: '',
      value: ''
    }
    if (eventAbi && eventAbi.inputs && eventAbi.inputs.length) {
      decodedLogs = web3.eth.abi.decodeLog(eventAbi.inputs, e.data, [e.topics[0]])
    }

    return { 
      recipient: decodedLogs.recipient, 
      value: decodedLogs.value, 
      txhash: txReceipt.transactionHash, 
      contract : FOREIGN_BRIDGE_ADDRESS,
      _hash : web3.utils.soliditySha3Raw(decodedLogs.recipient , decodedLogs.value , txReceipt.transactionHash , FOREIGN_BRIDGE_ADDRESS),
      _hashSansContract : web3.utils.soliditySha3Raw(decodedLogs.recipient , decodedLogs.value , txReceipt.transactionHash),

    }
  })
}

//AMB filter
// export const filterEventsByAbi = (
//   txReceipt: TransactionReceipt,
//   web3: Web3,
//   bridgeAddress: string,
//   eventAbi: AbiItem
// ): MessageObject[] => {
//   const eventHash = web3.eth.abi.encodeEventSignature(eventAbi)
//   const events = txReceipt.logs.filter(e => e.address === bridgeAddress && e.topics[0] === eventHash)

//   return events.map(e => {
//     let decodedLogs: { [p: string]: string } = {
//       messageId: '',
//       encodedData: ''
//     }
//     if (eventAbi && eventAbi.inputs && eventAbi.inputs.length) {
//       decodedLogs = web3.eth.abi.decodeLog(eventAbi.inputs, e.data, [e.topics[1]])
//     }
//     console.log(decodedLogs.recipient , decodedLogs.value);
    
//     return { id: decodedLogs.recipient, data: decodedLogs.value }
//   })
// }

export const getHomeMessagesFromReceipt = (txReceipt: TransactionReceipt, web3: Web3, bridgeAddress: string) => {
  const UserRequestForSignatureAbi: AbiItem = HOME_AMB_ABI.filter(
    (e: AbiItem) => e.type === 'event' && e.name === 'UserRequestForSignature'
  )[0]
  return filterEventsByAbi(txReceipt, web3, bridgeAddress, UserRequestForSignatureAbi)
}

export const getForeignMessagesFromReceipt = (txReceipt: TransactionReceipt, web3: Web3, bridgeAddress: string) => {
  const userRequestForAffirmationAbi: AbiItem = FOREIGN_AMB_ABI.filter(
    (e: AbiItem) => e.type === 'event' && e.name === 'UserRequestForAffirmation'
  )[0]
  return filterEventsByAbi(txReceipt, web3, bridgeAddress, userRequestForAffirmationAbi)
}

// In some rare cases the block data is not available yet for the block of a new event detected
// so this logic retry to get the block in case it fails
export const getBlock = async (web3: Web3, blockNumber: number): Promise<BlockTransactionString> =>
  promiseRetry(async retry => {
    const result = await web3.eth.getBlock(blockNumber)
    if (!result) {
      return retry('Error getting block data')
    }
    return result
  })

export const getChainId = async (web3: Web3, snapshotProvider: SnapshotProvider) => {
  let id = snapshotProvider.chainId()
  if (id === 0) {
    id = await web3.eth.getChainId()
  }
  return id
}
