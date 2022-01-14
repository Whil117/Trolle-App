import Navbar from '@Components/Navbar'
import { WrapperStyled } from '@Styles/global'
import { IProps } from '@Types/components/layout/auth/types'
import { FC } from 'react'
// import { ToastContainer } from 'react-toastify'

export const invalidPages = ['/', '/login', '/register']
const Layout: FC<IProps> = ({ children, router }) => {
  return (
    <>
      {/* <ToastContainer /> */}
      {!invalidPages.includes(router.pathname) ? (
        <>
          <Navbar />
          <WrapperStyled>{children}</WrapperStyled>
        </>
      ) : (
        children
      )}
    </>
  )
}

export default Layout
