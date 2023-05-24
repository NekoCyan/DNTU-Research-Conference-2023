import React from 'react'
import { Link } from 'react-router-dom'

import {
  modal
} from 'src/class/modal'

import {
  removePersistentCookie,
  TOKEN_NAME
} from 'src/utils/cookie'

import { useAuth } from 'src/hooks/useAuth'
import { useItineraries } from 'src/hooks/useItineraries'
import { useUser } from 'src/hooks/useUser'

import ItineraryCard from '../itinerary-card/ItineraryCard'

import './LeftSideInformationStyles.css'

function LeftSideInformation() {
  const { user } = useUser();
  const { updateLoginStatus } = useAuth();
  const {
    itineraries,
    fetchItineraryList
  } = useItineraries();

  const { close } = modal.getItemActions("leftSideInformation")!;

  const handleLogout = () => {
    modal
    .show("messageDialog", {message: "Bạn có chắc là muốn đăng xuất không?"})
    .then(data => {
      if(data?.result) {
        close().then(() => {
          removePersistentCookie(TOKEN_NAME);
          updateLoginStatus(false);
        });
      }
    })
  }

  React.useEffect(() => {
    if(!itineraries) {
      fetchItineraryList();
    }
  }, []);

  return (
    <div className='left-side-information ps-xxl py-xxl'>
      <div>
        <div className='flex jc-flex-end pe-4'>
          <button
            className='btn rounded-8 btn-lbl-onBackground btn-transparent-bg btn-non-border'
            onClick={() => close(false, "Hello from LeftSideInformation")}
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
              !itineraries
              ? (
                <p className='fs-3 flex ait-center ps-3'>
                  <i className="twa twa-prohibited"></i>
                  <span className='ms-2'>Bạn chưa có lịch trình.</span>
                </p>
              )
              : (
                itineraries.map(itinerary => <ItineraryCard key={itinerary.travelId} data={itinerary} />)
              )
            }
          </div>
        </div>
      </div>
      
      <div className='me-xxl'>
        {
          user && <p>Xin chào <span className='fw-bold txt-clr-primary'>{user.fullname}</span></p>
        }
        {/* <p className='mt-1'>
          Bạn muốn biết thêm thông tin về chúng tôi? Xem
          <Link to={"/about"} onClick={() => close()}>
            <span
              className='btn-text fw-bold'
            >
              &nbsp;tại đây&nbsp;
            </span>
          </Link>
        </p> */}
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

export default LeftSideInformation