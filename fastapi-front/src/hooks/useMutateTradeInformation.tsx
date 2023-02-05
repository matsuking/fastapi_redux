import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from 'react-query'
import { useAppDispatch } from '../app/hooks'
import { resetEditedTradeInfo, toggleCsrfState } from '../slices/appSlice'
import { TradeInfo } from '../types/types'

export const useMutateTradeInformation = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createTradeInformationMutation = useMutation(
    (tradeinfo: Omit<TradeInfo, 'id'>) =>
      axios.post<TradeInfo>(
        `${process.env.REACT_APP_URL}/trade_information`,
        tradeinfo,
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: (res: any) => {
        const previousTradeInformation =
          queryClient.getQueryData<TradeInfo[]>('trade_information')
        if (previousTradeInformation) {
          console.log(previousTradeInformation)
          console.log(res.data)
          queryClient.setQueryData('trade_information', [
            ...previousTradeInformation,
            res.data,
          ])
        }
        dispatch(resetEditedTradeInfo())
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (
          err.response.data.detail === 'The JWT has expired' ||
          err.response.data.detail === 'The CSRF token has expired'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedTradeInfo())
          navigate('/')
        }
      },
    }
  )

  const updateTradeInformation = useMutation(
    (tradeinfo: TradeInfo) =>
      axios.put<TradeInfo>(
        `${process.env.REACT_APP_URL}/trade_information/${tradeinfo.id}`,
        {
          trade: tradeinfo.trade,
          book: tradeinfo.book,
          product: tradeinfo.product,
        },
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: (res, variables) => {
        const previousTradeInformation =
          queryClient.getQueryData<TradeInfo[]>('trade_information')

        console.log(res)
        console.log(variables)
        if (previousTradeInformation) {
          queryClient.setQueryData<TradeInfo[]>(
            'trade_information',
            previousTradeInformation.map((tradeinfo) =>
              tradeinfo.id === variables.id ? res.data : tradeinfo
            )
          )
        }
        dispatch(resetEditedTradeInfo())
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (
          err.response.data.detail === 'The JWT has expired' ||
          err.response.data.detail === 'The CSRF token has expired'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedTradeInfo())
          navigate('/')
        }
      },
    }
  )

  const deleteTradeInformation = useMutation(
    (id: string) =>
      axios.delete<TradeInfo>(
        `${process.env.REACT_APP_URL}/trade_information/${id}`,
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: (res, variables) => {
        const previousTradeInformation =
          queryClient.getQueryData<TradeInfo[]>('trade_information')
        if (previousTradeInformation) {
          queryClient.setQueryData<TradeInfo[]>(
            'trade_information',
            previousTradeInformation.filter((trade) => trade.id !== variables)
          )
        }
        dispatch(resetEditedTradeInfo())
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`)
        if (
          err.response.data.detail === 'The JWT has expired' ||
          err.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState())
          dispatch(resetEditedTradeInfo())
          navigate('/')
        }
      },
    }
  )

  return {
    createTradeInformationMutation,
    updateTradeInformation,
    deleteTradeInformation,
  }
}
