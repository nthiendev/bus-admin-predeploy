import actionGenerator from '@/store/actionGenerator'
import { dispatch } from '@/store/store'
import { apiAuthCaller } from '@/utils/axiosClient'
import { cardManagementActions } from './slice'
import { ICardRequest, ICardTemplate } from '@/types/cardManagement.type'
import toast from 'react-hot-toast'

export const getCardTemplates = () =>
  actionGenerator(
    async () => {
      const { data } = await apiAuthCaller('get', '/templates/')
      dispatch(cardManagementActions.getCardTemplatesSuccess(data))
    },
    { loadingName: 'getCardTemplates' },
  )

export const addCardTemplate = (
  payload: Partial<ICardTemplate>,
  cb?: () => void,
) =>
  actionGenerator(
    async () => {
      const { data } = await apiAuthCaller('post', '/templates/', {
        data: payload,
      })
      cb?.()
      dispatch(cardManagementActions.addCardTemplateSuccess(data))
      toast.success('Add Card Template successful')
    },
    { loadingName: 'addCardTemplate' },
  )

export const editCardTemplate = (
  payload: ICardTemplate,
  showMessage?: boolean,
  cb?: () => void,
) =>
  actionGenerator(
    async () => {
      // const { data } = await apiAuthCaller('post', '/templates/', {
      //   data: payload,
      // })

      cb?.()
      dispatch(cardManagementActions.editCardTemplateSuccess(payload))
      if (showMessage) toast.success('Edit Card Template successful')
    },
    { loadingName: 'editCardTemplate' },
  )

export const deleteCardTemplate = (payload: string) =>
  actionGenerator(async () => {
    // const { data } = await apiAuthCaller('post', '/templates/', {
    //   data: payload,
    // })

    dispatch(cardManagementActions.deleteCardTemplateSuccess(payload))
    toast.success('Delete Card Template successful')
  })

export const getCardRequests = () =>
  actionGenerator(
    async () => {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('')
        }, 600)
      })
      // const { data } = await apiAuthCaller('get', '/templates/')
      // dispatch(cardManagementActions.getCardRequestsSuccess(data))
    },
    { loadingName: 'getCardRequests' },
  )

export const updateCardRequest = (payload: ICardRequest, cb?: () => void) =>
  actionGenerator(
    async () => {
      // const { data } = await apiAuthCaller('post', '/templates/', {
      //   data: payload,
      // })

      cb?.()
      dispatch(cardManagementActions.updateCardRequestSuccess(payload))
      toast.success('Update Card Request successful')
    },
    { loadingName: 'updateCardRequest' },
  )
