import actionGenerator from '@/store/actionGenerator'
import { dispatch } from '@/store/store'
import { apiAuthCaller } from '@/utils/axiosClient'
import { userManagementActions } from './slice'

export const getDrivers = () =>
  actionGenerator(
    async () => {
      const { data } = await apiAuthCaller('get', '/drivers/')

      dispatch(userManagementActions.getDriversSuccess(data))
    },
    { loadingName: 'getDrivers' },
  )

export const getCustomers = () =>
  actionGenerator(
    async () => {
      const { data } = await apiAuthCaller('get', '/parents/')

      dispatch(userManagementActions.getCustomersSuccess(data))
    },
    { loadingName: 'getCustomers' },
  )

export const getAdmins = () =>
  actionGenerator(
    async () => {
      const { data } = await apiAuthCaller('get', '/admins')

      dispatch(userManagementActions.getAdminsSuccess(data))
    },
    { loadingName: 'getAdmins' },
  )

  export const getSchoolList = () =>
    actionGenerator(
      async () => {
        const { data } = await apiAuthCaller('get', '/schools/')
  
        dispatch(userManagementActions.getSchoolList(data))
      },
      { loadingName: 'getSchoolList' },
    )
  
