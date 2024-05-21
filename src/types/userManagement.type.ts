export interface IDriverProfile {
  id: string
  user_name: string
  email: string
  is_verify: boolean
  avatar: string | null
  date_of_birth: string | null
  company: string | null
  license: string | null
  bus_number: string | null
  language: string | null
  created_at: string
  updated_at: string
  phone_number: string | null
}

export interface ICustomerProfile {
  id: string
  user_name: string
  email: string
  avatar: string | null
  date_of_birth: string | null
  language: string | null
  created_at: string
  updated_at: string
  device: string | null
}

export interface ISchoolProfile {
  id: string
  name_en:String
  name_cn:String
}

export type UserManagementState = {
  drivers: IDriverProfile[] | []
  customers: ICustomerProfile[] | []
  admins: IDriverProfile[] | []
  schools: ISchoolProfile[] | []
}
