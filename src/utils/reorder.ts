/* eslint-disable no-unused-vars */
import { WorkspaceColumns } from '@Types/pages/workspace/types'

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}
export default reorder
