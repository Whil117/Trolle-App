import SvgDynamic from '@Atoms/SvgDynamic'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import colors from '@Styles/global/colors'
import { NextRouter } from 'next/router'
import { FC, useEffect } from 'react'

interface IProps {
  href: string
  router?: NextRouter
}
const SvgDynamicWrapper = styled.div`
  width: 100%;
  height: 97vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Redirect: FC<IProps> = (props) => {
  // const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      if (props.router) {
        props.router.push(props.href)
      }
    }, 1000)
  }, [props.router])
  return (
    <SvgDynamicWrapper>
      <SvgDynamic
        href="/icons/redirect/loading"
        customstyle={css`
          svg {
            width: 100px;
            height: 100px;
            circle:nth-child(1) {
              stroke: ${colors.green_light};
            }
            circle:nth-child(2) {
              stroke: ${colors.blue__dark_medium};
            }
          }
        `}
      />
    </SvgDynamicWrapper>
  )
}

export default Redirect
