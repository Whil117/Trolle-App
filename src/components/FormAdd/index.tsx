/* eslint-disable no-unused-vars */
import ButtonComponent from '@Components/Button'
import FormAddNewItem from '@Components/FormAddNewItem/FormAddNewItem'
import { SerializedStyles } from '@emotion/react'
import { FC, useState } from 'react'

interface IProps {
  submit: (values: { title: string }) => void
  placeholder: string
  buttonname: string
  buttoncustomstyle?: SerializedStyles
  formcustomstyle?: SerializedStyles
}

const FormAdd: FC<IProps> = (props) => {
  const [show, setShow] = useState<boolean>(false)
  return (
    <>
      {show ? (
        <FormAddNewItem
          style={props.formcustomstyle}
          placeholder={props.placeholder}
          {...{ setShow }}
          submit={(values) => {
            props.submit(values)
            setShow(!show)
          }}
        />
      ) : (
        <ButtonComponent
          click={() => setShow(!show)}
          buttonName={props.buttonname}
          style={props.buttoncustomstyle}
        />
      )}
    </>
  )
}

export default FormAdd
