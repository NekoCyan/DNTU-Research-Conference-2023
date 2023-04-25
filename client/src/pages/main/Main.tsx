import React from 'react'

import { ModalProvider } from 'src/contexts/ModalContext'

import FormPrompt from 'src/components/form-prompt/FormPrompt'
import Schedule from 'src/components/schedule/Schedule'

export default function Main() {
  return (
    <div className='flex container jc-space-between'>
      {/* Schedule result will show here */}
      <Schedule />

      {/* User will enter questions in form here */}
      <FormPrompt />
    </div>
  )
}
