import React from 'react'
import { Route, Routes } from 'react-router-dom';


import {
  getErrorResponse
} from 'src/utils/axios'

import { useUser } from 'src/hooks/useUser';
import { useSplash } from 'src/hooks/useSplash';
import { useAuth } from 'src/hooks/useAuth';
import { useModal } from 'src/hooks/useModal'; 

import {
  getMyInfoAsync
} from 'src/api'

import Main from '../main/Main';
import Auth from 'src/pages/auth/Auth';
import About from '../about/About';
import Login from 'src/pages/auth/Login';
import Register from 'src/pages/auth/Register';

import { ResponseDataProps } from 'src/types';

export default function Root() {
  const { user, updateUser, clearUser } = useUser();
  const { isLogin, updateLoginStatus } = useAuth();
  const { hideSplash } = useSplash();

  React.useEffect(() => {
    async function auth() {
      try {
        console.log("AUTH USER");
        let authRes = await getMyInfoAsync();
        let resData: ResponseDataProps<any> = authRes?.data;
        if(resData.isError) throw new Error(resData.message);
        console.log("AUTH: ", resData);
        updateUser(resData.data);
        if(!isLogin) updateLoginStatus(true);
      } catch (error) {
        console.error(getErrorResponse(error))
      } finally {
        hideSplash();
      }
    }
    console.log("IS LOGIN: ", isLogin);
    console.log("USER: ", user);
    if(!user) auth();
    if(user && !isLogin) { console.log("LOGOUT"); clearUser(); }
  }, [isLogin]);

  console.log("RENDER: Root");

  return (
    <Routes>
      {
        user
        ? (
          <>
            <Route path='/' element={<Main />} />
          </>
        )
        : (
          <>
            <Route path='/' element={<Auth />} />
            <Route path='/register' element={<Auth />} />
          </>
        )
      }
      <Route path='/about' element={<About />} />
    </Routes>
  )
}
