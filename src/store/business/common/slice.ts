import { ICommonState } from '@/types/common.type'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { forEach } from 'lodash'

const initialState: ICommonState = {
  loading: {},
}

const slice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    enableLoading: (state, { payload }: PayloadAction<string | string[]>) => {
      if (typeof payload === 'string') {
        state.loading[payload] = true
      } else {
        forEach(payload, item => {
          state.loading[item] = true
        })
      }
    },
    disableLoading: (state, { payload }: PayloadAction<string | string[]>) => {
      if (typeof payload === 'string') {
        state.loading[payload] = false
      } else {
        forEach(payload, item => {
          state.loading[item] = false
        })
      }
    },
  },
})

export const commonActions = slice.actions
export default slice.reducer
