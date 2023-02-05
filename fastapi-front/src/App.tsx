import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CsrfToken } from './types/types'
import { useAppSelector } from './app/hooks'
import { selectCsrfState } from './slices/appSlice'
import { Auth } from './components/Auth'
import { TradeInfo } from './components/TradeInfo'

export const App = () => {
  const csrf = useAppSelector(selectCsrfState)

  useEffect(() => {
    const getCsrfToken = async () => {
      const res = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_URL}/csrftoken`
      )

      // get, put, deleteすべてのメソッドに、commonで設定する
      axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrf_token
    }

    getCsrfToken()
  }, [csrf])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/trade_information" element={<TradeInfo />} />
      </Routes>
    </BrowserRouter>
  )
}
