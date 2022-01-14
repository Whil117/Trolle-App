import { FC } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'

type CustomStyle = { customStyle?: SerializedStyles }
interface IProps {
  src: string
  alt: string
  width: number
  height: number
  CustomStyle?: CustomStyle['customStyle']
}

export const ImageWrapper = styled(Image)<CustomStyle>`
  object-fit: cover;
  border-radius: 10px;
  ${({ customStyle }) => customStyle}
`

const AtomImage: FC<IProps> = (props) => {
  return (
    <ImageWrapper
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      customStyle={props.CustomStyle}
    />
  )
}

export default AtomImage
