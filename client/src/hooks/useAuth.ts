import React from "react";

import {
  loginAsyncFunc,
  registerAsyncFunc,
  getMyInfoAsync
} from 'src/api'

import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentManifold, updateCurrentManifold } from "src/redux/manifold/ManifoldSlice";

export function useAuth() {

  const manifold = useSelector(selectCurrentManifold)
  const dispatch = useDispatch()
  const { isLogin } = manifold;
  
  /**
   * Hàm này dùng để update trạng thái đăng nhập.
   * @param isLogin 
   * @returns 
   */
  const updateLoginStatus = (isLogin: boolean) => {
    console.log("updateLoginStatus IS CALLED WITH VALUE: ", isLogin);
    dispatch(updateCurrentManifold({
      ...manifold,
      isLogin: isLogin
    }))
  }
  /**
   * Hàm này dùng để đăng nhập.
   */
  const login = loginAsyncFunc;
  /**
   * Hàm này dùng để đăng ký.
   */
  const register = registerAsyncFunc;
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