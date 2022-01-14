import Column from '@Components/Column/Column'
import FormAdd from '@Components/FormAdd'
import { css } from '@emotion/react'
import { Wrapper } from '@Styles/global'
import { Workspace } from '@Types/pages/boards/types'
import {
  IProps,
  typeWorkspaceColumns,
  WorkspaceColumns,
} from '@Types/pages/workspace/types'
import idAssignment from '@Utils/id'
import reorder from '@Utils/reorder'
import { NextPageContext } from 'next'
import { workSpacesState } from 'pages/boards'
import { FC } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

const WorkspaceColumns = atom({
  key: 'workspaceColumns',
  default: {} as typeWorkspaceColumns<WorkspaceColumns[]>,
  effects_UNSTABLE: [persistAtom],
})

const filterWorkspace = (pid: string) =>
  selector({
    key: 'filterWorkspace',
    get: ({ get }) => {
      const dataSelect = get(workSpacesState)
      const filteredData = dataSelect.filter(
        (data: Workspace) => data.id_workspace === pid
      )
      const data = filteredData[0]
      return data
    },
  })

const filterWorkspaceColumns = (pid: string) =>
  selector({
    key: 'filterWorkspaceColumns',
    get: ({ get }) => {
      const dataSelect = get(WorkspaceColumns)
      const filteredData = dataSelect[pid]
      return filteredData
    },
  })

const Workspace: FC<IProps> = ({ pid }) => {
  const workspace = useRecoilValue<Workspace>(filterWorkspace(pid))
  const [workspaceColumn, setWorkspaceColumn] =
    useRecoilState<typeWorkspaceColumns<WorkspaceColumns[]>>(WorkspaceColumns)

  const workspaceColumns = useRecoilValue<WorkspaceColumns[]>(
    filterWorkspaceColumns(pid)
  )
  const handleDeleteColumn = (id: string) =>
    setWorkspaceColumn({
      ...workspaceColumn,
      [pid]: workspaceColumns.filter(
        (column) => column.id_workspace_column !== id
      ),
    })
  return (
    <div>
      <h1>{workspace?.title_workspace}</h1>
      <Wrapper
        customstyle={css`
          display: flex;
          align-items: flex-start;
        `}
      >
        <DragDropContext
          onDragEnd={(res) => {
            const { destination, source } = res
            if (!destination) return
            if (
              destination.droppableId === source.droppableId &&
              destination.index === source.index
            )
              return

            const result = reorder<WorkspaceColumns>(
              workspaceColumns,
              source.index,
              destination.index
            )
            setWorkspaceColumn({
              ...workspaceColumn,
              [pid]: result,
            })
          }}
        >
          <Wrapper
            customstyle={css`
              display: flex;
              align-items: flex-start;
            `}
          >
            <Droppable droppableId="WorkColumns" direction="horizontal">
              {(droppableProvided) => (
                <Wrapper
                  customstyle={css`
                    display: flex;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    height: 100vh;
                  `}
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                >
                  {workspaceColumns?.map((column, index) => (
                    <Draggable
                      key={column.id_workspace_column}
                      index={index}
                      draggableId={column.id_workspace_column}
                    >
                      {(draggableProvided) => (
                        <Column
                          ArrowFn={() =>
                            handleDeleteColumn(column.id_workspace_column)
                          }
                          key={column.id_workspace_column}
                          {...{ column, setWorkspaceColumn, draggableProvided }}
                        />
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </Wrapper>
              )}
            </Droppable>
          </Wrapper>
        </DragDropContext>
        <FormAdd
          submit={(values: { title: string }) => {
            setWorkspaceColumn({
              ...workspaceColumn,
              [pid]: workspaceColumn[pid]
                ? [
                    ...workspaceColumn[pid],
                    {
                      id_workspace_column: idAssignment(25),
                      title_workspace_column: values.title,
                    },
                  ]
                : [
                    {
                      id_workspace_column: idAssignment(25),
                      title_workspace_column: values.title,
                    },
                  ],
            })
          }}
          placeholder="Enter a column name"
          buttonname="+ Add a new column"
          buttoncustomstyle={css`
            margin: 10px;
          `}
        />
      </Wrapper>
    </div>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { pid } = context.query
  return {
    props: {
      pid,
    },
  }
}

export default Workspace
