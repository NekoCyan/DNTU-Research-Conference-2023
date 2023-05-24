import React from 'react';

import Root from 'src/pages/root/Root';
import Splash from './components/splash/Splash';
import Modal from 'src/components/modal/Modal'
import LeftSideInformation from 'src/components/left-side-information/LeftSideInformation'
import SaveItineraryDialog from './components/dialog/SaveItineraryDialog';
import MessageDialog from './components/dialog/MessageDialog';
import AskforlocationDialog from './components/dialog/AskforlocationDialog';

function App() {
  return (
    <>
      <Root />
      {/* The core child of ModalProvider */}
      <Modal
        items={{
          'leftSideInformation': {
            component: LeftSideInformation,
            type: 'left-side',
            options: {
              hasDarkBG: true
            }
          },
          'saveItineraryDialog': {
            component: SaveItineraryDialog,
            type: 'dialog',
            options: {
              hasDarkBG: true
            }
          },
          'messageDialog': {
            component: MessageDialog,
            type: 'dialog',
            options: {
              hasDarkBG: true
            }
          },
          'askforlocationDialog': {
            component: AskforlocationDialog,
            type: 'dialog',
            options: {
              hasDarkBG: true
            }
          }
        }}
      />
      <Splash />
    </>
  );
}

export default App;
