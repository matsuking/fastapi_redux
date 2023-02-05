import { useQuery } from 'react-query'
import axios from 'axios'
import { TradeInfo } from '../types/types'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { resetEditedTradeInfo, toggleCsrfState } from '../slices/appSlice'

export const useQuerySingleTradeInfo = (id: string) => {
  const navigate = useNavigate()
  const dispath = useAppDispatch()
  const getSingleTradeInformation = async (id: string) => {
    const { data } = await axios.get<TradeInfo>(
      `${process.env.REACT_APP_URL}/trade_information/${id}`,
      {
        withCredentials: true,
      }
    )

    return data
  }

  return useQuery<TradeInfo, Error>({
    queryKey: ['trade_information', id],
    queryFn: () => getSingleTradeInformation(id),
    enabled: !!id,
    staleTime: Infinity,
    onError: (err: any) => {
      alert(`${err.response.data.detail}\n${err.message}`)
      if (
        err.response.data.detail === 'The JWT has expired' ||
        err.response.data.detail === 'The CSRF Token has expired'
      ) {
        dispath(toggleCsrfState())
        dispath(resetEditedTradeInfo())
        navigate('/')
      }
    },
  })
}
