import React from 'react'

import { modal } from 'src/class/modal'

import './DialogStyles.css'

import {
  DialogProps
} from 'src/types'

export default function Dialog({
  name,
  header,
  body,
  footer,
  title
}: DialogProps) {
  const { close } = React.useMemo(() => modal.getItemActions(name)!, [name]);
  const data = React.useMemo(() => modal.getTransferredData(name), [name]);

  if(!name) {
    console.error("Dialog must have name!");
    return null;
  }
  
  let props = {close, data};

  return (
    <div className="dialog rounded-8 p-4">
      {/* Header của dialog */}
      <div className="dialog-header">
        {
          header
          ? header(props)
          : <p className="fs-3 fw-bold">{title}</p>
        }
      </div>

      {/* Body của dialog (Có thể custom được) */}
      <div className="dialog-body">
        {
          body && body(props)
        }
      </div>

      <div className="dialog-footer">
        {
          footer && footer(props)
        }
      </div>
    </div>
  )
}