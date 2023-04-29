import React from "react";

import {
  SnackBarDataProps
} from 'src/types'

import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentModal, updateCurrentModal } from "src/redux/modal/ModalSlice";

/**
 * __Custom Hook__
 * 
 * Hook này dùng để sử dụng snack bar trong modal. Bởi vì snack bar là trường hợp đặc biệt cho nên cần phải sử dụng riêng.
 * @returns 
 */
export function useSnackBar() {
  const data = useSelector(selectCurrentModal) 
  const dispatch = useDispatch()
  let { snackBars } = data;

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
    let cpSnackBars = data.snackBars.slice();
    let newSnackBar: SnackBarDataProps = {title, message, color, duration, id: message + Date.now()};
    cpSnackBars.push(newSnackBar)
    dispatch(updateCurrentModal({...data, currentItemName: "snack-bar", hasDarkBG: false, snackBars: cpSnackBars}))
  }

  /**
   * Hàm này sẽ remove một snackbar dựa theo id truyền vào cho nó.
   * @param id Id của snack bar.
   */
  const removeSnackBar = (id: string) => {
    let cpSnackBars = data.snackBars?.slice();
    let index = cpSnackBars.findIndex((snackBar: any) => snackBar.id === id);
    if(data.snackBars.length === 1) cpSnackBars = [];
    else cpSnackBars.splice(index, 1);
    if(cpSnackBars.length === 0) return dispatch(updateCurrentModal({...data, currentItemName: "", hasDarkBG: false, snackBars: cpSnackBars}))
    dispatch(updateCurrentModal({...data, hasDarkBG: false, snackBars: cpSnackBars}))
  }

  return {
    snackBars,
    pushSnackBar,
    removeSnackBar
  }
}