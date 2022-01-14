import SvgDynamic from '@Atoms/SvgDynamic'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

interface IProps {
  href: string
}
const SvgDynamicWrapper = styled.div`
  width: 100%;
  height: 97vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Redirect: FC<IProps> = (props) => {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push(props.href)
    }, 1000)
  }, [])
  return (
    <SvgDynamicWrapper>
      <SvgDynamic
        href="/icons/redirect/loading"
        customstyle={css`
          svg {
            width: 100px;
            height: 100px;
          }
        `}
      />
    </SvgDynamicWrapper>
  )
}

export default Redirect
