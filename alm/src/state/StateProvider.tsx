import React, { createContext, ReactNode } from 'react'
import { useNetwork } from '../hooks/useNetwork'
import {
  HOME_RPC_URL,
  FOREIGN_RPC_URL,
  HOME_BRIDGE_ADDRESS,
  FOREIGN_BRIDGE_ADDRESS,
  HOME_NETWORK_NAME,
  FOREIGN_NETWORK_NAME
} from '../config/constants'
import Web3 from 'web3'
import { useBridgeContracts } from '../hooks/useBridgeContracts'
import { Contract } from 'web3-eth-contract'
import {
  foreignNativeSnapshotProvider,
  homeNativeSnapshotProvider,
  foreignAMBSnapshotProvider,
  homeAMBSnapshotProvider
} from '../services/SnapshotProvider'

export interface BaseNetworkParams {
  chainId: number
  name: string
  web3: Maybe<Web3>
  bridgeAddress: string
  bridgeContract: Maybe<Contract>
}

export interface StateContext {
  homeNative: BaseNetworkParams
  foreignNative: BaseNetworkParams
  homeAMB: BaseNetworkParams
  foreignAMB: BaseNetworkParams
  loading: boolean
}

const initialState = {
  homeNative: {
    chainId: 0,
    name: '',
    web3: null,
    bridgeAddress: HOME_BRIDGE_ADDRESS['NATIVE'],
    bridgeContract: null
  },
  foreignNative: {
    chainId: 0,
    name: '',
    web3: null,
    bridgeAddress: FOREIGN_BRIDGE_ADDRESS['NATIVE'],
    bridgeContract: null
  },
  homeAMB: {
    chainId: 0,
    name: '',
    web3: null,
    bridgeAddress: HOME_BRIDGE_ADDRESS['AMB'],
    bridgeContract: null
  },
  foreignAMB: {
    chainId: 0,
    name: '',
    web3: null,
    bridgeAddress: FOREIGN_BRIDGE_ADDRESS['AMB'],
    bridgeContract: null
  },
  loading: true
}

const StateContext = createContext<StateContext>(initialState)

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const homeNativeNetwork = useNetwork(HOME_RPC_URL, homeNativeSnapshotProvider)
  const foreignNativeNetwork = useNetwork(FOREIGN_RPC_URL, foreignNativeSnapshotProvider)
  const homeAMBNetwork = useNetwork(HOME_RPC_URL, homeAMBSnapshotProvider)
  const foreignAMBNetwork = useNetwork(FOREIGN_RPC_URL, foreignAMBSnapshotProvider)
  const { homeNativeBridge, foreignNativeBridge, homeAMBBridge, foreignAMBBridge } = useBridgeContracts({
    homeNativeWeb3: homeNativeNetwork.web3,
    foreignNativeWeb3: foreignNativeNetwork.web3,
    homeAMBWeb3: homeAMBNetwork.web3,
    foreignAMBWeb3: foreignAMBNetwork.web3
  })

  const value = {
    homeNative: {
      bridgeAddress: HOME_BRIDGE_ADDRESS['NATIVE'],
      name: HOME_NETWORK_NAME,
      bridgeContract: homeNativeBridge,
      ...homeNativeNetwork
    },
    foreignNative: {
      bridgeAddress: FOREIGN_BRIDGE_ADDRESS['NATIVE'],
      name: FOREIGN_NETWORK_NAME,
      bridgeContract: foreignNativeBridge,
      ...foreignNativeNetwork
    },
    homeAMB: {
      bridgeAddress: HOME_BRIDGE_ADDRESS['AMB'],
      name: HOME_NETWORK_NAME,
      bridgeContract: homeAMBBridge,
      ...homeNativeNetwork
    },
    foreignAMB: {
      bridgeAddress: FOREIGN_BRIDGE_ADDRESS['AMB'],
      name: FOREIGN_NETWORK_NAME,
      bridgeContract: foreignAMBBridge,
      ...foreignNativeNetwork
    },
    loading:
      homeAMBNetwork.loading || foreignAMBNetwork.loading || homeNativeNetwork.loading || foreignNativeNetwork.loading
  }

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

export const useStateProvider = (): StateContext => {
  return React.useContext(StateContext)
}
