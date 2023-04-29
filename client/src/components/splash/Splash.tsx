import React from 'react'

import { useSplash } from 'src/hooks/useSplash'

import './SplashStyles.css'

export default function Splash() {
  const { isSplashVisible } = useSplash();
  console.log("RENDER: Splash. ", isSplashVisible);
  if(!isSplashVisible) return null;

  return (
    <div className='splash'>
      <p className='fw-bold fs-2'>DNTU</p>
      <p className='fw-bold fs-2 txt-clr-primary'>Travel Itinerary</p>
    </div>
  )
}
