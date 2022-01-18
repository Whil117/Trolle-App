import SvgDynamic from '@Atoms/SvgDynamic'
import { NavbarLink, NavbarStyle } from '@Styles/components/Navbar'
import Link from 'next/link'
import { FC } from 'react'

interface IProps {}

const Navbar: FC<IProps> = () => {
  return (
    <NavbarStyle>
      <SvgDynamic href="/icons/trolle" />
      <Link
        href={{
          pathname: '/boards',
        }}
        passHref
      >
        <NavbarLink>Boards</NavbarLink>
      </Link>
      {/* <Link
        href={{
          pathname: '/boards',
        }}
        passHref
      >
        <NavbarLink>Favorites</NavbarLink>
      </Link> */}
      <Link
        href={{
          pathname: '/settings',
        }}
        passHref
      >
        <NavbarLink>Settings</NavbarLink>
      </Link>
    </NavbarStyle>
  )
}

export default Navbar
