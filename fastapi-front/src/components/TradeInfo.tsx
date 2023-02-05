import React, { useState } from 'react'
import { useProcessAuth } from '../hooks/useProcessAuth'
import { useProcessTradeInformation } from '../hooks/useProcessTradeInformation'
import { useQueryUser } from '../hooks/useQueryUser'
import { useQueryTradeInfo } from '../hooks/useQueryTradeInfo'
import { useQuerySingleTradeInfo } from '../hooks/useQuerySingleTradeInfo'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectTradeInfo, setEditedTradeInfo } from '../slices/appSlice'
import { TradeItemMemo } from './TradeItem'

export const TradeInfo = () => {
  const [id, setId] = useState('')
  const { logout } = useProcessAuth()
  const { data: dataUser } = useQueryUser()
  const { data: dataTradeInfo, isLoading: isLoadingTradeInfo } =
    useQueryTradeInfo()
  const { data: dataSingleTradeInfo, isLoading: isLoadingSingleTradeInfo } =
    useQuerySingleTradeInfo(id)

  const { processTradeInformation } = useProcessTradeInformation()
  const dispatch = useAppDispatch()
  const editedTradeInformation = useAppSelector(selectTradeInfo)

  return (
    <div style={{ textAlign: 'center' }}>
      <span>CRUD TradeInformation</span>
      <p>{dataUser?.map((user) => user.email)}</p>
      <button onClick={logout}>Logout</button>

      <form onSubmit={processTradeInformation}>
        <input
          type="text"
          placeholder="tradeを入力してください"
          onChange={(e) =>
            dispatch(
              setEditedTradeInfo({
                ...editedTradeInformation,
                trade: e.target.value,
              })
            )
          }
          value={editedTradeInformation.trade}
        />
        <input
          type="text"
          placeholder="bookを入力してください"
          onChange={(e) =>
            dispatch(
              setEditedTradeInfo({
                ...editedTradeInformation,
                book: e.target.value,
              })
            )
          }
          value={editedTradeInformation.book}
        />
        <input
          type="text"
          placeholder="productを入力してください"
          onChange={(e) =>
            dispatch(
              setEditedTradeInfo({
                ...editedTradeInformation,
                product: e.target.value,
              })
            )
          }
          value={editedTradeInformation.product}
        />
        <button
          disabled={
            !editedTradeInformation.trade ||
            !editedTradeInformation.book ||
            !editedTradeInformation.product
          }
        >
          {editedTradeInformation.id === ''
            ? 'Create TradeInfo'
            : 'Update TradeInfo'}
        </button>
      </form>
      {isLoadingTradeInfo ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {dataTradeInfo?.map((trade) => (
            <TradeItemMemo
              key={trade.id}
              id={trade.id}
              trade={trade.trade}
              book={trade.book}
              product={trade.product}
              setId={setId}
            />
          ))}
        </ul>
      )}
      <h2>Selected TradeInformation</h2>
      {isLoadingSingleTradeInfo && <p>Loading...</p>}
      <p>{dataSingleTradeInfo?.trade}</p>
      <p>{dataSingleTradeInfo?.book}</p>
      <p>{dataSingleTradeInfo?.product}</p>
    </div>
  )
}
