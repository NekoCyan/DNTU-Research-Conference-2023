import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'

import { removeFrom } from 'src/utils/functions';

import { ModalContextProps, SnackBarDataProps } from 'src/types';

// Phương: Khởi tạo giá trị của một Slice trong redux
const initialState: ModalContextProps = {
  currentItemName: "",
  hasDarkBG: true,
  snackBars: [],
  items: {}
}

// Phương: Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng createAsyncThunk đi kèm với extraReducers
// Phương: https://redux-toolkit.js.org/api/createAsyncThunk
// export const fetchmodalAPI = createAsyncThunk(
//   'modal/fetchmodalAPI',
//   async () => {
//     const request = await axios.get(`${API_ROOT}/v1/modal`)
//     return request.data
//   }
// )
// Phương: Khởi tạo một slice trong redux store
export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // Phương: Lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
    // Phương: https:// Phương:redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    /**
     * Hàm này update riêng tên Item của modal.
     * @param state Toàn bộ state của Modal Slice.
     * @param action 
     * @returns 
     */
    updateCurrentItemNameState: (state, action: {type: string, payload: string}) => {
      let currentItemName = action.payload;
      state.currentItemName = currentItemName;
    },
    /**
     * Hàm này update riêng background của item.
     * @param state Toàn bộ state của Modal Slice.
     * @param action 
     * @returns 
     */
    updateHasDarkBGState: (state, action: {type: string, payload: boolean}) => {
      let hasDarkBG = action.payload;
      state.hasDarkBG = hasDarkBG;
    },
    /**
     * Hàm này update một item cho modal, bao gồm tên của item và background của item.
     * @param state Toàn bộ state của Modal Slice.
     * @param action 
     * @returns 
     */
    updateCurrentItem: (state, action: {type: string, payload: {currentItemName: string, hasDarkBG: boolean}}) => {
      let { currentItemName, hasDarkBG } = action.payload;
      state.hasDarkBG = hasDarkBG;
      state.currentItemName = currentItemName;
    },

    /**
     * Hàm này dùng để thêm một snackbar.
     * @param state Toàn bộ state của Modal Slice.
     * @param action 
     */
    addToSnackBarsState: (state, action: {type: string, payload: SnackBarDataProps}) => {
      let snackBar = action.payload;
      state.snackBars.push(snackBar);
      state.currentItemName = "snack-bar";
      state.hasDarkBG = false;
    },

    /**
     * Hàm này dùng để remove một snackbar bằng id.
     * @param state Toàn bộ state của Modal Slice.
     * @param action 
     */
    removeFromSnackBarsState: (state, action: {type: string, payload: string}) => {
      let id = action.payload;
      // let cpSnackBars = state.snackBars.slice();
      // let index = cpSnackBars.findIndex((snackBar: any) => snackBar.id === id);
      // if(data.snackBars.length === 1) cpSnackBars = [];
      // else cpSnackBars.splice(index, 1);
      state.snackBars = removeFrom<SnackBarDataProps>(state.snackBars, ele => ele.id, id);
      if(state.snackBars.length === 0) state.currentItemName = "";
    }
  }
  // ,
  // extraReducers: (builder) => {
  //   builder.addCase(fetchmodalAPI.fulfilled, (state, action) => {
  //     let modal = action.payload // Phương: chính là cái request.data phía trên

  //     state.currentmodal = modal
  //   })
  // }
})

// Phương: Action creators are generated for each case reducer function
// Phương: Actions: dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Phương: Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.
export const { 
  updateCurrentItemNameState,
  updateHasDarkBGState,
  updateCurrentItem,
  addToSnackBarsState,
  removeFromSnackBarsState
  // Phương
} = modalSlice.actions

// Phương: Selectors: mục đích là dành cho các components bên dưới gọi bằng useSelector() tới nó để lấy dữ liệu từ trong redux store ra sử dụng
/**
 * Select toàn bộ dữ liệu của Modal Slice.
 * @param state Toàn bộ state của Redux Store.
 * @returns 
 */
export const selectCurrentModalState = (state: any): ModalContextProps => {
  return state.modal
}

/**
 * Select tên hiện tại của item đang hiển thị.
 * @param state Toàn bộ state của Redux Store.
 * @returns 
 */
export const selectCurrentItemNameState = (state: any): string => {
  return state.modal.currentItemName;
}

/**
 * Select trạng thái hiển thị của background của item.
 * @param state Toàn bộ state của Redux Store.
 * @returns 
 */
export const selectHasDarkBGState = (state: any): boolean => {
  return state.modal.hasDarkBG;
}

/**
 * Select item hiện tại của Modal, bao gồm tên và trạng thái hiển thị background của item đó.
 * @param state Toàn bộ state của Redux Store.
 * @returns 
 */
export const selectCurrentItemState = (state: any): {currentItemName: string, hasDarkBG: boolean} => {
  return {currentItemName: state.modal.currentItemName, hasDarkBG: state.modal.hasDarkBG}
}

/**
 * Select snackbars.
 * @param state Toàn bộ state của Redux Store.
 * @returns 
 */
export const selectSnackBarsState = (state: any): Array<SnackBarDataProps> => {
  return state.modal.snackBars;
}

// Phương: Export default cái modalReducer của chúng ta để combineReducers trong store
export const modalReducer = modalSlice.reducer