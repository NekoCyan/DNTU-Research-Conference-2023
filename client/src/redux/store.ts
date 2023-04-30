import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from './user/userSlice'
import { itinerariesReducer } from './itineraries/ItinerariesSlice'
import { manifoldReducer } from './manifold/ManifoldSlice'
import { modalReducer } from './modal/ModalSlice' 
// https://www.npmjs.com/package/redux-persist
// https://edvins.io/how-to-use-redux-persist-with-redux-toolkit
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default là localstorage

const persistConfig = {
  key: 'root',
  // luu tru o local storage
  storage: storage,
  whitelist: [] // định nghĩa các slice được phép duy trì qua mỗi lần f5 trình duyệt
  // blacklist: ['user'] // // định nghĩa các slice không được phép duy trì qua mỗi lần f5 trình duyệt
}

const reducers = combineReducers({
  user: userReducer,
  itineraries: itinerariesReducer,
  manifold: manifoldReducer,
  modal: modalReducer
})

const persistedReducers = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  // Fix warning error when implement redux-persist
  // https://stackoverflow.com/a/63244831/8324172
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})