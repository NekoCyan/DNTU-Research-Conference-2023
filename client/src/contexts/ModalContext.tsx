import React, { useContext } from "react";

import { 
  ModalContextProps,
  ModalContextValues
} from 'src/types'

/*
  ModalContext là một context dùng để quản lý các thông tin hiện tại của một
  Modal. Modal sẽ chứa các item là các JSX.Element và mỗi item (element) này đều chứa
  tên, tên sẽ được lưu trong currentItem. Còn tên của các items sẽ được lưu trong items.
  Khi currentItem = tên của một item nào đó thì 
*/

export const ModalContext = React.createContext<ModalContextValues>({
  data: {
    currentItemName: "",
    items: {}
  },
  setData: () => {}
});

/**
 * __Provider__
 * 
 * ModalProvider cho phép dùng các modal items trong app. Chỉ nên
 * dùng một ModalProvider ở trong app.
 * @param props Props của ModalProvider.
 * @returns 
 * 
 * @example
 * // In Main or App
 * return (
 *   <Modal>
 *     <AnotherComponent1 />
 *     <AnotherComponent1 />
 *     <Modal.Item name="information-side" component={LeftSideInfo} type="left-side" />
 *     <Modal.Item name="shedule-save-dialog" component={SheduleSave} type="dialog" />
 *   </Modal>
 * )
 * 
 * // In other components
 * import { useModal } from 'src/contexts/ModalContext'
 * 
 * export default function AnotherComponent1() {
 *   const { show } = useModal();
 *   const showInfo = () => {
 *     // Muốn show item nào thì bỏ đúng tên của item đó vào.
 *     show("information-side");
 *   }
 *   return (...)
 * }
 */
export function ModalProvider({
  children
}: {
  children: JSX.Element[] | JSX.Element | null}
) {
  const [data, setData] = React.useState<ModalContextProps>({
    currentItemName: "",
    items: {}
  })

  return (
    <ModalContext.Provider value={{data, setData}}>
      {children}
    </ModalContext.Provider>
  )
}
/**
 * __Custom Hook__
 * 
 * Hook này dùng để access vào value của ModalContext.
 * Hook này chỉ dùng cho các component khác muốn bật modal lên.
 * @returns 
 */
export function useModal() {
  const { data, setData } = useContext(ModalContext);
  const { currentItemName } = data;
  /**
   * Hàm này dùng để show một item nào đó trong Modal, bắng cách
   * assign giá trị mới cho `currentItem`.
   * @param item Tên của một item trong Modal
   * @returns 
   */
  const show = (item: string) => setData({...data, currentItemName: item});
  /**
   * Hàm này dùng để ẩn đi item trong modal.
   * @returns 
   */
  const hide = () => setData({...data, currentItemName: ""});
  return {
    currentItemName,
    show,
    hide
  }
}