import { useEffect, useState } from 'react'
import { TransactionReceipt } from 'web3-eth'
import { HOME_RPC_POLLING_INTERVAL, TRANSACTION_STATUS } from '../config/constants'
import { getTransactionStatusDescription } from '../utils/networks'
import { useStateProvider } from '../state/StateProvider'
import { getForeignMessagesFromReceipt, getHomeMessagesFromReceipt, MessageObject, getBlock } from '../utils/web3'

import useInterval from '@use-it/interval'

export const useTransactionStatus = ({
  txHash,
  chainId,
  receiptParam
}: {
  txHash: string
  chainId: number
  receiptParam: Maybe<TransactionReceipt>
}) => {
  const { homeNative, foreignNative, homeAMB, foreignAMB } = useStateProvider()
  const [messagesAMB, setMessagesAMB] = useState<Array<MessageObject>>([])
  const [messagesNative, setMessagesNative] = useState<Array<MessageObject>>([])

  const [status, setStatus] = useState('')
  const [description, setDescription] = useState('')
  const [receipt, setReceipt] = useState<Maybe<TransactionReceipt>>(null)
  const [timestamp, setTimestamp] = useState(0)
  const [loading, setLoading] = useState(true)

  const emptyMessage: MessageObject = {
    recipient: '',
    value: '',
    txhash: txHash,
    contract: '',
    _hash: '',
    _hashSansContract: '',
    id: txHash,
    data: ''
  }
  // Update description so the time displayed is accurate
  useInterval(() => {
    if (!status || !timestamp || !description) return
    setDescription(getTransactionStatusDescription(status, timestamp))
  }, 30000) //go back here

  useEffect(
    () => {
      const subscriptions: Array<number> = []

      const unsubscribe = () => {
        subscriptions.forEach(s => {
          clearTimeout(s)
        })
      }

      const getReceipt = async () => {
        if (
          !chainId ||
          !txHash ||
          !homeNative.chainId ||
          !foreignNative.chainId ||
          !homeNative.web3 ||
          !foreignNative.web3 ||
          !homeAMB.chainId ||
          !foreignAMB.chainId ||
          !homeAMB.web3 ||
          !foreignAMB.web3
        )
          return
        setLoading(true)
        const isHome = chainId === homeNative.chainId
        const web3 = isHome ? homeNative.web3 : foreignNative.web3 //CHECK

        let txReceipt

        if (receiptParam) {
          txReceipt = receiptParam
        } else {
          txReceipt = await web3.eth.getTransactionReceipt(txHash)
        }

        setReceipt(txReceipt)

        if (!txReceipt) {
          setStatus(TRANSACTION_STATUS.NOT_FOUND)
          setDescription(getTransactionStatusDescription(TRANSACTION_STATUS.NOT_FOUND))
          setMessagesNative([emptyMessage])
          setMessagesAMB([emptyMessage])
          const timeoutId = setTimeout(() => getReceipt(), HOME_RPC_POLLING_INTERVAL)
          subscriptions.push(timeoutId)
        } else {
          const blockNumber = txReceipt.blockNumber
          const block = await getBlock(web3, blockNumber)
          const blockTimestamp = typeof block.timestamp === 'string' ? parseInt(block.timestamp) : block.timestamp
          setTimestamp(blockTimestamp)
          if (txReceipt.status) {
            let bridgeMessagesNative: Array<MessageObject>
            let bridgeMessagesAMB: Array<MessageObject>
            if (isHome) {
              bridgeMessagesNative = getHomeMessagesFromReceipt(
                txReceipt,
                homeNative.web3,
                homeNative.bridgeAddress,
                'NATIVE'
              )
              bridgeMessagesAMB = getHomeMessagesFromReceipt(txReceipt, homeAMB.web3, homeAMB.bridgeAddress, 'AMB')
            } else {
              bridgeMessagesNative = getForeignMessagesFromReceipt(
                txReceipt,
                foreignNative.web3,
                foreignNative.bridgeAddress,
                'NATIVE'
              )
              bridgeMessagesAMB = getForeignMessagesFromReceipt(
                txReceipt,
                foreignAMB.web3,
                foreignAMB.bridgeAddress,
                'AMB'
              )
            }

            if (bridgeMessagesNative.length === 0 && bridgeMessagesAMB.length === 0) {
              setMessagesNative([emptyMessage])
              setMessagesAMB([emptyMessage])
              setStatus(TRANSACTION_STATUS.SUCCESS_NO_MESSAGES)
              setDescription(getTransactionStatusDescription(TRANSACTION_STATUS.SUCCESS_NO_MESSAGES, blockTimestamp))
            } else if (bridgeMessagesNative.length === 1 || bridgeMessagesAMB.length === 1) {
              // setMessages(bridgeMessages)
              bridgeMessagesAMB.length === 1
                ? setMessagesAMB(bridgeMessagesAMB)
                : setMessagesNative(bridgeMessagesNative)
              setStatus(TRANSACTION_STATUS.SUCCESS_ONE_MESSAGE)
              setDescription(getTransactionStatusDescription(TRANSACTION_STATUS.SUCCESS_ONE_MESSAGE, blockTimestamp))
            } else {
              bridgeMessagesAMB.length > 1 ? setMessagesAMB(bridgeMessagesAMB) : setMessagesNative(bridgeMessagesNative)
              setStatus(TRANSACTION_STATUS.SUCCESS_MULTIPLE_MESSAGES)
              setDescription(
                getTransactionStatusDescription(TRANSACTION_STATUS.SUCCESS_MULTIPLE_MESSAGES, blockTimestamp)
              )
            }
          } else {
            setStatus(TRANSACTION_STATUS.FAILED)
            setDescription(getTransactionStatusDescription(TRANSACTION_STATUS.FAILED, blockTimestamp))
          }
        }
        setLoading(false)
      }

      // unsubscribe from previous txHash
      unsubscribe()

      getReceipt()
      return () => {
        // unsubscribe when unmount component
        unsubscribe()
      }
    },
    [
      txHash,
      chainId,
      homeNative.chainId,
      foreignNative.chainId,
      homeAMB.chainId,
      foreignAMB.chainId,
      homeNative.web3,
      foreignNative.web3,
      homeAMB.web3,
      foreignAMB.web3,
      homeNative.bridgeAddress,
      foreignNative.bridgeAddress,
      homeNative.bridgeAddress,
      foreignNative.bridgeAddress,
      receiptParam
    ]
  )

  return {
    messagesNative,
    messagesAMB,
    status,
    description,
    receipt,
    timestamp,
    loading
  }
}
