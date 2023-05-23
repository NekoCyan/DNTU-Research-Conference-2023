import React from 'react'

import {
  modal
} from 'src/class/modal'

import './ItineraryStyles.css'

function Itinerary() {
  return (
    <div className='itinerary p-xxl'>
      {/* Introduce */}
      <div>
        <p className='fs-xxl fw-bold flex ait-center'>
          <i className="twa twa-glowing-star"></i>Tạo lịch trình du lịch
        </p>
        <p className='fs-3 mb-xxl'>Bạn không biết đi đâu? Vậy thì tạo lịch trình thôi!</p>
        <p>Xin chào các bạn, mình sẽ hỗ trợ cho các bạn về việc lên kế hoạch đi du lịch, ngắn hạn hoặc dài hạn. Mình sẽ đưa cho các bạn các thông tin cần thiết để chuẩn bị tốt nhất cho chuyến đi.</p>
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