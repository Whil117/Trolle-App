/* eslint-disable no-unused-vars */
import ButtonCancel from '@Components/Button/cancel'
import { css, SerializedStyles } from '@emotion/react'
import {
  AddNewItemError,
  AddNewItemForm,
  AddNewItemFormButton,
  AddNewItemFormInput,
} from '@Styles/components/FormAddNewItem'
import { Wrapper } from '@Styles/global'
import { ErrorMessage, Formik } from 'formik'
import { Dispatch, FC, SetStateAction } from 'react'

interface IProps {
  placeholder: string
  setShow: Dispatch<SetStateAction<boolean>>
  submit: (values: { title: string }) => void
  style?: SerializedStyles
}

const FormAddNewItem: FC<IProps> = (props) => {
  return (
    <Formik
      initialValues={{ title: '' }}
      validate={(values) => {
        const errors: { [key: string]: string } = {}

        if (!values.title) {
          errors.title = 'Required'
        }
        return errors
      }}
      onSubmit={props.submit}
    >
      {({ errors }) => (
        <AddNewItemForm customstyle={props.style}>
          <AddNewItemFormInput
            type="text"
            placeholder={props.placeholder}
            name="title"
            id="title"
            autoComplete="off"
          />
          <ErrorMessage
            name="title"
            component={() => <AddNewItemError>{errors.title}</AddNewItemError>}
          />
          <Wrapper
            customstyle={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <AddNewItemFormButton type="submit">Add</AddNewItemFormButton>
            <ButtonCancel ArrowFn={() => props.setShow((show) => !show)} />
          </Wrapper>
        </AddNewItemForm>
      )}
    </Formik>
  )
}

export default FormAddNewItem
