import { ChainId, TokenAmount } from '@uniswap/sdk'
import React from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import tokenLogo from '../../assets/images/token-logo.png'
import { UNI } from '../../constants'
import { useTotalSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
import { useAggregateUniBalance, useTokenBalance } from '../../state/wallet/hooks'
import { ExternalLink, TYPE, UniTokenAnimated } from '../../theme'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { Break, CardBGImage, CardNoise, CardSection, DataCard } from '../earn/styled'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #fddb43 0%, #021d43 100%);
  padding: 0.5rem;
`

const StyledClose = styled(X)`
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`

/**
 * Content for balance stats modal
 */
export default function UniBalanceContent({ setShowUniBalanceModal }: { setShowUniBalanceModal: any }) {
  const { account, chainId } = useActiveWeb3React()
  const uni = chainId ? UNI[chainId] : undefined

  const total = useAggregateUniBalance()
  const uniBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, uni)

  const totalSupply: TokenAmount | undefined = useTotalSupply(uni)
  const uniPrice = useUSDCPrice(uni)

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">Your Penguin Breakdown</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowUniBalanceModal(false)} />
          </RowBetween>
        </CardSection>
        <Break />
        {account && (
          <>
            <CardSection gap="sm">
              <AutoColumn gap="md" justify="center">
                <UniTokenAnimated width="96px" src={tokenLogo} />{' '}
                <TYPE.white fontSize={48} fontWeight={600} color="white">
                  {total?.toFixed(0, { groupSeparator: ',' })} B
                </TYPE.white>
              </AutoColumn>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">Balance:</TYPE.white>
                  <TYPE.white color="white">{uniBalance?.toFixed(2, { groupSeparator: ',' })} B</TYPE.white>
                </RowBetween>
              </AutoColumn>
            </CardSection>
            <Break />
          </>
        )}
        <CardSection gap="sm">
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.white color="white">1 Billion PNGN price:</TYPE.white>
              <TYPE.white color="white">${uniPrice?.toFixed(2) ?? '-'}</TYPE.white>
            </RowBetween>
            {/* <RowBetween>
              <TYPE.white color="white">KISHU in circulation:</TYPE.white>
              <TYPE.white color="white">{circulation?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween> */}
            <RowBetween>
              <TYPE.white color="white">Total Supply</TYPE.white>
              <TYPE.white color="white">{totalSupply?.toFixed(0, { groupSeparator: ',' })} B</TYPE.white>
            </RowBetween>
            {uni && uni.chainId === ChainId.MAINNET ? (
              <ExternalLink href={`https://uniswap.info/token/${uni.address}`}>View PNGN Analytics</ExternalLink>
            ) : null}
          </AutoColumn>
        </CardSection>
      </ModalUpper>
    </ContentWrapper>
  )
}
