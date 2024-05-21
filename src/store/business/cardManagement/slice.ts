import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  ICardManagementState,
  ICardRequest,
  ICardTemplate,
} from '@/types/cardManagement.type'
import { filter, map } from 'lodash'
import { requestData } from './requestData'

const initialState: ICardManagementState = {
  templates: [],
  requests: requestData,
}

const slice = createSlice({
  name: 'card-management',
  initialState,
  reducers: {
    getCardTemplatesSuccess: (
      state,
      { payload }: PayloadAction<ICardTemplate[]>,
    ) => {
      state.templates = payload
    },
    addCardTemplateSuccess: (
      state,
      { payload }: PayloadAction<ICardTemplate>,
    ) => {
      state.templates = [...state.templates, payload]
    },
    editCardTemplateSuccess: (
      state,
      { payload }: PayloadAction<ICardTemplate>,
    ) => {
      state.templates = map(state.templates, template => {
        if (template.id === payload.id) {
          return payload
        }
        return template
      })
    },
    deleteCardTemplateSuccess: (state, { payload }: PayloadAction<string>) => {
      state.templates = filter(
        state.templates,
        template => template.id !== payload,
      )
    },
    getCardRequestsSuccess: (
      state,
      { payload }: PayloadAction<ICardRequest[]>,
    ) => {
      state.requests = payload
    },
    updateCardRequestSuccess: (
      state,
      { payload }: PayloadAction<ICardRequest>,
    ) => {
      state.requests = map(state.requests, request => {
        if (request.request_id === payload.request_id) {
          return payload
        }
        return request
      })
    },
  },
})

export const cardManagementActions = slice.actions
export default slice.reducer
