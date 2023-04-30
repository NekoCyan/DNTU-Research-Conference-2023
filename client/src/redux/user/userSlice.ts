import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { UserProps } from 'src/types'

// import { API_ROOT } from 'utilities/constants'
// import { toast } from 'react-toastify'


// Khởi tạo giá trị một giá trị của Slice trong Redux
const initialState: {user: UserProps | null} = {
  user: null
}

// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng createAsyncThunk đi kèm với extraReducers
// https://redux-toolkit.js.org/api/createAsyncThunk
// export const signInUserAPI = createAsyncThunk(
//   'user/signInUserAPI',
//   async (data) => {
//     const request = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/sign_in`, data)
//     return request.data
//   }
// )

// export const signOutUserAPI = createAsyncThunk(
//   'user/signOutUserAPI',
//   async (showSuccessMessage = true) => {
//     const request = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/sign_out`)
//     if (showSuccessMessage) {
//       toast.success('User signed out successfully!', { theme: 'colored' })
//     }
//     return request.data
//   }
// )

// export const updateUserAPI = createAsyncThunk(
//   'user/updateUserAPI',
//   async ( data ) => {
//     const request = await axios.put(`${API_ROOT}/v1/users/update`, data)
//     if (request.data) {
//       toast.success('Updated successfully!', { theme: 'colored' })
//     }
//     return request.data
//   }
// )

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Hàm này dùng để update thông tin cho người dùng.
     * @param state Toàn bộ state của User Slice.
     * @param action 
     */
    updateCurrentUser: (state, action: {type: string, payload: UserProps | null}) => {
      const user = action.payload
      state.user = user ? {...state.user, ...user} : user;
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(signInUserAPI.fulfilled, (state, action) => {
    //   const user = action.payload
    //   state.currentUser = user
    //   state.isAuthenticated = true
    // })

    // builder.addCase(signOutUserAPI.fulfilled, (state) => {
    //   state.currentUser = null
    //   state.isAuthenticated = false
    // })

    // builder.addCase(updateUserAPI.fulfilled, (state, action) => {
    //   const updatedUser = action.payload
    //   state.currentUser = updatedUser
    // })
  }
})

// Action creators are generated for each case reducer function
// Actions: dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.

export const { 
  updateCurrentUser
} = userSlice.actions

// Selectors: mục đích là dành cho các components bên dưới gọi bằng useSelector() tới nó
// để lấy dữ liệu từ trong redux store ra sử dụng
/**
 * Select ra dữ liệu của người dùng.
 * @param state Toàn bộ state của Redux store.
 * @returns 
 */
export const selectCurrentUser = (state: any): UserProps | null => {
  return state.user.user
}

//Export default
export const userReducer = userSlice.reducer
