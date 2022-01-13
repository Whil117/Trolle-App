import { useRouter } from 'next/router'
import { textState } from 'pages'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

interface IProps {}

const Other: FC<IProps> = () => {
  const todoList = useRecoilValue(textState)
  const router = useRouter()

  return (
    <div>
      <h1>Other</h1>
      <button onClick={() => router.push('/')}>Back</button>
      <pre>{JSON.stringify(todoList)}</pre>
    </div>
  )
}

export default Other
