import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

 

const rootReducer = combineReducers({user : userReducer})

const persistConfig={
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer) //we created persistedReducer to store the data in the local storage so that the data is not lost when we refresh the page and user does not have to SignIn again and again

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


export const persistor = persistStore(store) //persistor is used to store the data in the local storage so that the data is not lost when we refresh the page and user does not have to SignIn again and again