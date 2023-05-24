import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

import {
  modal
} from 'src/class/modal'

import {
  useItineraryDetailsState
} from 'src/hooks/useItineraries'

import './ItineraryStyles.css'

function Itinerary() {
  const {
    itineraryDetails,
    isGenerating,
    isGenerated
  } = useItineraryDetailsState();

  return (
    <div className='itinerary p-xxl'>
      {/* Introduce */}
      <div className='mb-xxl'>
        <p className='fs-xxl fw-bold flex ait-center'>
          Tạo lịch trình du lịch
        </p>
        <p className='fs-3 mb-4'>Bạn không biết đi đâu? Vậy thì tạo lịch trình thôi!</p>
        {
          isGenerating
          ? (
            <p className='flex ait-center'>Đang tạo, vui lòng đợi một xíu<span className="loader ms-3"></span></p>
          )
          : (
            (!isGenerated && Boolean(!itineraryDetails?.prompt)) && <p>Xin chào các bạn, mình sẽ hỗ trợ cho các bạn về việc lên kế hoạch đi du lịch, ngắn hạn hoặc dài hạn. Mình sẽ đưa cho các bạn các thông tin cần thiết để chuẩn bị tốt nhất cho chuyến đi.</p>
          )
        }
        {
          (!isGenerating && itineraryDetails && itineraryDetails.prompt)
          ? <div><ReactMarkdown className='react-markdown'>{itineraryDetails.prompt}</ReactMarkdown></div>
          : null
        }
      </div>
      <div className='pos-fixed itinerary-bot-btn-container p-xxl'>
        <button 
          className='btn btn-20percent-background rounded-8'
          // For modal example
          onClick={e => modal.show("leftSideInformation").then(data => {
            console.log("Result: ", data?.result);
            console.log("Message: ", data?.message);
            console.log("Data: ", data?.data);
          })}
        >
          Xem lịch trình đã lưu
        </button>
      </div>
    </div>
  )
}

export default React.memo(Itinerary)