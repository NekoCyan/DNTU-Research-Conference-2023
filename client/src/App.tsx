import React from 'react';

import { ModalProvider } from './contexts/ModalContext';

import Root from 'src/pages/root/Root';
import Splash from './components/splash/Splash';
import Modal from 'src/components/modal/Modal'
import LeftSideInformation from 'src/components/left-side-information/LeftSideInformation'
import SaveItineraryDialog from './components/dialog/SaveItineraryDialog';
import MessageDialog from './components/dialog/MessageDialog';
import SnackBarsContainer from './components/snackbar/SnackBarsContainer';

function App() {
  return (
    <>
      <Root />
      <Splash />
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
          }
        }}
      />
        {/* <Modal.Item name='side' type='left-side' component={LeftSideInformation} />
        <Modal.Item name='snack-bar' type='snack-bar' component={SnackBarsContainer} />
      </Modal> */}
    </>
  );
}

export default App;
