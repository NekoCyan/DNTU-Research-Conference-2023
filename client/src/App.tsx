import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { AppProvider } from 'src/contexts/AppContext';

import Root from 'src/pages/root/Root';

function App() {
  return (
    <BrowserRouter>
        <AppProvider>
          <Root />
        </AppProvider>
    </BrowserRouter>
  );
}

export default App;
