export interface ICardTemplate {
  id: string
  name: string
  price: number
  status: 'active' | 'inactive'
  image: string | null
}

export interface ICardRequest {
  request_date: string
  request_id: string
  customer_id: string
  receiver_name: string
  phone: string
  address: string
  postal_code: string
  ship_by: string
  ship_tracking: string
  status: 'pending' | 'shipped'
  note: string | null
}

export type ICardManagementState = {
  templates: ICardTemplate[] | []
  requests: ICardRequest[] | []
}
