import React from 'react'

import Dialog from './Dialog';

import {
  DialogPart,
  DialogPartProps
} from 'src/types'

type Message = {message: string};

const Body: DialogPart = function({data}: DialogPartProps<Message>) {
  return (
    <div>
      <p>{data?.message}</p>
    </div>
  )
};

const Footer: DialogPart = function({close}) {
  return (
    <div className='flex jc-flex-end ait-center mt-2'>
      <button
        onClick={() => {
          close(true)
        }}
        type='submit'
        className="btn btn-primary rounded-8 me-2"
      >
        Ok
      </button>
      <button
        onClick={() => {
          close(false)
        }}
        className="btn btn-20percent-background rounded-8"
      >
        Đóng
      </button>
    </div>
  )
};

export default function MessageDialog() {
  let dialogName = "messageDialog";

  return (
    <Dialog
      title='Thông báo'
      name={dialogName}
      body={Body}
      footer={Footer}
    />
  )
}