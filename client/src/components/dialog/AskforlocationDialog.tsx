import Dialog from "./Dialog";

import { modal } from "src/class/modal";

import {
  setLocalStorageItem
} from 'src/utils/localstorage'

import {
  DialogPart,
  DialogPartProps
} from 'src/types'

const Body: DialogPart = function() {
  return (
    <div className='mt-2'>
      <p>Để cho chính xác hơn trong việc tạo lịch trình, thì bạn nên chia sẻ vị trí của mình với chúng tôi.</p>
      <br />
      <p>Khi ấn vào nút <strong>"Mở hộp thoại"</strong> sẽ có một hộp thoại hiện lên và bạn sẽ được hỏi về việc cấp quyền truy cập vào vị trí của bạn, hoặc nếu như bạn không muốn thì ấn <strong>"Từ chối"</strong>.</p>
    </div>
  )
};

const Footer: DialogPart = function({close}) {
  return (
    <div className='flex jc-flex-end ait-center mt-2'>
      <button
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log("Latitude: ", position.coords.latitude);
              console.log("Longitude: ", position.coords.longitude);
              close(true);
            },
            () => {
              console.log("Failed to get geolocation permission.");
              setLocalStorageItem("isGeolocationDeny", true);
              close(false);
            }
          );
        }}
        type='submit'
        className="btn btn-primary rounded-8 me-2"
      >
        Mở hộp thoại
      </button>
      <button
        onClick={() => {
          setLocalStorageItem("isGeolocationDeny", true);
          close(false);
        }}
        className="btn btn-error rounded-8"
      >
        Từ chối
      </button>
    </div>
  )
};

export default function AskforlocationDialog() {
  let dialogName = 'askforlocationDialog';

  return (
    <Dialog
      name={dialogName}
      title="Bạn có muốn chia sẻ với chúng tôi vị trí của bạn?"
      body={Body}
      footer={Footer}
    />
  )
}