import {
  EXECUTE_AFFIRMATION_HASH,
  EXECUTE_SIGNATURES_HASH,
  FOREIGN_EXPLORER_API,
  HOME_EXPLORER_API,
  SUBMIT_SIGNATURE_HASH
} from '../config/constants'

export interface APITransaction {
  timeStamp: string
  isError: string
  input: string
  to: string
  hash: string
}

export interface APIPendingTransaction {
  input: string
  to: string
  hash: string
}

export interface PendingTransactionsParams {
  account: string
  api: string
}

export interface AccountTransactionsParams {
  account: string
  to: string
  startTimestamp: number
  endTimestamp: number
  api: string
}

export interface GetFailedTransactionParams {
  account: string
  to: string
  messageData: string
  startTimestamp: number
  endTimestamp: number
  _bridge: string
}

export interface GetPendingTransactionParams {
  account: string
  to: string
  messageData: string
  _bridge: string
}

export const fetchAccountTransactionsFromBlockscout = async ({
  account,
  to,
  startTimestamp,
  endTimestamp,
  api
}: AccountTransactionsParams): Promise<APITransaction[]> => {
  const url = `${api}?module=account&action=txlist&address=${account}&filterby=from=${account}&to=${to}&starttimestamp=${startTimestamp}&endtimestamp=${endTimestamp}`

  try {
    const result = await fetch(url).then(res => res.json())
    if (result.status === '0') {
      return []
    }

    return result.result
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getBlockByTimestampUrl = (api: string, timestamp: number) =>
  `${api}&module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before`

export const fetchAccountTransactionsFromEtherscan = async ({
  account,
  to,
  startTimestamp,
  endTimestamp,
  api
}: AccountTransactionsParams): Promise<APITransaction[]> => {
  const startBlockUrl = getBlockByTimestampUrl(api, startTimestamp)
  const endBlockUrl = getBlockByTimestampUrl(api, endTimestamp)
  let fromBlock = 0
  let toBlock = 9999999999999
  try {
    const [fromBlockResult, toBlockResult] = await Promise.all([
      fetch(startBlockUrl).then(res => res.json()),
      fetch(endBlockUrl).then(res => res.json())
    ])

    if (fromBlockResult.status !== '0') {
      fromBlock = parseInt(fromBlockResult.result)
    }

    if (toBlockResult.status !== '0') {
      toBlock = parseInt(toBlockResult.result)
    }
  } catch (e) {
    console.log(e)
    return []
  }

  const url = `${api}&module=account&action=txlist&address=${account}&startblock=${fromBlock}&endblock=${toBlock}`

  try {
    const result = await fetch(url).then(res => res.json())

    if (result.status === '0') {
      return []
    }

    const toAddressLowerCase = to.toLowerCase()
    const transactions: APITransaction[] = result.result
    return transactions.filter(t => t.to.toLowerCase() === toAddressLowerCase)
  } catch (e) {
    console.log(e)
    return []
  }
}

export const fetchAccountTransactions = (api: string) => {
  return api.includes('blockscout') ? fetchAccountTransactionsFromBlockscout : fetchAccountTransactionsFromEtherscan
}

export const fetchPendingTransactions = async ({
  account,
  api
}: PendingTransactionsParams): Promise<APIPendingTransaction[]> => {
  const url = `${api}?module=account&action=pendingtxlist&address=${account}`

  try {
    const result = await fetch(url).then(res => res.json())
    if (result.status === '0') {
      return []
    }

    return result.result
  } catch (e) {
    return []
  }
}

export const getFailedTransactions = async (
  account: string,
  to: string,
  startTimestamp: number,
  endTimestamp: number,
  api: string,
  fetchAccountTransactions: (args: AccountTransactionsParams) => Promise<APITransaction[]>
): Promise<APITransaction[]> => {
  const transactions = await fetchAccountTransactions({ account, to, startTimestamp, endTimestamp, api })

  return transactions.filter(t => t.isError !== '0')
}

export const getSuccessTransactions = async (
  account: string,
  to: string,
  startTimestamp: number,
  endTimestamp: number,
  api: string,
  fetchAccountTransactions: (args: AccountTransactionsParams) => Promise<APITransaction[]>
): Promise<APITransaction[]> => {
  const transactions = await fetchAccountTransactions({ account, to, startTimestamp, endTimestamp, api })

  return transactions.filter(t => t.isError === '0')
}

export const filterValidatorSignatureTransaction = (
  transactions: APITransaction[],
  messageData: string,
  _bridge: string
): APITransaction[] => {
  if (_bridge === 'NATIVE') {
    const messageDataValue = messageData.replace('0x', '').toLowerCase()
    return transactions.filter(
      t =>
        (t.input.includes(SUBMIT_SIGNATURE_HASH[_bridge]) && t.input.includes(messageDataValue)) ||
        (t.input.includes(EXECUTE_AFFIRMATION_HASH[_bridge]) &&
          t.input.includes(messageDataValue.substr(0, 40 + 64 + 64)))
    )
  } else {
    const messageDataValue = messageData.replace('0x', '').toLowerCase()
    return transactions.filter(
      t =>
        (t.input.includes(SUBMIT_SIGNATURE_HASH[_bridge]) || t.input.includes(EXECUTE_AFFIRMATION_HASH[_bridge])) &&
        t.input.includes(messageDataValue)
    )
  }
}

export const getValidatorFailedTransactionsForMessage = async ({
  account,
  to,
  messageData,
  startTimestamp,
  endTimestamp,
  _bridge
}: GetFailedTransactionParams): Promise<APITransaction[]> => {
  const failedTransactions = await getFailedTransactions(
    account,
    to,
    startTimestamp,
    endTimestamp,
    HOME_EXPLORER_API,
    fetchAccountTransactionsFromBlockscout
  )
  return filterValidatorSignatureTransaction(failedTransactions, messageData, _bridge)
}

export const getValidatorSuccessTransactionsForMessage = async ({
  account,
  to,
  messageData,
  startTimestamp,
  endTimestamp,
  _bridge
}: GetFailedTransactionParams): Promise<APITransaction[]> => {
  const transactions = await getSuccessTransactions(
    account,
    to,
    startTimestamp,
    endTimestamp,
    HOME_EXPLORER_API,
    fetchAccountTransactionsFromBlockscout
  )
  return filterValidatorSignatureTransaction(transactions, messageData, _bridge)
}

export const getExecutionFailedTransactionForMessage = async (
  { account, to, messageData, startTimestamp, endTimestamp, _bridge }: GetFailedTransactionParams,
  getFailedTransactionsMethod = getFailedTransactions
): Promise<APITransaction[]> => {
  const failedTransactions = await getFailedTransactionsMethod(
    account,
    to,
    startTimestamp,
    endTimestamp,
    FOREIGN_EXPLORER_API,
    fetchAccountTransactions(FOREIGN_EXPLORER_API)
  )

  const messageDataValue = messageData.replace('0x', '')
  return failedTransactions.filter(
    t => t.input.includes(EXECUTE_SIGNATURES_HASH[_bridge]) && t.input.includes(messageDataValue)
  )
}

export const getValidatorPendingTransactionsForMessage = async (
  { account, to, messageData, _bridge }: GetPendingTransactionParams,
  fetchPendingTransactionsMethod = fetchPendingTransactions
): Promise<APIPendingTransaction[]> => {
  const pendingTransactions = await fetchPendingTransactionsMethod({
    account,
    api: HOME_EXPLORER_API
  })

  const toAddressLowerCase = to.toLowerCase()
  const messageDataValue = messageData.replace('0x', '')

  if (_bridge === 'NATIVE') {
    return pendingTransactions.filter(
      t =>
        t.to.toLowerCase() === toAddressLowerCase &&
        ((t.input.includes(SUBMIT_SIGNATURE_HASH[_bridge]) && t.input.includes(messageDataValue)) ||
          (t.input.includes(EXECUTE_AFFIRMATION_HASH[_bridge]) &&
            t.input.includes(messageDataValue.substr(0, 40 + 64 + 64)))) // recipient:20 bytes , value:32 bytes(uint256) , txhash:32 bytes
    )
  } else {
    return pendingTransactions.filter(
      t =>
        t.to.toLowerCase() === toAddressLowerCase &&
        (t.input.includes(SUBMIT_SIGNATURE_HASH[_bridge]) || t.input.includes(EXECUTE_AFFIRMATION_HASH[_bridge])) &&
        t.input.includes(messageDataValue)
    )
  }
}

export const getExecutionPendingTransactionsForMessage = async (
  { account, to, messageData, _bridge }: GetPendingTransactionParams,
  fetchPendingTransactionsMethod = fetchPendingTransactions
): Promise<APIPendingTransaction[]> => {
  const pendingTransactions = await fetchPendingTransactionsMethod({
    account,
    api: FOREIGN_EXPLORER_API
  })

  const toAddressLowerCase = to.toLowerCase()
  const messageDataValue = messageData.replace('0x', '')

  return pendingTransactions.filter(
    t =>
      t.to.toLowerCase() === toAddressLowerCase &&
      t.input.includes(EXECUTE_SIGNATURES_HASH[_bridge]) &&
      t.input.includes(messageDataValue)
  )
}
