import React from "react";


import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentItemState, updateCurrentItem } from "src/redux/modal/ModalSlice";

/**
 * __Custom Hook__
 * 
 * Hook này dùng để access vào value của ModalContext.
 * Hook này chỉ dùng cho các component khác muốn bật modal lên.
 * @returns 
 */
export function useModal() {
  const { currentItemName, hasDarkBG } = useSelector(selectCurrentItemState) 
  const dispatch = useDispatch();
  /**
   * Hàm này dùng để show một item nào đó trong Modal, bắng cách
   * assign giá trị mới cho `currentItem`.
   * @param item Tên của một item trong Modal
   * @returns 
   */
  const show = (item: string, hasDarkBG: boolean = true) => {
    dispatch(updateCurrentItem({currentItemName: item, hasDarkBG: hasDarkBG}))
  }
  /**
   * Hàm này dùng để ẩn đi item trong modal.
   * @returns 
   */
  const hide = () => {
    dispatch(updateCurrentItem({currentItemName: "", hasDarkBG: false}))
  }
  return {
    currentItemName,
    hasDarkBG,
    show,
    hide
  }
}