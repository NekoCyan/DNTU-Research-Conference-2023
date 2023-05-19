import React, { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import {
  EMAIL_INPUT_NAME,
  FULLNAME_INPUT_NAME,
  USERNAME_INPUT_NAME,
  PASSWORD_INPUT_NAME,
  REGISTER_FORM,
  handleInputChangeWithCondition,
  renderForm
} from 'src/utils/form'
import {
  getErrorResponse,
  getResponseData
} from 'src/utils/axios'

import { useAuth } from 'src/hooks/useAuth'
import { useSnackBar } from 'src/hooks/useSnackBar'

import Input from '../input/Input'

import './AuthStyles.css'

import {
  ResponseDataProps
} from 'src/types'

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { pushSnackBar } = useSnackBar();

  const registerForm = React.useMemo(() => REGISTER_FORM, []);
  const registerFormKeys = React.useMemo(() => Object.keys(REGISTER_FORM), []);

  const [registerStatus, setRegisterStatus] = React.useState<{[key: string]: undefined | string | boolean}>({
    hasAnyError: true,
    [EMAIL_INPUT_NAME]: undefined,
    [FULLNAME_INPUT_NAME]: undefined,
    [USERNAME_INPUT_NAME]: undefined,
    [PASSWORD_INPUT_NAME]: undefined
  });

  const onRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if(registerStatus.hasAnyError) return;
      let form = e.target as HTMLFormElement;
      let email = form[EMAIL_INPUT_NAME].value;
      let fullname = form[FULLNAME_INPUT_NAME].value;
      let username = form[USERNAME_INPUT_NAME].value;
      let password = form[PASSWORD_INPUT_NAME].value;

      let registerResponse = await register(email!, fullname!, username!, password!);
      let resData = getResponseData<any>(registerResponse);
      if(resData.isError) throw new Error(resData.message);
      navigate("/");
    } catch (error: any) {
      console.log(getErrorResponse(error));
      toast.error(`Register: ${getErrorResponse(error)}`);
    }
  }

  const form = React.useMemo(() => {
    return renderForm(
      registerForm,
      input => (
        <div className='mb-1' key={input.name}>
          <Input
            {...input.props}
            labelInputClassName={input.labelInputClassName ? input.labelInputClassName : ""}
            type={input.type}
            name={input.name}
            onInput={
              input.validate ? (e: React.ChangeEvent<HTMLInputElement>) => handleInputChangeWithCondition(e)(
                input.validate!.pattern!.test(e.target.value),
                text => {
                  setRegisterStatus(prevState => ({...prevState, hasAnyError: false }))
                  setRegisterStatus(prevState => ({...prevState, [input.name]: undefined }))
                },
                text => {
                  setRegisterStatus(prevState => ({...prevState, hasAnyError: true }))
                  setRegisterStatus(prevState => ({...prevState, [input.name]: input.validate!.errorMessage }))
                }
              )
              : undefined
            }
          />
          {registerStatus[input.name] && <span className='fs-5 txt-clr-error mt-1'>{input.validate!.errorMessage}</span>}
        </div>
      ),
      undefined,
      undefined,
      undefined,
      undefined,
      registerFormKeys
    )
  }, [
    registerStatus[EMAIL_INPUT_NAME],
    registerStatus[FULLNAME_INPUT_NAME],
    registerStatus[USERNAME_INPUT_NAME],
    registerStatus[PASSWORD_INPUT_NAME]
  ]);

  return (
    <div className='auth'>
      {/* Login introduction */}
      <div className='auth-sub-container flex flex-col mb-2'>
        <p className='introduction-text fs-1'>Đăng ký tài khoản</p>
        <p className='fs-1 txt-clr-primary fw-bold'>DNTU Travel Itinerary</p>
      </div>

      {/* Register form */}
      <form id="register-form" onSubmit={onRegisterSubmit} className='auth-sub-container mb-1'>
        {form}
        <button
          className='btn btn-primary rounded-8 btn-full-width mt-4'
          type="submit"
        >Đăng ký</button>
      </form>

      {/* Navigato register */}
      <div className='auth-sub-container flex jc-space-between'>
        <p>Bạn đã có tài khoản?</p>
        <Link to='/'>đăng nhập</Link>
      </div>
    </div>
  )
}
