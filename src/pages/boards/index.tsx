import ButtonCancel from '@Components/Button/cancel'
import FormAdd from '@Components/FormAdd'
import { css } from '@emotion/react'
import { Wrapper } from '@Styles/global'
import { Workspace } from '@Types/pages/boards/types'
import idAssignment from '@Utils/id'
import Link from 'next/link'
import { FC, useState } from 'react'
import { atom, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const workSpacesState = atom({
  key: 'workSpacesState',
  default: [],
  effects_UNSTABLE: [persistAtom],
})
interface IProps {}

const Boards: FC<IProps> = () => {
  const [show, setShow] = useState(false)
  const [workspaces, setWorkspaces] =
    useRecoilState<Workspace[]>(workSpacesState)

  const handleDeleteWorkspace = (id: string) =>
    setWorkspaces(
      workspaces.filter((workspace) => workspace.id_workspace !== id)
    )

  return (
    <main>
      <h1>Your workspaces</h1>
      <Wrapper
        customstyle={css`
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
        `}
      >
        {workspaces.map((workspace) => (
          <Wrapper
            key={workspace.id_workspace}
            customstyle={css`
              display: flex;
              justify-content: space-between;
              width: 218px;
              height: 218px;
              background: #ffffff;
              box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
              border-radius: 10px;
              padding: 10px;
              margin: 10px;
              cursor: pointer;
              h3 {
                margin: 5px 0;
              }
            `}
          >
            <Link
              key={workspace.id_workspace}
              href={{
                pathname: '/workspace/[pid]',
                query: { pid: workspace.id_workspace },
              }}
              passHref
            >
              <h3>{workspace.title_workspace}</h3>
            </Link>
            <ButtonCancel
              ArrowFn={() => handleDeleteWorkspace(workspace.id_workspace)}
            />
          </Wrapper>
        ))}
        <FormAdd
          submit={(values) => {
            setWorkspaces([
              ...workspaces,
              {
                id_workspace: idAssignment(25),
                title_workspace: values.title,
              },
            ])
            setShow(!show)
          }}
          placeholder="Enter a workspace name"
          buttonname="+ Add a new workspace"
          buttoncustomstyle={css`
            margin: 10px;
          `}
        />
      </Wrapper>
    </main>
  )
}

export default Boards
