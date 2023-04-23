import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { useUser } from 'src/contexts/AppContext'
import { ModalProvider } from 'src/contexts/ModalContext'

import FormPrompt from 'src/components/form-prompt/FormPrompt'
import Schedule from 'src/components/schedule/Schedule'
import Modal from 'src/components/modal/Modal'
import LeftSideInformation from 'src/components/left-side-information/LeftSideInformation'

export default function Main() {
  return (
    <div className='flex container jc-space-between'>
      {/* Modal Provider */}
      <ModalProvider>
        {/* Schedule result will show here */}
        <Schedule />

        {/* User will enter questions in form here */}
        <FormPrompt />

        {/* The core child of ModalProvider */}
        <Modal>
          <Modal.Item name='side' type='left-side' component={LeftSideInformation} />
        </Modal>
      </ModalProvider>
    </div>
  )
}
