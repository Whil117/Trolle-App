import AtomImage from '@Atoms/Image'
import SvgDynamic from '@Atoms/SvgDynamic'
import ButtonComponent from '@Components/Button'
import ButtonCancel from '@Components/Button/cancel'
import Column, { AtomWSC } from '@Components/Column/Column'
import FormAdd from '@Components/FormAdd'
import { css } from '@emotion/react'
import { ButtonForm, Wrapper } from '@Styles/global'
import colors from '@Styles/global/colors'
import {
  WorkspaceInput,
  WorkspaceLabel,
  WorkspaceSectioTextArea,
} from '@Styles/pages/workspace/section'
import { workSpaceSection } from '@Types/components/Column/types'
import { IProps } from '@Types/pages/workspace/section/types'
import { typeWorkspaceColumns } from '@Types/pages/workspace/types'
import idAssignment from '@Utils/id'
import reorder from '@Utils/reorder'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { atom, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

type checklistAtom = {
  id_checklist_column: string
  title_checklist_column: string
}

const checklistAtom = atom({
  key: 'checklists',
  default: {} as typeWorkspaceColumns<checklistAtom[]>,
  effects_UNSTABLE: [persistAtom],
})

const WorkspaceSection: NextPage<IProps> = ({ pid, id }) => {
  const [workspaceSection, setWorkspaceSection] =
    useRecoilState<typeWorkspaceColumns<workSpaceSection[]>>(AtomWSC)
  const [section, setSection] = useState<workSpaceSection>(
    {} as workSpaceSection
  )
  const [checklists, setChecklists] =
    useRecoilState<typeWorkspaceColumns<checklistAtom[]>>(checklistAtom)
  const router = useRouter()
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setWorkspaceSection({
      ...workspaceSection,

      [pid]: workspaceSection[pid].map((item) => {
        if (item.id_wcs === section.id_wcs) {
          return { ...section, [e.target.name]: e.target.value }
        }
        return item
      }),
    })
  }

  useEffect(() => {
    const FilterWorkspaceSection = workspaceSection[pid]?.filter(
      (item) => item.id_wcs === id
    )[0]
    Object.keys(workspaceSection).length > 0 &&
      setSection(FilterWorkspaceSection)
  }, [workspaceSection, pid, id])

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    const reader = new FileReader()
    if (file) {
      reader.readAsDataURL(file as Blob)
      reader.onloadend = (event) => {
        if (event.target) {
          setWorkspaceSection({
            ...workspaceSection,

            [pid]: workspaceSection[pid].map((item) => {
              if (item.id_wcs === section.id_wcs) {
                return { ...section, image_wcs: event?.target?.result }
              }
              return item
            }),
          })
        }
      }
    }
  }
  const handleDeleteChecklist = (id_checklist_column: string) => {
    setChecklists({
      ...checklists,
      [id]: checklists[id].filter(
        (item) => item.id_checklist_column !== id_checklist_column
      ),
    })
  }

  const handleDelete = () => {
    setWorkspaceSection({
      ...workspaceSection,

      [pid]: workspaceSection[pid].filter(
        (item) => item.id_wcs !== section.id_wcs
      ),
    })
    router.back()
  }
  const handleDeleteImage = () => {
    setWorkspaceSection({
      ...workspaceSection,
      [pid]: workspaceSection[pid].map((item) => {
        if (item.id_wcs === section.id_wcs) {
          return { ...section, image_wcs: '' }
        }
        return item
      }),
    })
  }

  return (
    <Wrapper
      customstyle={css`
        display: flex;
        width: 100%;
        justify-content: space-between;
      `}
    >
      <Wrapper
        customstyle={css`
          width: 900px;
        `}
      >
        <Wrapper
          customstyle={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <Wrapper
            customstyle={css`
              display: flex;
              align-items: center;
            `}
          >
            <ButtonForm
              onClick={() => router.back()}
              customstyle={css`
                width: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 10px;
              `}
            >
              <SvgDynamic href="/icons/back" />
            </ButtonForm>
            <h1>View Section</h1>
          </Wrapper>
          <Wrapper>
            <ButtonCancel ArrowFn={handleDelete} />
          </Wrapper>
        </Wrapper>
        <Wrapper>
          <Wrapper
            customstyle={css`
              background-color: ${colors.gray};
              display: flex;
              justify-content: center;
              align-items: center;
              background-image: ${section?.image_wcs
                ? `url(${section?.image_wcs})`
                : 'none'};
              height: 300px;
              background-origin: content-box;
              background-position: center center;
              background-size: contain;
              background-repeat: no-repeat;
              margin-bottom: 20px;
              z-index: ;
            `}
          >
            {section?.image_wcs ? (
              <ButtonCancel
                ArrowFn={handleDeleteImage}
                style={css`
                  background: white;
                  border-radius: 10px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin: 0;
                  padding: 0;
                  height: 40px;
                  width: 40px;
                  margin: 10px;
                `}
              />
            ) : (
              <WorkspaceLabel htmlFor="image">
                <SvgDynamic href="/icons/image" />
              </WorkspaceLabel>
            )}
            <input
              type="file"
              id="image"
              onChange={handleImage}
              style={{ display: 'none' }}
            />
          </Wrapper>
          <Wrapper
            customstyle={css`
              display: flex;
              width: 100%;
              justify-content: space-between;
            `}
          >
            <Wrapper
              customstyle={css`
                width: 100%;
              `}
            >
              <WorkspaceInput
                type="text"
                name="title_wcs"
                value={section?.title_wcs}
                onChange={handleChange}
                placeholder="Title"
                customstyle={css`
                  padding: 0;
                  box-shadow: none;
                  margin-top: 20px;
                `}
              />
              <Wrapper
                customstyle={css`
                  display: flex;
                `}
              >
                <SvgDynamic href="/icons/desc" />
                <h3>Description</h3>
              </Wrapper>
              <WorkspaceSectioTextArea
                name="text_wcs"
                cols={30}
                rows={10}
                onChange={handleChange}
                value={section?.text_wcs || ''}
                defaultValue={section?.text_wcs || ''}
              ></WorkspaceSectioTextArea>
            </Wrapper>
          </Wrapper>
          <Wrapper
            customstyle={css`
              margin-top: 20px;
            `}
          >
            <Wrapper
              customstyle={css`
                display: flex;
              `}
            >
              <SvgDynamic href="/icons/desc" />
              <h3>Checklist</h3>
            </Wrapper>
            <Wrapper
              customstyle={css`
                display: flex;
                align-items: flex-start;
                flex-wrap: wrap;
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

                  const result = reorder<checklistAtom>(
                    checklists[pid],
                    source.index,
                    destination.index
                  )
                  setChecklists({
                    ...checklists,
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
                  <Droppable droppableId="checklists" direction="horizontal">
                    {(droppableProvided) => (
                      <Wrapper
                        customstyle={css`
                          display: flex;
                          align-items: flex-start;
                          flex-wrap: wrap;
                        `}
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                      >
                        {checklists[id]?.map((column, index) => (
                          <Draggable
                            key={column.id_checklist_column}
                            index={index}
                            draggableId={column.id_checklist_column}
                          >
                            {(draggableProvided) => (
                              <Column
                                disabled={true}
                                ArrowFn={() =>
                                  handleDeleteChecklist(
                                    column.id_checklist_column
                                  )
                                }
                                key={column.id_checklist_column}
                                {...{
                                  column: {
                                    id_workspace_column:
                                      column.id_checklist_column,
                                    title_workspace_column:
                                      column.title_checklist_column,
                                  },
                                  draggableProvided,
                                  pid,
                                }}
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
                  setChecklists({
                    ...checklists,
                    [id]: checklists[id]
                      ? [
                          ...checklists[id],
                          {
                            id_checklist_column: idAssignment(25),
                            title_checklist_column: values.title,
                          },
                        ]
                      : [
                          {
                            id_checklist_column: idAssignment(25),
                            title_checklist_column: values.title,
                          },
                        ],
                  })
                }}
                placeholder="Enter a checklist column name"
                buttonname="+ Add a new checklist"
                buttoncustomstyle={css`
                  margin: 10px;
                `}
              />
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <Wrapper>
        <h1>Column Sections</h1>
        {workspaceSection[pid]?.map((section) => (
          <ButtonComponent
            key={section.id_wcs}
            buttonName={section.title_wcs}
            style={css`
              background: ${section.id_wcs === id
                ? colors.green_light
                : 'white'};
              color: ${section.id_wcs === id ? 'white' : 'black'};
              font-weight: 500;
              font-size: 1rem;
              font-weight: 00;
              height: auto;
              margin: 0.5rem 0;
              display: flex;
              flex-direction: column;
              padding: 1rem;
            `}
            click={() =>
              router.push({
                pathname: '/workspace/section/[pid]',
                query: {
                  pid: pid,
                  id: section.id_wcs,
                },
              })
            }
          >
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
          </ButtonComponent>
        ))}
      </Wrapper>
    </Wrapper>
  )
}
export async function getServerSideProps(context: NextPageContext) {
  const { pid, id } = context.query
  return {
    props: {
      pid,
      id,
    },
  }
}

export default WorkspaceSection
