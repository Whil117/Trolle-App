/* eslint-disable no-unused-vars */
import SvgDynamic from '@Atoms/SvgDynamic'
import { css, SerializedStyles } from '@emotion/react'
import { ButtonForm } from '@Styles/global'
import { FC } from 'react'

type ArrowVoid = () => void
type OtherVoid = (id: any) => void
type IProps = {
  ArrowFn: OtherVoid | ArrowVoid
  style?: SerializedStyles
}

const ButtonCancel: FC<IProps> = (props) => {
  return (
    <ButtonForm
      customstyle={css`
        background: none;
        box-shadow: none;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
        width: 40px;
        ${props.style}
      `}
      onClick={props.ArrowFn}
    >
      <SvgDynamic href="/icons/cancel" />
    </ButtonForm>
  )
}

export default ButtonCancel
