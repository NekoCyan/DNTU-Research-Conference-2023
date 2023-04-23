import React from 'react'

import { useModal } from 'src/contexts/ModalContext'

import './LeftSideInformationStyles.css'

export default function LeftSideInformation() {
  const { hide } = useModal();

  return (
    <div className='left-side-information ps-oversize-xxl py-oversize-xxl'>
      <div className='flex jc-flex-end pe-4'>
        <button
          className='btn rounded-8 btn-lbl-onBackground'
          onClick={hide}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Plan */}
      <div>
        <p className='fs-3 fw-bold flex ait-center'>
          <i className="twa twa-spiral-notepad"></i>
          <span className='ms-2'>Lịch trình của bạn</span>
        </p>
      </div>
    </div>
  )
}
