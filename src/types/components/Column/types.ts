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
  image_wcs?: string
  check_wcs?: boolean
}
