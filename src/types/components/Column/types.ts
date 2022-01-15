/* eslint-disable no-unused-vars */
import { WorkspaceColumns } from '@Types/pages/workspace/types'
import { DraggableProvided } from 'react-beautiful-dnd'

export interface IProps {
  column: WorkspaceColumns
  ArrowFn: (id: string) => void
  draggableProvided: DraggableProvided
}

export type workSpaceSection = {
  id_wcs: string
  title_wcs: string
  text_wcs?: string
  image_wcs?: string | ArrayBuffer | null | undefined
  check_wcs?: boolean
}
