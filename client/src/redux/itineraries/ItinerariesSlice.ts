import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'

import { removeFrom } from 'src/utils/functions'

import { ItineraryProps } from 'src/types'

// Phương: Khởi tạo giá trị của một Slice trong redux
const initialState: {itineraries: {[key: string]: ItineraryProps} | null} = {
  itineraries: null
}

// Phương: Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng createAsyncThunk đi kèm với extraReducers
// Phương: https://redux-toolkit.js.org/api/createAsyncThunk
// export const fetchItinerariesAPI = createAsyncThunk(
//   'Itineraries/fetchItinerariesAPI',
//   async () => {
//     const request = await axios.get(`${API_ROOT}/v1/Itineraries`)
//     return request.data
//   }
// )
// Phương: Khởi tạo một slice trong redux store
export const ItinerariesSlice = createSlice({
  name: 'itineraries',
  initialState,
  reducers: {
    // Phương: Lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
    // Phương: https:// Phương:redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    /**
     * Hàm này đùng dể update lịch trình của hành trình du lịch.
     * @param state Toàn bộ state của Itineraries Slice.
     * @param action 
     */
    updateCurrentItineraries: (state, action: {type: string, payload: {[key: string]: ItineraryProps} | null}) => {
      const itineraries = action.payload
      state.itineraries = itineraries ? {...itineraries} : null;
    },

    updateItinerary: (state, action: {type: string, payload: {id: string, itinerary: ItineraryProps}}) => {
      let { id, itinerary } = action.payload;
      if(state.itineraries && state.itineraries[id]) {
        state.itineraries![id] = Object.assign(state.itineraries![id], itinerary);
      }
    },
    /**
     * Thêm một du lịch trình hành trình du lịch vào danh sách.
     * @param state Toàn bộ state của Itineraries Slice.
     * @param action 
     */
    addToItineraries: (state, action: {type: string, payload: ItineraryProps}) => {
      let itinerary = action.payload;
      let id = itinerary._id!;
      if(!state.itineraries) state.itineraries = {};
      state.itineraries[id] = itinerary;
    },
    /**
     * Bỏ một lịch trình hành trình du lịch khỏi danh sách.
     * @param state Toàn bộ state của Itineraries Slice.
     * @param action 
     */
    removeFromItineraries: (state, action: {type: string, payload: string}) => {
      let id = action.payload;
      if(state.itineraries) delete state.itineraries[id];
    },
  }
  // ,
  // extraReducers: (builder) => {
  //   builder.addCase(fetchItinerariesAPI.fulfilled, (state, action) => {
  //     let Itineraries = action.payload // Phương: chính là cái request.data phía trên

  //     state.currentItineraries = Itineraries
  //   })
  // }
})

// Phương: Action creators are generated for each case reducer function
// Phương: Actions: dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Phương: Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.
export const { 
  updateCurrentItineraries,
  updateItinerary,
  addToItineraries,
  removeFromItineraries,
  // Phương
} = ItinerariesSlice.actions

// Phương: Selectors: mục đích là dành cho các components bên dưới gọi bằng useSelector() tới nó để lấy dữ liệu từ trong redux store ra sử dụng
export const selectCurrentItineraries = (state: any): Array<ItineraryProps> | null => {
  return state.itineraries.itineraries
}

// Phương: Export default cái ItinerariesReducer của chúng ta để combineReducers trong store
export const itinerariesReducer = ItinerariesSlice.reducer