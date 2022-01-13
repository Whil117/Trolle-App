import HeadApp from '@Components/Head'
import AuthLayout from '@Components/layout/Auth'
import Layout from '@Components/layout/layout'

import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <RecoilRoot>
      <AuthLayout {...{ router }}>
        <Layout {...{ router }}>
          <HeadApp>
            <Component {...pageProps} />
          </HeadApp>
        </Layout>
      </AuthLayout>
    </RecoilRoot>
  )
}

export default MyApp
