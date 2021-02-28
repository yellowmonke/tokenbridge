import { useEffect, useState } from 'react'
import { TransactionReceipt } from 'web3-eth'
import { useStateProvider } from '../state/StateProvider'
import { Contract } from 'web3-eth-contract'
import { getRequiredBlockConfirmations } from '../utils/contract'
import {
  foreignNativeSnapshotProvider,
  homeNativeSnapshotProvider,
  foreignAMBSnapshotProvider,
  homeAMBSnapshotProvider,
  SnapshotProvider
} from '../services/SnapshotProvider'

export interface UseBlockConfirmationsParams {
  fromHome: boolean
  receipt: Maybe<TransactionReceipt>
  _bridge: string
}

export const useBlockConfirmations = ({ receipt, fromHome, _bridge }: UseBlockConfirmationsParams) => {
  const [blockConfirmations, setBlockConfirmations] = useState(0)

  const { homeNative, foreignNative, homeAMB, foreignAMB } = useStateProvider()
  const home = _bridge === 'NATIVE' ? homeNative : homeAMB
  const foreign = _bridge === 'NATIVE' ? foreignNative : foreignAMB

  const callRequireBlockConfirmations = async (
    contract: Contract,
    receipt: TransactionReceipt,
    setResult: Function,
    snapshotProvider: SnapshotProvider
  ) => {
    const result = await getRequiredBlockConfirmations(contract, receipt.blockNumber, snapshotProvider)
    setResult(result)
  }

  useEffect(
    () => {
      const bridgeContract = fromHome ? home.bridgeContract : foreign.bridgeContract
      const snapshotProvider = fromHome
        ? _bridge === 'NATIVE'
          ? homeNativeSnapshotProvider
          : homeAMBSnapshotProvider
        : _bridge === 'NATIVE'
          ? foreignNativeSnapshotProvider
          : foreignAMBSnapshotProvider

      if (!bridgeContract || !receipt) return

      callRequireBlockConfirmations(bridgeContract, receipt, setBlockConfirmations, snapshotProvider)
    },
    [home.bridgeContract, foreign.bridgeContract, receipt, fromHome]
  )

  return {
    blockConfirmations
  }
}
