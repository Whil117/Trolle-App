import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'

export const ButtonForm = styled.button`
  display: flex;
  ${({ customStyle }: { customStyle?: SerializedStyles }) => customStyle}
`
