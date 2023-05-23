import React from 'react'

import './Auth.scss'
import authSignUpBg from '../../resources/images/auth-sign-up-bg.webp'
import authSignInBg from '../../resources/images/auth-sign-in-bg.png'
import Login from './Login'
import Register from './Register'

import { useLocation, Link, Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
// import { selectIsAuthenticated } from 'redux/user/userSlice'



function Auth() {
  const location = useLocation()

  const segisterMode = location.pathname === '/register'

  // const isAuthenticated = useSelector(selectIsAuthenticated)

  // if(isAuthenticated) {
  //   return <Navigate to='/' />
  // }
  return (
    <div className={`auth__container ${segisterMode ? 'sign-up-mode' : ''}`}>
      <div className="auth__container__forms">
        <div className="auth__form-area">
          <Login/>
          <Register/>
        </div>
      </div>
      <div className="auth__container__panels">
        <div className="panel panel__left">
          <div className="panel__content">
            <h3 className="panel__title">Bạn chưa có tài khoản?</h3>
            <p className="panel__paragraph">
              Hãy đăng ký để tạo lịch trình du lịch 
            </p>
            <Link to="/register">
              <button className="auth__btn auth__btn-transparent" id="sign-up-btn">
                Register
              </button>
            </Link>
          </div>
          {/* <img className="panel__image" src={authSignUpBg} alt="" /> */}
        </div>
        <div className="panel panel__right">
          <div className="panel__content">
            <h3 className="panel__title">Bạn đã có tài khoản?</h3>
            <p className="panel__paragraph">
              Hãy đăng nhập để trải nghiệm sản phẩm của chúng tôi
            </p>
            <Link to="/">
              <button className="auth__btn auth__btn-transparent" id="sign-in-btn">
                Login
              </button>
            </Link>
          </div>
          {/* <img className="panel__image" src={authSignInBg} alt="" /> */}
        </div>
      </div>
    </div>
  )
}

export default Auth
