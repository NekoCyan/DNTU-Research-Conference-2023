import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'

import {
  writePersistentCookie,
  TOKEN_NAME
} from 'src/utils/cookie'
import {
  getErrorResponse,
  getResponseData
} from 'src/utils/axios'
import {
  LOGIN_FORM,
  USERNAME_INPUT_NAME,
  PASSWORD_INPUT_NAME,
  renderForm,
  handleInputChangeWithCondition
} from 'src/utils/form'

import { useModal } from 'src/hooks/useModal'
import { useSnackBar } from 'src/hooks/useSnackBar'
import { useSplash } from 'src/hooks/useSplash'
import { useAuth } from 'src/hooks/useAuth'

import Input from '../../components/input/Input'

import './AuthStyles.css'

import { ResponseDataProps } from 'src/types'

export default function Login() {
  const { login, updateLoginStatus } = useAuth();

  console.log("RENDER: Login");

  const loginForm = React.useMemo(() => LOGIN_FORM, []);
  const loginFormKeys = React.useMemo(() => Object.keys(loginForm), [loginForm]);

  const [loginStatus, setLoginStatus] = React.useState<{[key: string]: undefined | string | boolean}>({
    hasAnyError: true,
    [USERNAME_INPUT_NAME]: undefined,
    [PASSWORD_INPUT_NAME]: undefined
  });

  const onLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if(loginStatus.hasAnyError) return;
      let form = e.target as HTMLFormElement;
      let username = form[USERNAME_INPUT_NAME].value;
      let password = form[PASSWORD_INPUT_NAME].value;

      let registerResponse = await login(username!, password!);
      let resData = getResponseData<{token: string}>(registerResponse)
      if(resData.isError) throw new Error(resData.message);
      toast.success(`Đăng nhập: Bạn đã đăng nhập thành công!`);
      updateLoginStatus(true);
      let token = resData.data.token;
      writePersistentCookie(TOKEN_NAME, token, 1);
    } catch (error: any) {
      console.error(getErrorResponse(error));
      toast.error(`Login: ${getErrorResponse(error)}`);
    }
  }

  const form = React.useMemo(() => {
    return renderForm(
      loginForm,
      input => (
        <div className='mb-1' key={input.name}>
          <Input
            {...input.props}
            labelInputClassName={input.labelInputClassName}
            type={input.type}
            name={input.name}
            onInput={
              input.validate ? (e: React.ChangeEvent<HTMLInputElement>) => handleInputChangeWithCondition(e)(
                input.validate!.pattern!.test(e.target.value),
                text => {
                  setLoginStatus(prevState => ({...prevState, hasAnyError: false }))
                  setLoginStatus(prevState => ({...prevState, [input.name]: undefined }))
                },
                text => {
                  setLoginStatus(prevState => ({...prevState, hasAnyError: true }))
                  setLoginStatus(prevState => ({...prevState, [input.name]: input.validate!.errorMessage }))
                }
              )
              : undefined
            }
          />
          {loginStatus[input.name] && <span className='fs-5 txt-clr-error mt-1'>{input.validate!.errorMessage}</span>}
        </div>
      ),
      undefined,
      undefined,
      undefined,
      undefined,
      loginFormKeys
    )
  }, [
    loginStatus[USERNAME_INPUT_NAME],
    loginStatus[PASSWORD_INPUT_NAME]
  ]);

  return (
    <div className="auth__form form__sign-in">
      <div className='panel-form'>
        <h2 className="auth__form__title">Đăng nhập</h2>
          {/* Login form */}
          <form id="login-form" onSubmit={onLoginSubmit} className='auth-sub-container mb-1'>
            {form}
            <button
              className='btn btn-primary rounded-8 btn-full-width mt-4'
              type='submit'
            >Đăng nhập</button>
        </form>
      </div>
    </div>
    // <div className='auth'>
    //   {/* Login introduction */}
    //   <div className='auth-sub-container flex flex-col mb-2'>
    //     <p className='introduction-text fs-1'>Chào mừng đến với</p>
    //     <p className='fs-1 txt-clr-primary fw-bold'>DNTU Travel Itinerary</p>
    //   </div>

    //   {/* Login form */}
    //   <form id="login-form" onSubmit={onLoginSubmit} className='auth-sub-container mb-1'>
    //     {form}
    //     <button
    //       className='btn btn-primary rounded-8 btn-full-width mt-4'
    //       type='submit'
    //     >Đăng nhập</button>
    //   </form>

    //   {/* Navigato register */}
    //   <div className='auth-sub-container flex jc-space-between'>
    //     <p>Bạn chưa có tài khoản?</p>
    //     <Link to='/register'>đăng ký</Link>
    //   </div>
    // </div>
  )
}