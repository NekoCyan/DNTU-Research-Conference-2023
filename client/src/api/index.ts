import {
  configureLoginAsyncFunc,
  configureRegisterAsyncFunc
} from './axios/authAPI'

import { axiosIntance } from './axios/instance';

export const loginAsyncFunc = configureLoginAsyncFunc(axiosIntance);
export const registerAsyncFunc = configureRegisterAsyncFunc(axiosIntance);