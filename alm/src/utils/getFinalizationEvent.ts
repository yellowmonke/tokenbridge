import { Contract, EventData } from 'web3-eth-contract'
import Web3 from 'web3'
import { CACHE_KEY_EXECUTION_FAILED, THREE_DAYS_TIMESTAMP, VALIDATOR_CONFIRMATION_STATUS } from '../config/constants'
import { ExecutionData } from '../hooks/useMessageConfirmations'
import {
  APIPendingTransaction,
  APITransaction,
  GetFailedTransactionParams,
  GetPendingTransactionParams
} from './explorer'
import { getBlock, MessageObject, encodeMessageObject } from './web3'
import validatorsCache from '../services/ValidatorsCache'

export const getFinalizationEvent = async (
  _bridge: string,
  contract: Maybe<Contract>,
  eventName: string,
  web3: Maybe<Web3>,
  setResult: React.Dispatch<React.SetStateAction<ExecutionData>>,
  waitingBlocksResolved: boolean,
  message: MessageObject,
  interval: number,
  subscriptions: number[],
  timestamp: number,
  collectedSignaturesEvent: Maybe<EventData>,
  getFailedExecution: (args: GetFailedTransactionParams) => Promise<APITransaction[]>,
  setFailedExecution: Function,
  getPendingExecution: (args: GetPendingTransactionParams) => Promise<APIPendingTransaction[]>,
  setPendingExecution: Function
) => {
  if (!contract || !web3 || !waitingBlocksResolved) return
  // Since it filters by the message id, only one event will be fetched
  // so there is no need to limit the range of the block to reduce the network traffic
  let events : EventData[];

  if(_bridge === "NATIVE"){
    const eevents: EventData[] = await contract.getPastEvents(eventName, {
      fromBlock: 0,
      toBlock: 'latest',
      filter: {
        recipient : message.recipient,
        value : message.value,
        transactionHash: message.txhash
      }
    })
    events = eevents.filter((e:EventData) => 
      e.returnValues.recipient == message.recipient &&
      e.returnValues.value == message.value &&
      e.returnValues.transactionHash == message.txhash  
    )
  } else {
    events = await contract.getPastEvents(eventName, {
      fromBlock: 0,
      toBlock: 'latest',
      filter: {
        messageId: message.id
      }
    })
  }
  
  if (events.length > 0) {
    const event = events[0]
    const [txReceipt, block] = await Promise.all([
      web3.eth.getTransactionReceipt(event.transactionHash),
      getBlock(web3, event.blockNumber)
    ])

    const blockTimestamp = typeof block.timestamp === 'string' ? parseInt(block.timestamp) : block.timestamp
    const validatorAddress = web3.utils.toChecksumAddress(txReceipt.from)

    setResult({
      status: VALIDATOR_CONFIRMATION_STATUS.SUCCESS,
      validator: validatorAddress,
      txHash: event.transactionHash,
      timestamp: blockTimestamp,
      executionResult: _bridge === "NATIVE" ? true : event.returnValues.status //CHECK
    })
  } else {
    // If event is defined, it means it is a message from Home to Foreign
    if (collectedSignaturesEvent) {
      const validator = collectedSignaturesEvent.returnValues.authorityResponsibleForRelay

      const pendingTransactions = await getPendingExecution({
        account: validator,
        messageData: encodeMessageObject(message , web3),
        to: contract.options.address,
        _bridge: _bridge
      })

      // If the transaction is pending it sets the status and avoid making the request for failed transactions
      if (pendingTransactions.length > 0) {
        const pendingTx = pendingTransactions[0]

        const nowTimestamp = Math.floor(new Date().getTime() / 1000.0)

        setResult({
          status: VALIDATOR_CONFIRMATION_STATUS.PENDING,
          validator: validator,
          txHash: pendingTx.hash,
          timestamp: nowTimestamp,
          executionResult: false
        })
        setPendingExecution(true)
      } else {//something might go wrong here
        const validatorExecutionCacheKey = `${CACHE_KEY_EXECUTION_FAILED}${validator}-${message._hash}`
        const failedFromCache = validatorsCache.get(validatorExecutionCacheKey)

        if (!failedFromCache) {
          const failedTransactions = await getFailedExecution({
            account: validator,
            to: contract.options.address,
            messageData: encodeMessageObject(message , web3),
            startTimestamp: timestamp,
            endTimestamp: timestamp + THREE_DAYS_TIMESTAMP,
            _bridge : _bridge
          })

          if (failedTransactions.length > 0) {
            const failedTx = failedTransactions[0]

            // If validator execution failed, we cache the result to avoid doing future requests for a result that won't change
            validatorsCache.set(validatorExecutionCacheKey, true)

            const timestamp = parseInt(failedTx.timeStamp)
            setResult({
              status: VALIDATOR_CONFIRMATION_STATUS.FAILED,
              validator: validator,
              txHash: failedTx.hash,
              timestamp,
              executionResult: false
            })
            setFailedExecution(true)
          }
        }
      }
    }

    const timeoutId = setTimeout(
      () =>
        getFinalizationEvent(
          _bridge,
          contract,
          eventName,
          web3,
          setResult,
          waitingBlocksResolved,
          message,
          interval,
          subscriptions,
          timestamp,
          collectedSignaturesEvent,
          getFailedExecution,
          setFailedExecution,
          getPendingExecution,
          setPendingExecution
        ),
      interval
    )
    subscriptions.push(timeoutId)
  }
}
