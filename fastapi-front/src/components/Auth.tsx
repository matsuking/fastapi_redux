import React from 'react'
import { useProcessAuth } from '../hooks/useProcessAuth'

export const Auth: React.FC = () => {
  const {
    pw,
    setPw,
    email,
    setEmail,
    isLogin,
    setIsLogin,
    registerMutation,
    loginMutation,
    processAuth,
  } = useProcessAuth()

  if (registerMutation.isLoading || loginMutation.isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div>
          <span>Fetch Trade Data from Mongo DB</span>
        </div>
        <h2>{isLogin ? 'Login' : 'Create a new account'}</h2>
        <form onSubmit={processAuth}>
          <div>
            <input
              name="email"
              type="email"
              autoFocus
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPw(e.target.value)}
              value={pw}
            />
          </div>
          <div>
            <button disabled={!email || !pw} type="submit">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        <button onClick={() => setIsLogin(!isLogin)}> Login ⇔ Register </button>
      </div>
    </>
  )
}
