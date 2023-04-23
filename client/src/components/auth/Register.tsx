import React from 'react'
import { Link } from 'react-router-dom'

import {
  registerAsyncFunc
} from 'src/api'

import Input from '../input/Input'

import './AuthStyles.css'

export default function Register() {
  const registerInputRefs = React.useRef<{[key: string]: HTMLInputElement | null}>({
    email: null,
    fullname: null,
    username: null,
    password: null
  })

  const onRegisterSubmit = async () => {
    try {
      let email = registerInputRefs.current.email?.value;
      let fullname = registerInputRefs.current.fullname?.value;
      let username = registerInputRefs.current.username?.value;
      let password = registerInputRefs.current.password?.value;

      let registerResponse = await registerAsyncFunc(email!, fullname!, username!, password!);
      console.log(registerResponse);
    } catch (error: any) {
      console.log(error.data.message)
    }
  }

  return (
    <div className='auth'>
      {/* Login introduction */}
      <div className='auth-sub-container flex flex-col mb-2'>
        <p className='introduction-text fs-1'>Đăng ký tài khoản</p>
        <p className='fs-1 txt-clr-primary fw-bold'>DNTU Travel Scheduler</p>
      </div>

      {/* Login form */}
      <div className='auth-sub-container mb-1'>
        <Input
          ref={input => registerInputRefs.current.email = input}
          labelInputClassName='mb-1'
          placeholder='E-mail'
          type='email'
        />
        <Input
          ref={input => registerInputRefs.current.fullname = input}
          labelInputClassName='mb-1'
          placeholder='Tên đầy đủ'
        />
        <Input
          ref={input => registerInputRefs.current.username = input}
          labelInputClassName='mb-1'
          placeholder='Tên đăng nhập'
        />
        <Input
          ref={input => registerInputRefs.current.password = input}
          labelInputClassName='mb-4'
          type='password'
          placeholder='Mật khẩu'
        />
        <button
          className='btn btn-primary rounded-8 btn-full-width'
          onClick={onRegisterSubmit}
        >Đăng ký</button>
      </div>

      {/* Navigato register */}
      <div className='auth-sub-container flex jc-space-between'>
        <p>Bạn đã có tài khoản?</p>
        <Link to='/'>đăng nhập</Link>
      </div>
    </div>
  )
}
