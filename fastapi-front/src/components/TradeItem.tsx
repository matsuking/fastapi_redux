import React, { memo } from 'react'
import { TradeInfo } from '../types/types'
import { useAppDispatch } from '../app/hooks'
import { setEditedTradeInfo } from '../slices/appSlice'
import { useMutateTradeInformation } from '../hooks/useMutateTradeInformation'

const TradeItem: React.FC<
  // typescriptのintersectionという手法で、型を追加することができる。
  TradeInfo & {
    setId: React.Dispatch<React.SetStateAction<string>>
  }
> = ({ id, trade, book, product, setId }) => {
  const dispatch = useAppDispatch()
  const { deleteTradeInformation } = useMutateTradeInformation()

  return (
    <>
      <li>
        <span onClick={() => setId(id)}>{trade}</span>
      </li>
      <div>
        <button
          onClick={() => {
            dispatch(
              setEditedTradeInfo({
                id: id,
                trade: trade,
                book: book,
                product: product,
              })
            )
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            deleteTradeInformation.mutate(id)
          }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

export const TradeItemMemo = memo(TradeItem)
