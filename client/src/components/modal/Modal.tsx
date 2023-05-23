import React from 'react'

import {
  modal
} from '../../class/modal'

import { useModal } from 'src/hooks/useModal';

import LeftSideInformation from '../left-side-information/LeftSideInformation';

import {
  ModalProps,
  ModalItemProps,
  ModalItemType
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
    <div className={`modal-item modal-${type}`}>
      {component()}
    </div>
  )
}

export default function Modal({
  items
}: ModalProps) {
  // const { currentItemName, hasDarkBG } = useModal();
  // const items: {[key: string]: JSX.Element} = React.useMemo(() => {
    
  //   return Object.fromEntries(children.map(child => {
  //     let name: string = child.type.name === "Item" && child.props.name !== "" && child.props.name
  //     ? child.props.name
  //     : null;
  //     name = child.props.type === "snack-bar" ? "snack-bar" : name;
  //     return [name, child]
  //   }))
  // }, [children]);

  // console.log("ITEM NAME: ", currentItemName);

  const [shownItem, setShownItem] = React.useState<JSX.Element | null>(null);
  const [hasDarkBG, setHasDarkGB] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if(isLoaded) {
      if(items) {
        let keys = Object.keys(items);
        for(let key of keys) {
          modal.addItem(key, items[key].component, items[key].type, items[key].options);
        }
      }

      modal.subscribeModal((shownItem, name, type, options) => {
        if(!shownItem) setShownItem(null);
        else {
          setShownItem(<Item name={name} type={type} component={shownItem} />)
          if(options.hasDarkBG) setHasDarkGB(Boolean(options.hasDarkBG))
        }
      })
    }
  }, [isLoaded]);

  return (
    <div
      ref={divRef => {
        modal.init(divRef!);
        setIsLoaded(true);
      }}
      className={`modal pos-fixed${hasDarkBG ? " dark-bg" : ""}${shownItem ? " show" : ""}`}
    >
      {shownItem}
    </div>
  )
}

Modal.Item = Item;