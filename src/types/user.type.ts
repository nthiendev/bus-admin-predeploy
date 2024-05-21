export interface IUserProfile {
  id: string
  email: string
  user_name: string
}

export interface IUserState {
  profile: IUserProfile | null
}
