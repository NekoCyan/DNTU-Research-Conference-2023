import React from 'react'

import { useModal } from 'src/hooks/useModal';

import {
  ModalProps,
  ModalItemProps
} from 'src/types'

import './ModalStyles.css'

function Item({
  name,
  component,
  type
}: ModalItemProps) {
  if(type === "snack-bar") {
    type += " pb-4";
  }

  return (
    <div className={`modal-item ${type}`}>
      {component()}
    </div>
  )
}

export default function Modal({children}: ModalProps) {
  const { currentItemName, hasDarkBG } = useModal();
  const items: {[key: string]: JSX.Element} = React.useMemo(() => {
    if(!Array.isArray(children)) {
      return ({
        [children.props.name]: children
      })
    }
    
    return Object.fromEntries(children.map(child => {
      let name: string = child.type.name === "Item" && child.props.name !== "" && child.props.name
      ? child.props.name
      : null;
      name = child.props.type === "snack-bar" ? "snack-bar" : name;
      return [name, child]
    }))
  }, [children]);

  console.log("ITEM NAME: ", currentItemName);

  return (
    <div className={`modal pos-fixed ${hasDarkBG ? "dark-bg" : ""} ${currentItemName === "" ? "hide" : "show"}`}>
      {items[currentItemName]}
    </div>
  )
}

Modal.Item = Item;