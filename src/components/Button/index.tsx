import { SerializedStyles } from '@emotion/react'
import { ButtonForm } from '@Styles/global'
import { FC } from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'

interface IProps {
  click?: () => void
  buttonName: string
  disabled?: boolean
  style?: SerializedStyles
  draggableProvided?: DraggableProvided
}

const ButtonComponent: FC<IProps> = (props) => {
  return (
    <ButtonForm
      disabled={props.disabled ? true : false}
      onClick={props.click}
      customstyle={props.style}
      {...props.draggableProvided?.draggableProps}
      {...props.draggableProvided?.dragHandleProps}
      ref={props.draggableProvided?.innerRef}
    >
      {props.buttonName}
      {props.children}
    </ButtonForm>
  )
}

export default ButtonComponent
