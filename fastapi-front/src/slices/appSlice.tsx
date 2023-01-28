import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { TradeInfo } from '../types/types'

// 管理したいstate一覧
export interface AppState {
  editedTradeInfo: TradeInfo
  csrfTokenExp: boolean
}

const initialState: AppState = {
  editedTradeInfo: {
    trade: '',
    book: '',
    product: '',
  },
  csrfTokenExp: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setEditedTradeInfo: (state, action: PayloadAction<TradeInfo>) => {
      state.editedTradeInfo = action.payload
    },
    resetEditedTradeInfo: (state) => {
      state.editedTradeInfo = initialState.editedTradeInfo
    },
    toggleCsrfState: (state) => {
      state.csrfTokenExp = !state.csrfTokenExp
    },
  },
})

export const { setEditedTradeInfo, resetEditedTradeInfo, toggleCsrfState } =
  appSlice.actions

export const selectTradeInfo = (state: RootState) => state.app.editedTradeInfo
export const selectCsrfState = (state: RootState) => state.app.csrfTokenExp

export default appSlice.reducer
