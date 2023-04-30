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
import Login from 'src/components/auth/Login';
import Register from 'src/components/auth/Register';

import { ResponseData } from 'src/types';

export default function Root() {
  const { user, updateUser, clearUser } = useUser();
  const { isLogin, updateLoginStatus } = useAuth();
  const { hideSplash } = useSplash();
  const { hide } = useModal();

  React.useEffect(() => {
    async function auth() {
      try {
        console.log("AUTH USER");
        let authRes = await getMyInfoAsync();
        let resData: ResponseData = authRes?.data;
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
    if(user && !isLogin) { console.log("LOGOUT"); clearUser(); hide(); }
  }, [isLogin]);

  console.log("RENDER: Root");

  return (
    <Routes>
      {
        user
        ? <Route path='/' element={<Main />} />
        : (
          <>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </>
        )
      }
    </Routes>
  )
}
