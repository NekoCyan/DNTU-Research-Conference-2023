import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { AppProvider } from 'src/contexts/AppContext';
import { ModalProvider } from './contexts/ModalContext';

import Root from 'src/pages/root/Root';
import Splash from './components/splash/Splash';
import Modal from 'src/components/modal/Modal'
import LeftSideInformation from 'src/components/left-side-information/LeftSideInformation'
import SnackBarsContainer from './components/snackbar/SnackBarsContainer';

function App() {
  return (
    <BrowserRouter>
        <AppProvider>
          <ModalProvider>
            <Root />
            <Splash />

            {/* The core child of ModalProvider */}
            <Modal>
              <Modal.Item name='side' type='left-side' component={LeftSideInformation} />
              <Modal.Item name='snack-bar' type='snack-bar' component={SnackBarsContainer} />
            </Modal>
          </ModalProvider>
        </AppProvider>
    </BrowserRouter>
  );
}

export default App;
