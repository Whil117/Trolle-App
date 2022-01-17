import { NextPage } from 'next'
import { userData } from 'pages/login'
import { useRecoilState } from 'recoil'
import { UserData } from '@Types/pages/login/types'
import { ButtonForm } from '@Styles/global'
import { css } from '@emotion/react'
interface IProps {}

const Settings: NextPage<IProps> = () => {
  const [user, setUser] = useRecoilState<UserData>(userData)

  return (
    <div>
      <h1>Settings</h1>
      <h2>Username: {user?.username}</h2>
      <ButtonForm
        customstyle={css`
          font-size: 1.5rem;
          margin-top: 1rem;
          color: #fff;
          font-weight: bold;
          width: 100%;
          background-color: red;
        `}
        onClick={() => setUser({} as UserData)}
      >
        Log out
      </ButtonForm>
    </div>
  )
}

export default Settings
