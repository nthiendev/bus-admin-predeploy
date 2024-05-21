import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'

import BlogReducer from './apps/blog/BlogSlice'
import ChatsReducer from './apps/chat/ChatSlice'
import ContactsReducer from './apps/contacts/ContactSlice'
import EcommerceReducer from './apps/eCommerce/ECommerceSlice'
import EmailReducer from './apps/email/EmailSlice'
import NotesReducer from './apps/notes/NotesSlice'
import TicketReducer from './apps/tickets/TicketSlice'
import UserProfileReducer from './apps/userProfile/UserProfileSlice'
import counterReducer from './counter/counterSlice'
import CustomizerReducer from './customizer/CustomizerSlice'

import CommonReducer from './business/common/slice'
import UserReducer from './business/user/slice'
import UserManagementReducer from './business/userManagement/slice'
import CardManagementReducer from './business/cardManagement/slice'

const rootReducer = combineReducers({
  counter: counterReducer,
  customizer: persistReducer(
    {
      key: 'customizer',
      storage,
    },
    CustomizerReducer,
  ),
  ecommerceReducer: EcommerceReducer,
  chatReducer: ChatsReducer,
  emailReducer: EmailReducer,
  notesReducer: NotesReducer,
  contactsReducer: ContactsReducer,
  ticketReducer: TicketReducer,
  userpostsReducer: UserProfileReducer,
  blogReducer: BlogReducer,

  common: CommonReducer,
  user: UserReducer,
  userManagement: UserManagementReducer,
  cardManagement: CardManagementReducer,
})

export default rootReducer
