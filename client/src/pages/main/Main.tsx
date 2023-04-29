import React from 'react'

import { ModalProvider } from 'src/contexts/ModalContext'

import FormPrompt from 'src/components/form-prompt/FormPrompt'
import Itinerary from 'src/components/itinerary/Itinerary'

export default function Main() {
  return (
    <div className='flex container jc-space-between'>
      {/* Itinerary result will show here */}
      <Itinerary />

      {/* User will enter questions in form here */}
      <FormPrompt />
    </div>
  )
}
