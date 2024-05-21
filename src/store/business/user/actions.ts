import actionGenerator from '@/store/actionGenerator'
import { dispatch } from '@/store/store'
import { apiCaller } from '@/utils/axiosClient'
import toast from 'react-hot-toast'
import { userActions } from './slice'
import { omit } from 'lodash'

export const login = (
  payload: { email: string; password: string; isRemember?: boolean },
  cb?: () => void,
) =>
  actionGenerator(
    async () => {
      const { data } = await apiCaller('post', '/login/', {
        data: { type: 'admin', ...omit(payload, 'isRemember') },
      })

      dispatch(
        userActions.signInSuccess({
          profile: data.user,
          accessToken: data.AuthenticationResult.AccessToken,
          isRemember: payload.isRemember,
        }),
      )
      cb?.()
      toast.success('Login successful')
    },
    { loadingName: 'login' },
  )
