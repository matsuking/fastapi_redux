import React from 'react'
import { useProcessAuth } from '../hooks/useProcessAuth'

export const TradeInfo: React.FC = () => {
  const { logout } = useProcessAuth()
  return <button onClick={logout}>Logout</button>
}
