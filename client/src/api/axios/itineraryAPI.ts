import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { readCookie, TOKEN_NAME } from 'src/utils/cookie';

import {
  ItineraryDataProps,
  PromptDataProps,
  ResponseDataProps
} from 'src/types'

const apiBaseName = 'travel';

export function configureGenerateItineraryAsyncFunc<T>(_instance: AxiosInstance) {
  return async function(data: PromptDataProps): Promise<AxiosResponse<ResponseDataProps<T>>> {
    try {
      let token = readCookie(TOKEN_NAME);
      let options: AxiosRequestConfig = {
        headers: {
          "Authorization": token
        }
      }
      let url = apiBaseName + '/generate';
      console.log("REQUEST DATA: ", data);
      return await _instance.post(url, data, options);
    } catch (error: any) {
      return Promise.reject(false)
    }
  }
}

export function configureGetItineraryListAsyncFunc<T>(_instance: AxiosInstance) {
  return async function(data: {limit: number, skip: number}): Promise<AxiosResponse<ResponseDataProps<T>>> {
    try {
      let token = readCookie(TOKEN_NAME);
      let options: AxiosRequestConfig = {
        headers: {
          "Authorization": token
        }
      }
      let url = apiBaseName + '/list';
      console.log("REQUEST DATA: ", data);
      return await _instance.post(url, data, options);
    } catch (error: any) {
      return Promise.reject(false)
    }
  }
}

export function configureGetItineraryDetailsAsyncFunc<T>(_instance: AxiosInstance) {
  return async function(data: string): Promise<AxiosResponse<ResponseDataProps<T>>> {
    try {
      let token = readCookie(TOKEN_NAME);
      let options: AxiosRequestConfig = {
        headers: {
          "Authorization": token
        }
      }
      let url = apiBaseName + '/details';
      console.log("REQUEST DATA: ", data);
      return await _instance.post(url, {travelId: data}, options);
    } catch (error: any) {
      return Promise.reject(false)
    }
  }
}

export function configureDeleteItineraryAsyncFunc<T>(_instance: AxiosInstance) {
  return async function(data: string): Promise<AxiosResponse<ResponseDataProps<T>>> {
    try {
      let token = readCookie(TOKEN_NAME);
      let options: AxiosRequestConfig = {
        headers: {
          "Authorization": token
        }
      }
      let url = apiBaseName + '/delete';
      console.log("REQUEST DATA: ", data);
      return await _instance.post(url, {travelId: data}, options);
    } catch (error: any) {
      return Promise.reject(false)
    }
  }
}

export function configureSaveItineraryAsyncFunc<T>(_instance: AxiosInstance) {
  return async function(data: ItineraryDataProps): Promise<AxiosResponse<ResponseDataProps<T>>> {
    try {
      let token = readCookie(TOKEN_NAME);
      let options: AxiosRequestConfig = {
        headers: {
          "Authorization": token
        }
      }
      let url = apiBaseName + '/save';
      console.log("REQUEST DATA: ", data);
      return await _instance.post(url, data, options);
    } catch (error: any) {
      return Promise.reject(false)
    }
  }
}