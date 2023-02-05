import { useQuery } from 'react-query'
import axios from 'axios'
import { TradeInfo } from '../types/types'

export const useQueryTradeInfo = () => {
  const getTradeInfo = async () => {
    const { data } = await axios.get<TradeInfo[]>(
      `${process.env.REACT_APP_URL}/trade_information`,
      {
        withCredentials: true,
      }
    )

    return data
  }

  return useQuery<TradeInfo[], Error>({
    queryKey: 'trade_information',
    queryFn: getTradeInfo,
    staleTime: Infinity,
  })
}
