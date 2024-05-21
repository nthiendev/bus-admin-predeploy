import toast from 'react-hot-toast'
import { commonActions } from './business/common/slice'
import { dispatch } from './store'

interface IActionGeneratorOptions {
  loadingName?: string | string[]
  errorCb?: (error: any) => void
  finallyCb?: () => void
}
interface IActionGenerator {
  (
    logic: () => Promise<any>,
    options?: IActionGeneratorOptions,
  ): () => Promise<void>
}

const actionGenerator: IActionGenerator = (
  logic,
  { loadingName, errorCb, finallyCb } = {},
) => {
  const isEnableLoading = !!loadingName
  return async () => {
    try {
      if (isEnableLoading) {
        dispatch(commonActions.enableLoading(loadingName))
      }
      await logic()
    } catch (error) {
      if (errorCb) {
        return errorCb(error)
      }

      toast.error('The system has a problem')
      console.log(loadingName, error)
    } finally {
      finallyCb?.()
      if (isEnableLoading) {
        dispatch(commonActions.disableLoading(loadingName))
      }
    }
  }
}
export default actionGenerator
