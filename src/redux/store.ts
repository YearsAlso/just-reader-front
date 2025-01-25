import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // 使用 localStorage 作为默认存储
import { combineReducers } from 'redux'
import ConfigSlice from './slices/configSlice' 

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  config: ConfigSlice, 
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store