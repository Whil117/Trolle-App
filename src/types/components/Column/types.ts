/* eslint-disable no-unused-vars */
import { WorkspaceColumns } from '@Types/pages/workspace/types'
import { DraggableProvided } from 'react-beautiful-dnd'

export interface IProps {
  column: WorkspaceColumns
  disabled?: boolean
  ArrowFn: (id: string) => void
  draggableProvided: DraggableProvided
  pid: string
}

export type workSpaceSection = {
  id_wcs: string
  title_wcs: string
  text_wcs?: string
  image_wcs?: string | ArrayBuffer | null | undefined
  check_wcs?: boolean
}
