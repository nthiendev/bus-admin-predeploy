import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUserProfile, IUserState } from '@/types/user.type'

const initialState: IUserState = {
  profile: null,
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInSuccess: (
      state,
      {
        payload,
      }: PayloadAction<{
        accessToken: string
        profile: IUserProfile
        isRemember?: boolean
      }>,
    ) => {
      const { accessToken, profile, isRemember } = payload
      if (isRemember) {
        window.sessionStorage.removeItem('accessToken')
        window.localStorage.setItem('accessToken', accessToken)
      } else {
        window.localStorage.removeItem('accessToken')
        window.sessionStorage.setItem('accessToken', accessToken)
      }
      state.profile = profile
    },
    logoutSuccess: state => {
      state.profile = null
      window.sessionStorage.removeItem('accessToken')
      window.localStorage.removeItem('accessToken')
    },
    getUserProfileSuccess: (
      state,
      { payload }: PayloadAction<IUserProfile>,
    ) => {
      state.profile = payload
    },
  },
})

export const userActions = slice.actions
export default slice.reducer
