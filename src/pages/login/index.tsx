import { css } from '@emotion/react'
import { ButtonForm } from '@Styles/global'
import colors from '@Styles/global/colors'
import * as S from '@Styles/pages/login'
import { UserData } from '@Types/pages/login/types'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { atom, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const userData = atom({
  key: 'userData',
  default: {
    username: '',
    password: '',
    authethicated: false,
  },
  effects_UNSTABLE: [persistAtom],
})

const LoginPage: NextPage = () => {
  const [user, setUser] = useRecoilState<UserData>(userData)

  return (
    <S.AddTodoFormWrapper
      customstyle={css`
        display: flex;
        width: 100%;
        justify-content: center;
        height: 100vh;
        color: ${colors.black};
      `}
    >
      <S.AddTodoFormWrapper
        customstyle={css`
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
        `}
      >
        <div>
          <h1>Welcome to back!</h1>
          <S.LoginPageText
            customstyle={css`
              opacity: 0.75;
              font-size: 1.1rem;
            `}
          >
            Welcome back! Please enter your details
          </S.LoginPageText>
          <Formik
            initialValues={{ username: user.username, password: user.password }}
            validate={(values) => {
              let errors: { [key: string]: string } = {}
              if (!values.username) {
                errors.username = 'username is required'
              }
              if (!values.password) {
                errors.password = 'Password is required'
              }
              return errors
            }}
            onSubmit={(event) => {
              setUser({
                username: event.username,
                password: event.password,
                authethicated: true,
              })
            }}
          >
            {({ touched, errors }) => (
              <Form>
                <S.AddTodoFormWrapper
                  customstyle={css`
                    display: flex;
                    flex-direction: column;
                    margin: 20px 0;
                  `}
                >
                  <S.AddTodoFormLabelText
                    htmlFor="email"
                    customstyle={css`
                      margin: 10px 0;
                      opacity: 0.75;
                    `}
                  >
                    Username
                  </S.AddTodoFormLabelText>
                  <S.AddTodoFormInput
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                  />
                  {touched.username && errors.username && (
                    <S.AddTodoFormError>{errors.username}</S.AddTodoFormError>
                  )}
                </S.AddTodoFormWrapper>
                <S.AddTodoFormWrapper
                  customstyle={css`
                    display: flex;
                    flex-direction: column;
                    margin: 20px 0;
                  `}
                >
                  <S.AddTodoFormLabelText
                    htmlFor="password"
                    customstyle={css`
                      margin: 10px 0;
                      opacity: 0.75;
                    `}
                  >
                    Password
                  </S.AddTodoFormLabelText>
                  <S.AddTodoFormInput
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    id="password"
                  />
                  {touched.password && errors.password && (
                    <S.AddTodoFormError>{errors.password}</S.AddTodoFormError>
                  )}
                </S.AddTodoFormWrapper>
                <ButtonForm
                  customstyle={css`
                    border: none;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    color: white;
                    font-weight: bold;
                    font-size: 1.2rem;
                    background: ${colors.green_light};
                    border-radius: 5px;
                    padding: 12px 19px;
                    cursor: pointer;
                  `}
                  type="submit"
                >
                  Sign in
                </ButtonForm>
              </Form>
            )}
          </Formik>
        </div>
      </S.AddTodoFormWrapper>

      <S.AddTodoFormWrapper
        customstyle={css`
          @media (max-width: 1096px) {
            display: none;
          }
          span {
            width: 657px;
          }
        `}
      >
        <img src="/images/background.png" alt="background" loading="lazy" />
      </S.AddTodoFormWrapper>
    </S.AddTodoFormWrapper>
  )
}

export default LoginPage
