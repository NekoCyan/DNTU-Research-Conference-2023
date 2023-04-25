import React from "react";

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
    hasDarkBG: true,
    snackBars: [],
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
    hasDarkBG: true,
    snackBars: [],
    items: {}
  })

  return (
    <ModalContext.Provider value={{data, setData}}>
      {children}
    </ModalContext.Provider>
  )
}