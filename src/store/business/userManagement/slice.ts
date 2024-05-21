
import {
  ICustomerProfile,
  IDriverProfile,
  UserManagementState,
  ISchoolProfile
} from '@/types/userManagement.type'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getSchoolList } from './actions'

const initialState: UserManagementState = {
  drivers: [],
  customers: [],
  admins: [],
  schools: []
}

const slice = createSlice({
  name: 'user-management',
  initialState,
  reducers: {
    getDriversSuccess: (
      state,
      { payload }: PayloadAction<IDriverProfile[]>,
    ) => {
      state.drivers = payload
    },
    getCustomersSuccess: (
      state,
      { payload }: PayloadAction<ICustomerProfile[]>,
    ) => {
      state.customers = payload
    },
    getAdminsSuccess: (state, { payload }: PayloadAction<IDriverProfile[]>) => {
      state.admins = payload
    },
    getSchoolList: (
      state,
      { payload }: PayloadAction<ISchoolProfile[]>,
    ) => {
      state.schools = payload
    },
  },
})

export const userManagementActions = slice.actions
export default slice.reducer
