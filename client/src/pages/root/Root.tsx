import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';

import { useUser } from 'src/contexts/AppContext';

import Main from '../main/Main';

import Login from 'src/components/auth/Login';
import Register from 'src/components/auth/Register';

export default function Root() {
  const { user } = useUser();
  return (
    <Routes>
      {
        user
        ? <Route path='/' Component={Main} />
        : (
          <>
            <Route path='/' Component={Login} />
            <Route path='/register' Component={Register} />
          </>
        )
      }
    </Routes>
  )
}
