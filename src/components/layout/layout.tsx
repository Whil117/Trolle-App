// import Navbar from '@Components/Navbar'
// import { Wrapper } from '@Styles/pages'
import { NextRouter } from 'next/router'
import { FC, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
interface IProps {
  children: ReactNode
  router: NextRouter
}

export const invalidPages = ['/', '/login', '/register']
const Layout: FC<IProps> = ({ children, router }) => {
  return (
    <>
      <ToastContainer />
      {!invalidPages.includes(router.pathname) ? (
        <>
          {/* <Navbar /> */}
          <main>{children}</main>
        </>
      ) : (
        children
      )}
    </>
  )
}

export default Layout
