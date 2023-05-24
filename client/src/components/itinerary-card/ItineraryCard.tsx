import React, { MouseEvent } from 'react'

import {
  useItineraryDetailsActions
} from 'src/hooks/useItineraries'

import './ItineraryCardStyles.css'

import {
  ItineraryDataProps
} from 'src/types'

export default function ItineraryCard({
  data
}: {data: ItineraryDataProps}) {
  const {
    fetchItineraryDetails,
    updateItineraryGeneratingStatus,
    updateItineraryDetails,
    deleteItinerary
  } = useItineraryDetailsActions();

  const handleShowDetailsClick = (e: MouseEvent<HTMLButtonElement>) => {
    updateItineraryGeneratingStatus({isGenerated: false});
    updateItineraryDetails(data);
    fetchItineraryDetails(data.travelId!);
  }

  const handleDeleteItineraryClick = (e: MouseEvent<HTMLButtonElement>) => {
    deleteItinerary(data.travelId!);
  }

  return (
    <div className='itinerary-card'>
      <div className='itinerary-card-color-bar me-1' style={{backgroundColor: data.color}}></div>
      <div className='itinerary-name-container flex ait-center'>
        <i className='twa twa-round-pushpin'></i><p className='itinerary-name ms-1'>{data.itineraryName}</p>
      </div>
      <div className='itinerary-card-controls'>
        <button
          className='btn rounded-8 btn-transparent btn-non-border'
          onClick={handleShowDetailsClick}
        >
          <span className="material-symbols-outlined">done</span>
        </button>
        <button
          className='btn rounded-8 btn-transparent btn-non-border'
          onClick={handleDeleteItineraryClick}
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  )
}
