import { useQuery } from 'react-query'
import axios from 'axios'
import { UserInfo } from '../types/types'
import { useNavigate } from 'react-router-dom'

export const useQueryUser = () => {
  const navigate = useNavigate()
  const getCurrentUser = async () => {
    const { data } = await axios.get<UserInfo[]>(
      `${process.env.REACT_APP_URL}/trade_information`,
      {
        withCredentials: true,
      }
    )

    return data
  }

  return useQuery<UserInfo[], Error>({
    queryKey: 'user',
    queryFn: getCurrentUser,
    staleTime: Infinity,
    onError: () => navigate('/'),
  })
}
