import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent } from 'react'
import { atom, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const textState = atom({
  key: 'textState',
  default: '',
  effects_UNSTABLE: [persistAtom],
})

const Home: NextPage = () => {
  const [text, setText] = useRecoilState(textState)

  const router = useRouter()
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
      <button onClick={() => router.push('/other')}>Next</button>
    </div>
  )
}

export default Home
