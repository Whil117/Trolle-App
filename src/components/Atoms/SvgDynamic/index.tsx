import dynamic from 'next/dynamic'
import { FC, useMemo } from 'react'
import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'

interface Styles {
  width?: string
  height?: string
  color?: string
  fill?: string
}

interface IProps {
  href?: string
  styles?: Styles
  customStyle?: SerializedStyles
}

const SvgDynamicWrapper = styled.div<IProps>`
  ${({ customStyle }) => customStyle}
`
const SvgDynamic: FC<IProps> = (props) => {
  const DynamicIcon = useMemo(
    () => dynamic(() => import(`../../../../public${props.href}.svg`)),
    [props.href]
  )

  if (!DynamicIcon) return null
  return (
    <SvgDynamicWrapper styles={props.styles} customStyle={props.customStyle}>
      <DynamicIcon />
    </SvgDynamicWrapper>
  )
}

export default SvgDynamic
