import styled from '@emotion/styled'
import { customstyled } from '@Types/styles/types'

export const ButtonForm = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 26px;
  width: 337px;
  height: 50px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  cursor: pointer;
  ${({ customstyle }: customstyled) => customstyle}
`

export const Wrapper = styled.div`
      ${({ customstyle }: customstyled) => customstyle})}
`

export const WrapperStyled = styled.main`
  display: flex;
  padding: 50px 125px;
`
