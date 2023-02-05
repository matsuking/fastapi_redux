import { FormEvent } from 'react'
import { useAppSelector } from '../app/hooks'
import { useMutateTradeInformation } from '../hooks/useMutateTradeInformation'
import { selectTradeInfo } from '../slices/appSlice'

export const useProcessTradeInformation = () => {
  const editedTradeInformation = useAppSelector(selectTradeInfo)
  const { createTradeInformationMutation, updateTradeInformation } =
    useMutateTradeInformation()

  const processTradeInformation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTradeInformation.id === '') {
      createTradeInformationMutation.mutate({
        trade: editedTradeInformation.trade,
        book: editedTradeInformation.book,
        product: editedTradeInformation.product,
      })
    } else {
      updateTradeInformation.mutate(editedTradeInformation)
    }
  }

  return { processTradeInformation }
}
