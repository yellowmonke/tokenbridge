import { useEffect, useState } from 'react'
import { HOME_AMB_ABI, FOREIGN_AMB_ABI } from '../abis'
import { FOREIGN_BRIDGE_ADDRESS, HOME_BRIDGE_ADDRESS } from '../config/constants'
import { Contract } from 'web3-eth-contract'
import Web3 from 'web3'
import { homedir } from 'os'

export interface useBridgeContractsParams {
  homeNativeWeb3: Web3
  foreignNativeWeb3: Web3
  homeAMBWeb3: Web3
  foreignAMBWeb3: Web3
}

export const useBridgeContracts = ({
  homeNativeWeb3,
  foreignNativeWeb3,
  homeAMBWeb3,
  foreignAMBWeb3
}: useBridgeContractsParams) => {
  const [homeNativeBridge, setHomeNativeBridge] = useState<Maybe<Contract>>(null)
  const [foreignNativeBridge, setForeignNativeBridge] = useState<Maybe<Contract>>(null)
  const [homeAMBBridge, setHomeAMBBridge] = useState<Maybe<Contract>>(null)
  const [foreignAMBBridge, setForeignAMBBridge] = useState<Maybe<Contract>>(null)
  //Determine AMB
  useEffect(
    () => {
      if (!homeAMBWeb3) return
      const homeContract = new homeAMBWeb3.eth.Contract(HOME_AMB_ABI['AMB'], HOME_BRIDGE_ADDRESS['AMB'])
      setHomeAMBBridge(homeContract)
    },
    [homeAMBWeb3]
  )

  useEffect(
    () => {
      if (!foreignAMBWeb3) return
      const foreignContract = new foreignAMBWeb3.eth.Contract(FOREIGN_AMB_ABI['AMB'], FOREIGN_BRIDGE_ADDRESS['AMB'])
      setForeignAMBBridge(foreignContract)
    },
    [foreignAMBWeb3]
  )
  //Determine Native
  useEffect(
    () => {
      if (!homeNativeWeb3) return
      const homeContract = new homeNativeWeb3.eth.Contract(HOME_AMB_ABI['NATIVE'], HOME_BRIDGE_ADDRESS['NATIVE'])
      setHomeNativeBridge(homeContract)
    },
    [homeNativeWeb3]
  )

  useEffect(
    () => {
      if (!foreignNativeWeb3) return
      const foreignContract = new foreignNativeWeb3.eth.Contract(
        FOREIGN_AMB_ABI['NATIVE'],
        FOREIGN_BRIDGE_ADDRESS['NATIVE']
      )
      setForeignNativeBridge(foreignContract)
    },
    [foreignNativeWeb3]
  )

  return {
    homeNativeBridge,
    foreignNativeBridge,
    homeAMBBridge,
    foreignAMBBridge
  }
}
