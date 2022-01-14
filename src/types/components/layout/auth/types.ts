import { NextRouter } from 'next/router'
import { ReactNode } from 'react'

export interface IProps {
  children: ReactNode
  router: NextRouter
}
