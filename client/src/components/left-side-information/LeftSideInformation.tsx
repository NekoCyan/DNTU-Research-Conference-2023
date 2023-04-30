import React from 'react'

import {
  removePersistentCookie,
  TOKEN_NAME
} from 'src/utils/cookie'

import { useAuth } from 'src/hooks/useAuth'
import { useModal } from 'src/hooks/useModal'
import { useItineraries } from 'src/hooks/useItineraries'
import { useUser } from 'src/hooks/useUser'

import './LeftSideInformationStyles.css'

export default function LeftSideInformation() {
  const { hide } = useModal();
  const { user, clearUser } = useUser();
  const { updateLoginStatus, isLogin } = useAuth();
  const { itineraries } = useItineraries();

  const handleLogout = () => {
    removePersistentCookie(TOKEN_NAME);
    updateLoginStatus(false);
  }

  console.log("ISLOGIN IN INFO: ", isLogin);

  return (
    <div className='left-side-information ps-xxl py-xxl'>
      <div>
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
          <div className='ps-3 mt-2'>
            { 
              !itineraries && (
                <p className='fs-3 flex ait-center ps-3'>
                  <i className="twa twa-prohibited"></i>
                  <span className='ms-2'>Bạn chưa có lịch trình.</span>
                </p>
              )
            }
          </div>
        </div>
      </div>
      
      <div>
        {
          user && <p>Xin chào <span className='fw-bold txt-clr-primary'>{user.fullname}</span></p>
        }
        <button
            className='btn btn-error rounded-8 mt-1'
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
      </div>
    </div>
  )
}