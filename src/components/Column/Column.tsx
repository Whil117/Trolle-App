import AtomImage from '@Atoms/Image'
import ButtonCancel from '@Components/Button/cancel'
import FormAdd from '@Components/FormAdd'
import { css } from '@emotion/react'
import { SectionLink } from '@Styles/components/Column'
import { Wrapper } from '@Styles/global'
import colors from '@Styles/global/colors'
import { ColumnStyle } from '@Styles/pages/workspace'
import { WorkspaceInput } from '@Styles/pages/workspace/section'
import { IProps, workSpaceSection } from '@Types/components/Column/types'
import {
  typeWorkspaceColumns,
  WorkspaceColumns,
} from '@Types/pages/workspace/types'
import idAssignment from '@Utils/id'
import reorder from '@Utils/reorder'
import Link from 'next/link'
import { WorkspaceColumns2 } from 'pages/workspace/[pid]'
import { ChangeEvent, FC, useRef } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { atom, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const AtomWSC = atom({
  key: 'workSpaceSection873845',
  default: {} as typeWorkspaceColumns<workSpaceSection[]>,
  effects_UNSTABLE: [persistAtom],
})

const Column: FC<IProps> = ({ column, ArrowFn, draggableProvided, pid }) => {
  const SectionsContainer = useRef<HTMLDivElement>(null)
  const [workspaceSection, setWorkspaceSection] =
    useRecoilState<typeWorkspaceColumns<workSpaceSection[]>>(AtomWSC)

  const [atomWsc, setAtomWsc] =
    useRecoilState<typeWorkspaceColumns<workSpaceSection[]>>(AtomWSC)

  const [Columns, SetColumns] =
    useRecoilState<typeWorkspaceColumns<WorkspaceColumns[]>>(WorkspaceColumns2)

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    SetColumns({
      ...Columns,
      [pid]: Columns[pid]?.map((item: WorkspaceColumns) => {
        if (item.id_workspace_column === column?.id_workspace_column) {
          return {
            ...item,
            title_workspace_column: event.target.value,
          }
        }
        return item
      }),
    })
  }

  return (
    <ColumnStyle
      ref={draggableProvided?.innerRef}
      {...draggableProvided?.draggableProps}
      {...draggableProvided?.dragHandleProps}
    >
      <Wrapper
        customstyle={css`
          background: ${colors.green_light};
          background-position: 0 0, 50px 50px;
          background-size: 10px 10px;
          height: 10px;
          border-radius: 10px 10px 0 0;
        `}
      ></Wrapper>
      <Wrapper
        customstyle={css`
          padding: 10px;
        `}
      >
        <Wrapper
          customstyle={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <WorkspaceInput
            customstyle={css`
              border: none;
              box-shadow: none;
              width: 230px;
              height: 40px;
              font-size: 1.25rem;
              z-index: 0;
            `}
            placeholder="Column title"
            type="text"
            value={column.title_workspace_column}
            onChange={handleChangeTitle}
          />
          <ButtonCancel ArrowFn={ArrowFn} />
        </Wrapper>
        <DragDropContext
          onDragEnd={(res) => {
            const { destination, source } = res
            if (!destination) return
            if (
              destination.droppableId === source.droppableId &&
              destination.index === source.index
            )
              return

            const result = reorder<workSpaceSection>(
              atomWsc[column.id_workspace_column],
              source.index,
              destination.index
            )
            setAtomWsc({
              ...atomWsc,
              [column.id_workspace_column]: result,
            })
          }}
        >
          <Droppable droppableId={'aasf'}>
            {(droppableProvided) => (
              <Wrapper
                customstyle={css`
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                `}
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                <Wrapper
                  customstyle={css`
                    width: 100%;
                  `}
                  ref={SectionsContainer}
                >
                  {atomWsc[column.id_workspace_column]?.map(
                    (section, index) => (
                      <Draggable
                        key={section.id_wcs}
                        draggableId={section.id_wcs}
                        index={index}
                      >
                        {(draggableProvided) => (
                          <Wrapper
                            customstyle={css`
                              width: 100%;
                            `}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            ref={draggableProvided.innerRef}
                          >
                            <Link
                              href={{
                                pathname: '/workspace/section/[pid]',
                                query: {
                                  pid: column.id_workspace_column,
                                  id: section.id_wcs,
                                },
                              }}
                              passHref
                            >
                              <SectionLink>
                                <h4>{section.title_wcs}</h4>
                                {section.image_wcs && (
                                  <AtomImage
                                    src={section.image_wcs}
                                    alt={section?.title_wcs}
                                    width={350}
                                    height={200}
                                    customstyle={css`
                                      object-position: top;
                                    `}
                                  />
                                )}
                              </SectionLink>
                            </Link>
                          </Wrapper>
                        )}
                      </Draggable>
                    )
                  )}
                </Wrapper>
                {droppableProvided?.placeholder}
                <FormAdd
                  submit={(values) => {
                    setWorkspaceSection({
                      ...workspaceSection,
                      [column.id_workspace_column]: workspaceSection[
                        column.id_workspace_column
                      ]
                        ? [
                            ...workspaceSection[column.id_workspace_column],
                            {
                              id_wcs: idAssignment(25),
                              title_wcs: values.title,
                            },
                          ]
                        : [
                            {
                              id_wcs: idAssignment(25),
                              title_wcs: values.title,
                            },
                          ],
                    })
                  }}
                  placeholder="Enter a section name"
                  buttonname="+ Add a new section"
                  buttoncustomstyle={css`
                    margin: 15px 0 0 0;
                    background: ${colors.gray};
                    z-index: 0;
                  `}
                  formcustomstyle={css`
                    margin: 15px 0 0 0;
                  `}
                />
              </Wrapper>
            )}
          </Droppable>
        </DragDropContext>
      </Wrapper>
    </ColumnStyle>
  )
}

export default Column
