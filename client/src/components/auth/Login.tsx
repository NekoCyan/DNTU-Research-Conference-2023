import React from 'react'
import { Link } from 'react-router-dom'

import {
  loginAsyncFunc
} from 'src/api'

import Input from '../input/Input'

import './AuthStyles.css'

export default function Login() {
  const loginInputRefs = React.useRef<{[key: string]: HTMLInputElement | null}>({
    username: null,
    password: null
  })

  const onLoginSubmit = async () => {
    try {
      let username = loginInputRefs.current.username?.value;
      let password = loginInputRefs.current.password?.value;

      let registerResponse = await loginAsyncFunc(username!, password!);
      console.log(registerResponse);
    } catch (error: any) {
      console.log(error.data.message)
    }
  }

  return (
    <div className='auth'>
      {/* Login introduction */}
      <div className='auth-sub-container flex flex-col mb-2'>
        <p className='introduction-text fs-1'>Chào mừng đến với</p>
        <p className='fs-1 txt-clr-primary fw-bold'>DNTU Travel Scheduler</p>
      </div>

      {/* Login form */}
      <div className='auth-sub-container mb-1'>
        <Input
          ref={input => loginInputRefs.current.username = input}
          labelInputClassName='mb-1'
          placeholder='Tên đăng nhập'
        />
        <Input
          ref={input => loginInputRefs.current.password = input}
          labelInputClassName='mb-4'
          type='password'
          placeholder='Mật khẩu'
        />
        <button
          className='btn btn-primary rounded-8 btn-full-width'
          onClick={onLoginSubmit}
        >Đăng nhập</button>
      </div>

      {/* Navigato register */}
      <div className='auth-sub-container flex jc-space-between'>
        <p>Bạn chưa có tài khoản?</p>
        <Link to='/register'>đăng ký</Link>
      </div>
    </div>
  )
}