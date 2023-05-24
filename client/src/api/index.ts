import {
  configureLoginAsyncFunc,
  configureRegisterAsyncFunc
} from './axios/authAPI'

import {
  configureGetMyInfoAsyncFunc
} from './axios/userAPI'

import {
  configureGenerateItineraryAsyncFunc,
  configureGetItineraryListAsyncFunc,
  configureGetItineraryDetailsAsyncFunc,
  configureDeleteItineraryAsyncFunc,
  configureSaveItineraryAsyncFunc
} from './axios/itineraryAPI'

import { axiosIntance } from './axios/instance';

import {
  ItineraryDataProps
} from 'src/types'

export const loginAsync = configureLoginAsyncFunc(axiosIntance);
export const registerAsync = configureRegisterAsyncFunc(axiosIntance);

export const getMyInfoAsync = configureGetMyInfoAsyncFunc(axiosIntance);

export const generateItineraryAsync = configureGenerateItineraryAsyncFunc<string>(axiosIntance);
export const getItineraryListAsync = configureGetItineraryListAsyncFunc<Array<ItineraryDataProps>>(axiosIntance);
export const getItineraryDetailsAsync = configureGetItineraryDetailsAsyncFunc<ItineraryDataProps>(axiosIntance);
export const deleteItineraryAsync = configureDeleteItineraryAsyncFunc<ItineraryDataProps>(axiosIntance);
export const saveItineraryAsync = configureSaveItineraryAsyncFunc<ItineraryDataProps>(axiosIntance);