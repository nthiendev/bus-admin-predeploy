import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'

import rootReducer from './reducer'

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
})

const persistor = persistStore(store)
const { dispatch } = store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof rootReducer>
export { store, persistor, dispatch }
