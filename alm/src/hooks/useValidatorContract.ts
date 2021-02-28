import { useEffect, useState } from 'react'
import { Contract } from 'web3-eth-contract'
import Web3 from 'web3'
import { getRequiredSignatures, getValidatorAddress, getValidatorList } from '../utils/contract'
import { BRIDGE_VALIDATORS_ABI } from '../abis'
import { useStateProvider } from '../state/StateProvider'
import { TransactionReceipt } from 'web3-eth'
import {
  foreignNativeSnapshotProvider,
  homeNativeSnapshotProvider,
  foreignAMBSnapshotProvider,
  homeAMBSnapshotProvider,
  SnapshotProvider
} from '../services/SnapshotProvider'

export interface useValidatorContractParams {
  fromHome: boolean
  receipt: Maybe<TransactionReceipt>
  _bridge: string
}

export const useValidatorContract = ({ receipt, fromHome, _bridge }: useValidatorContractParams) => {
  const [validatorContract, setValidatorContract] = useState<Maybe<Contract>>(null)
  const [requiredSignatures, setRequiredSignatures] = useState(0)
  const [validatorList, setValidatorList] = useState([])

  const { homeNative, foreignNative, homeAMB, foreignAMB } = useStateProvider()
  const home = _bridge === 'NATIVE' ? homeNative : homeAMB
  const foreign = _bridge === 'NATIVE' ? foreignNative : foreignAMB

  const callValidatorContract = async (bridgeContract: Maybe<Contract>, web3: Web3, setValidatorContract: Function) => {
    if (!web3 || !bridgeContract) return
    const address = await getValidatorAddress(bridgeContract)
    const contract = new web3.eth.Contract(BRIDGE_VALIDATORS_ABI[_bridge], address)
    setValidatorContract(contract)
  }

  const callRequiredSignatures = async (
    contract: Maybe<Contract>,
    receipt: TransactionReceipt,
    setResult: Function,
    snapshotProvider: SnapshotProvider
  ) => {
    if (!contract) return
    const result = await getRequiredSignatures(contract, receipt.blockNumber, snapshotProvider)
    setResult(result)
  }

  const callValidatorList = async (
    contract: Maybe<Contract>,
    receipt: TransactionReceipt,
    setResult: Function,
    snapshotProvider: SnapshotProvider
  ) => {
    if (!contract) return
    const result = await getValidatorList(contract, receipt.blockNumber, snapshotProvider)
    setResult(result)
  }

  useEffect(
    () => {
      const web3 = fromHome ? home.web3 : foreign.web3
      const bridgeContract = fromHome ? home.bridgeContract : foreign.bridgeContract

      if (!web3 || !bridgeContract) return
      callValidatorContract(bridgeContract, web3, setValidatorContract)
    },
    [home.web3, foreign.web3, home.bridgeContract, foreign.bridgeContract, fromHome]
  )

  useEffect(
    () => {
      if (!receipt) return

      const snapshotProvider = fromHome
        ? _bridge === 'NATIVE'
          ? homeNativeSnapshotProvider
          : homeAMBSnapshotProvider
        : _bridge === 'NATIVE'
          ? foreignNativeSnapshotProvider
          : foreignAMBSnapshotProvider

      callRequiredSignatures(validatorContract, receipt, setRequiredSignatures, snapshotProvider)
      callValidatorList(validatorContract, receipt, setValidatorList, snapshotProvider)
    },
    [validatorContract, receipt, fromHome]
  )

  return {
    requiredSignatures,
    validatorList
  }
}
