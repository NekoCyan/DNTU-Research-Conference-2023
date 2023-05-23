import {
  configureLoginAsyncFunc,
  configureRegisterAsyncFunc
} from './axios/authAPI'

import {
  configureGetMyInfoAsyncFunc
} from './axios/userAPI'

import { axiosIntance } from './axios/instance';

export const loginAsyncFunc = configureLoginAsyncFunc(axiosIntance);
export const registerAsyncFunc = configureRegisterAsyncFunc(axiosIntance);

export const getMyInfoAsync = configureGetMyInfoAsyncFunc(axiosIntance);