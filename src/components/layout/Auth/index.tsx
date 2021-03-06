import Redirect from '@Components/Redirect'
import { UserData } from '@Types/pages/login/types'
import { NextRouter } from 'next/router'
import { userData } from 'pages/login'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { invalidPages } from '../layout'

interface IProps {
  router: NextRouter
}

const AuthLayout: FC<IProps> = ({ children, router }) => {
  const protectedRoutes = [
    '/boards',
    '/workspace/[pid]',
    '/workspace/section/[id]',
    '/settings',
  ]
  const { authethicated } = useRecoilValue<UserData>(userData)

  if (!authethicated && protectedRoutes.includes(router.pathname)) {
    return <Redirect {...{ router }} href="/login" />
  }

  if (authethicated && invalidPages.includes(router.pathname)) {
    return <Redirect {...{ router }} href="/boards" />
  }
  return <>{children}</>
}

export default AuthLayout
