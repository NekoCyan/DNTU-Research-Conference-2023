import React from 'react'

import { ModalContext } from 'src/contexts/ModalContext';

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
  return (
    <div className={`modal-item ${type}`}>
      {component()}
    </div>
  )
}

export default function Modal({children}: ModalProps) {
  const context = React.useContext(ModalContext);
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
      return [name, child]
    }))
  }, [children]);

  return (
    <div className={`modal pos-fixed ${context.data.currentItemName === "" ? "hide" : "show"}`}>
      {items[context.data.currentItemName]}
    </div>
  )
}

Modal.Item = Item;