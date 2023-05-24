import React from "react";

import {
  loginAsync,
  registerAsync,
  getMyInfoAsync
} from 'src/api'

import { useSelector, useDispatch } from 'react-redux'
import { selectIsLoginState, updateIsLoginState } from "src/redux/manifold/ManifoldSlice";

export function useAuth() {
  const isLogin = useSelector(selectIsLoginState)
  const dispatch = useDispatch()
  
  /**
   * Hàm này dùng để update trạng thái đăng nhập.
   * @param isLogin 
   * @returns 
   */
  const updateLoginStatus = (isLogin: boolean) => {
    console.log("updateLoginStatus IS CALLED WITH VALUE: ", isLogin);
    dispatch(updateIsLoginState(isLogin))
  }
  /**
   * Hàm này dùng để đăng nhập.
   */
  const login = loginAsync;
  /**
   * Hàm này dùng để đăng ký.
   */
  const register = registerAsync;
  /**
   * Hàm này dùng để lấy dữ liệu người dùng.
   */
  const getInfo = getMyInfoAsync;

  return {
    isLogin,
    updateLoginStatus,
    login,
    register,
    getInfo
  }
}