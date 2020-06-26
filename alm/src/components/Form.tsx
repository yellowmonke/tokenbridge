import React, { useState, FormEvent, useEffect } from 'react'
import styled from 'styled-components'
import { FormSubmitParams } from './MainPage'
import { useStateProvider } from '../state/StateProvider'
import { useParams } from 'react-router-dom'
import { Button } from './commons/Button'
import { RadioButtonLabel, RadioButtonContainer } from './commons/RadioButton'

const LabelText = styled.label`
  line-height: 36px;
  max-width: 140px;
`

const Input = styled.input`
  background-color: var(--bg-color);
  color: var(--font-color);
  max-width: 100%;
  border-color: var(--color-primary) !important;
  &:hover,
  &:active,
  &:focus {
    border-color: var(--button-color) !important;
  }
`

export const Form = ({
  onSubmit,
  lastUsedChain
}: {
  onSubmit: ({ chainId, txHash }: FormSubmitParams) => void
  lastUsedChain: number
}) => {
  const { home, foreign, loading } = useStateProvider()
  const { chainId: paramChainId, txHash: paramTxHash } = useParams()
  const [chainId, setChainId] = useState(lastUsedChain)
  const [txHash, setTxHash] = useState('')

  useEffect(
    () => {
      if (!paramChainId) {
        setChainId(lastUsedChain > 0 ? lastUsedChain : foreign.chainId)
      } else {
        setChainId(parseInt(paramChainId))
        setTxHash(paramTxHash)
      }
    },
    [foreign.chainId, paramChainId, paramTxHash, lastUsedChain]
  )

  const formSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({ chainId, txHash })
  }

  return (
    <form onSubmit={formSubmit}>
      <div className="row is-center">
        <LabelText className="col-2">Bridgeable tx hash:</LabelText>
        <div className="col-7">
          <Input
            placeholder="Enter transaction hash"
            type="text"
            onChange={e => setTxHash(e.target.value)}
            required
            pattern="^0x[a-fA-F0-9]{64}$"
            value={txHash}
          />
        </div>
        <div className="col-1">
          <Button className="button outline" type="submit">
            Check
          </Button>
        </div>
      </div>
      {!loading && (
        <div className="row is-center">
          <RadioButtonContainer className="is-vertical-align" onClick={() => setChainId(foreign.chainId)}>
            <input
              className="is-marginless"
              type="radio"
              name="network"
              value={foreign.name}
              checked={chainId === foreign.chainId}
              onChange={() => setChainId(foreign.chainId)}
            />
            <RadioButtonLabel htmlFor={foreign.name}>{foreign.name}</RadioButtonLabel>
          </RadioButtonContainer>
          <RadioButtonContainer className="is-vertical-align" onClick={() => setChainId(home.chainId)}>
            <input
              className="is-marginless"
              type="radio"
              name="network"
              value={home.name}
              checked={chainId === home.chainId}
              onChange={() => setChainId(home.chainId)}
            />
            <RadioButtonLabel htmlFor={home.name}>{home.name}</RadioButtonLabel>
          </RadioButtonContainer>
        </div>
      )}
    </form>
  )
}