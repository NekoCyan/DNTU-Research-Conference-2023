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
  const { user, setNewUser, clearUser } = useUser();
  const { isLogin, updateLoginStatus } = useAuth();
  const { hideSplash, showSplash } = useSplash();
  const { hide } = useModal();

  React.useEffect(() => {
    console.log("IS LOGIN: ", isLogin);
    console.log("USE EFFECT IN ROOL IS CALLED");
    async function auth() {
      try {
        showSplash();
        let authRes = await getMyInfoAsync();
        let resData: ResponseData = authRes?.data;
        if(resData.isError) throw new Error(resData.message);
        console.log("AUTH: ", resData);
        setNewUser(resData.data);
        if(!isLogin) updateLoginStatus(true);
      } catch (error) {
        console.error(getErrorResponse(error))
      } finally {
        hideSplash();
      }
    }
    if(!user) auth();
    if(user && !isLogin) { clearUser(); hide(); }
  }, [isLogin]);

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
