import AtomImage from '@Atoms/Image'
import ButtonComponent from '@Components/Button'
import ButtonCancel from '@Components/Button/cancel'
import FormAdd from '@Components/FormAdd'
import { css } from '@emotion/react'
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
import { useRouter } from 'next/router'
import { WorkspaceColumns2 } from 'pages/workspace/[pid]'
import { ChangeEvent, FC } from 'react'
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const AtomWSC = atom({
  key: 'workSpaceSection873845',
  default: {} as typeWorkspaceColumns<workSpaceSection[]>,
  effects_UNSTABLE: [persistAtom],
})

const filterWSC = (id: string) =>
  selector({
    key: 'filterWorkSpaceSection7982374329',
    get: ({ get }) => {
      const dataSelect = get(AtomWSC)
      const filteredData = dataSelect[id]
      return filteredData
    },
  })

const Column: FC<IProps> = ({
  column,
  ArrowFn,
  draggableProvided,
  pid,
  disabled,
}) => {
  const [workspaceSection, setWorkspaceSection] =
    useRecoilState<typeWorkspaceColumns<workSpaceSection[]>>(AtomWSC)
  const section = useRecoilValue<workSpaceSection[]>(
    filterWSC(column?.id_workspace_column)
  )
  const [state, setstate] =
    useRecoilState<typeWorkspaceColumns<WorkspaceColumns[]>>(WorkspaceColumns2)
  const router = useRouter()

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setstate({
      ...state,
      [pid]: state[pid]?.map((item: WorkspaceColumns) => {
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
              /* margin: 10px 0; */
              z-index: 0;
            `}
            type="text"
            value={column.title_workspace_column}
            onChange={handleChangeTitle}
          />
          <ButtonCancel ArrowFn={ArrowFn} />
        </Wrapper>

        <Wrapper
          customstyle={css`
            display: flex;
            align-items: flex-start;
          `}
        >
          <Wrapper>
            {section?.map((section) => (
              <ButtonComponent
                key={section.id_wcs}
                buttonName={section.title_wcs}
                disabled={disabled}
                style={css`
                  background: ${section.id_wcs === column.id_workspace_column
                    ? colors.green_light
                    : 'white'};
                  color: ${section.id_wcs === column.id_workspace_column
                    ? 'white'
                    : 'black'};
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
                      pid: column.id_workspace_column,
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
    </ColumnStyle>
  )
}

export default Column
