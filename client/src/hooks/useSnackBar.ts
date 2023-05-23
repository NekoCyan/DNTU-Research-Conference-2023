import React from "react";

import {
  SnackBarDataProps
} from 'src/types'

import { useSelector, useDispatch } from 'react-redux'
import {
  selectSnackBarsState,
  addToSnackBarsState,
  removeFromSnackBarsState,
  updateCurrentItem
} from "src/redux/modal/ModalSlice";

/**
 * __Custom Hook__
 * 
 * Hook này dùng để sử dụng snack bar trong modal. Bởi vì snack bar là trường hợp đặc biệt cho nên cần phải sử dụng riêng.
 * @returns 
 */
export function useSnackBar() {
  const snackBars = useSelector(selectSnackBarsState) 
  const dispatch = useDispatch()

  /**
   * Hàm này dùng để push một snackbar. Nhận vào bao gồm các thông tin như bên dưới.
   * Dùng snack bar khi thông báo một cái gì đó. Mỗi snack bar được tạo ra sẽ có một id.
   * @param message Nội dung của thông báo.
   * @param title Tiêu đề của thông báo.
   * @param color Màu của snackbar.
   * @param duration Thời gian remove snackbar.
   */
  const pushSnackBar = (
    message: string,
    title?: string,
    color?: "error" | "success" | "warning" | "info",
    duration?: number
  ) => {
    let newSnackBar: SnackBarDataProps = {title, message, color, duration, id: message + Date.now()};
    dispatch(addToSnackBarsState(newSnackBar));
  }

  /**
   * Hàm này sẽ remove một snackbar dựa theo id truyền vào cho nó.
   * @param id Id của snack bar.
   */
  const removeSnackBar = (id: string) => {
    dispatch(removeFromSnackBarsState(id));
  }

  return {
    snackBars,
    pushSnackBar,
    removeSnackBar
  }
}