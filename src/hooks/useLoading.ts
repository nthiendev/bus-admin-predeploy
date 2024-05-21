import { useSelector } from '@/store/hooks'

export default function useLoading(action: string): boolean {
  return useSelector(state => !!state.common.loading[action])
}
