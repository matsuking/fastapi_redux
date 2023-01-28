import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useMutateAuth } from '../hooks/useMutateAuth'

export const useProcessAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const { loginMutation, registerMutation, logoutMutation } = useMutateAuth()

  const processAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate({
        email: email,
        password: pw,
      })
    } else {
      // mutateAsyncは更新が終わるまで待ってくれる
      await registerMutation
        .mutateAsync({
          email: email,
          password: pw,
        })
        .then(() =>
          loginMutation.mutate({
            email: email,
            password: pw,
          })
        )
        .catch(() => {
          setEmail('')
          setPw('')
        })
    }
  }

  const logout = async () => {
    await logoutMutation.mutateAsync()

    // casheの内容を削除
    queryClient.removeQueries('tradeinfo')
    queryClient.removeQueries('user')
    navigate('/')
  }

  return {
    email,
    setEmail,
    pw,
    setPw,
    isLogin,
    setIsLogin,
    processAuth,
    registerMutation,
    loginMutation,
    logout,
  }
}
