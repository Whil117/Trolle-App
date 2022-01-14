import AtomImage from '@Atoms/Image'
import ButtonComponent from '@Components/Button'
import ButtonCancel from '@Components/Button/cancel'
import FormAdd from '@Components/FormAdd'
import { css } from '@emotion/react'
import { Wrapper } from '@Styles/global'
import colors from '@Styles/global/colors'
import { ColumnStyle } from '@Styles/pages/login/workspace'
import { IProps, workSpaceSection } from '@Types/components/Column/types'
import { typeWorkspaceColumns } from '@Types/pages/workspace/types'
import idAssignment from '@Utils/id'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import reorder from '@Utils/reorder'
const { persistAtom } = recoilPersist()

const AtomWSC = atom({
  key: 'workSpaceSection',
  default: {} as typeWorkspaceColumns<workSpaceSection[]>,
  effects_UNSTABLE: [persistAtom],
})

const filterWorkSpaceSection = (id: string) =>
  selector({
    key: 'filterWorkSpaceSection',
    get: ({ get }) => {
      const dataSelect = get(AtomWSC)
      const filteredData = dataSelect[id]
      return filteredData
    },
  })

const Column: FC<IProps> = ({ column, ArrowFn, draggableProvided }) => {
  const [workspaceSection, setWorkspaceSection] =
    useRecoilState<typeWorkspaceColumns<workSpaceSection[]>>(AtomWSC)
  const section = useRecoilValue<workSpaceSection[]>(
    filterWorkSpaceSection(column?.id_workspace_column)
  )
  const router = useRouter()
  return (
    <ColumnStyle
      ref={draggableProvided?.innerRef}
      {...draggableProvided?.draggableProps}
      {...draggableProvided?.dragHandleProps}
    >
      <Wrapper
        customstyle={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <h3>{column.title_workspace_column}</h3>
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
          const newSection = reorder(section, source.index, destination.index)
          setWorkspaceSection({
            ...workspaceSection,
            [column.id_workspace_column]: newSection,
          })
        }}
      >
        <Wrapper>
          <Droppable droppableId="workSections" direction="vertical">
            {(droppableProvided) => (
              <Wrapper
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                {section?.map((section, index) => (
                  <Draggable
                    key={section.id_wcs}
                    index={index}
                    draggableId={section.id_wcs}
                  >
                    {(draggableProvided) => (
                      <ButtonComponent
                        {...{ draggableProvided }}
                        key={section.id_wcs}
                        buttonName={section.title_wcs}
                        style={css`
                          background: ${section.id_wcs ===
                          column.id_workspace_column
                            ? colors.green_light
                            : 'white'};
                          color: ${section.id_wcs === column.id_workspace_column
                            ? 'white'
                            : 'black'};
                          font-weight: 500;
                          font-size: 1rem;
                          font-weight: 00;
                          margin: 0.5rem 0;
                          height: 50px;
                          display: flex;
                          flex-direction: column;
                          padding: 1rem;
                        `}
                        click={() =>
                          router.push({
                            pathname: '/workspace/section/[pid]',
                            query: {
                              pid: column.id_workspace_column,
                              id: section.id_wcs,
                            },
                          })
                        }
                      >
                        {section.image_wcs && (
                          <AtomImage
                            src={section.image_wcs}
                            alt={section.title_wcs}
                            width={350}
                            height={200}
                            CustomStyle={css`
                              object-position: top;
                            `}
                          />
                        )}
                      </ButtonComponent>
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
        `}
        formcustomstyle={css`
          margin: 15px 0 0 0;
        `}
      />
    </ColumnStyle>
  )
}

export default Column
