export interface IProps {
  pid: string
}

export type WorkspaceColumns = {
  id_workspace_column: string
  title_workspace_column: string
}

export interface typeWorkspaceColumns<T> {
  [key: string]: T
}
