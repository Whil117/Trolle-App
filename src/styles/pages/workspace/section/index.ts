import styled from '@emotion/styled'
import colors from '@Styles/global/colors'
import { customstyled } from '@Types/styles/types'

export const WorkspaceSectioTextArea = styled.textarea`
  resize: none;
  width: 98%;
  padding: 10px;
  font-family: 'Roboto', sans-serif;
  line-height: 1.5;
  height: 171px;
  border: none;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-size: 16px;
`
export const WorkspaceInput = styled.input`
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-size: 24px;
  border: none;
  padding: 10px;
  outline: none;
  font-weight: bold;
  width: auto;
  ${({ customstyle }: customstyled) => customstyle}})}
`

export const WorkspaceButton = styled.button`
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  border: none;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.black};
`
export const WorkspaceLabel = styled.label`
  border-radius: 10px;
  padding: 0;
  margin: 10px;
  border: none;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
