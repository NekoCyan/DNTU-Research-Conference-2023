import React from 'react'

import { useModal } from 'src/contexts/ModalContext'

import './ScheduleStyles.css'

export default function Schedule() {
  const { show } = useModal();

  return (
    <div className='schedule p-xxl'>
      {/* Introduce */}
      <div>
        <p className='fs-xxl fw-bold flex ait-center'>
          <i className="twa twa-glowing-star"></i>Tạo lịch trình du lịch
        </p>
        <p className='fs-3 mb-xxl'>Bạn không biết đi đâu? Vậy thì tạo lịch trình thôi!</p>
        <p>Xin chào các bạn, mình sẽ hỗ trợ cho các bạn về việc lên kế hoạch đi du lịch, ngắn hạn hoặc dài hạn. Mình sẽ đưa cho các bạn các thông tin cần thiết để chuẩn bị tốt nhất cho chuyến đi.</p>
      </div>
      <div className='pos-fixed schedule-bot-btn-container p-xxl'>
        <button 
          className='btn btn-20percent-background rounded-8'
          onClick={e => show("side")}
        >
          Xem lịch trình đã lưu
        </button>
      </div>
    </div>
  )
}
