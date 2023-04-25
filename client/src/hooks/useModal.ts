import React from "react";

import { ModalContext } from "src/contexts/ModalContext";

import { UserProps } from "src/types";

/**
 * __Custom Hook__
 * 
 * Hook này dùng để access vào value của ModalContext.
 * Hook này chỉ dùng cho các component khác muốn bật modal lên.
 * @returns 
 */
export function useModal() {
  const { data, setData } = React.useContext(ModalContext);
  const { currentItemName } = data;
  /**
   * Hàm này dùng để show một item nào đó trong Modal, bắng cách
   * assign giá trị mới cho `currentItem`.
   * @param item Tên của một item trong Modal
   * @returns 
   */
  const show = (item: string, hasDarkBG: boolean = true) => setData(prevState => ({...prevState, currentItemName: item, hasDarkBG: hasDarkBG}));
  /**
   * Hàm này dùng để ẩn đi item trong modal.
   * @returns 
   */
  const hide = () => setData(prevState => ({...prevState, currentItemName: ""}));
  return {
    currentItemName,
    show,
    hide
  }
}