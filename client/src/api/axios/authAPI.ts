import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

const apiBaseName = 'auth';

export function configureLoginAsyncFunc(_instance: AxiosInstance) {
  return async function(username: string, password: string) {
    try {
      let url = apiBaseName + '/login';
      let body = {
        username,
        password
      }
      return await _instance.post(url, body);
    } catch (error: any) {
      // Phuong: Annmounce this error by toasting
      toast.error('Error when login: ' + error)
      return Promise.reject(false)
    }
  }
}

export function configureRegisterAsyncFunc(_instance: AxiosInstance) {
  return async function(email: string, fullname: string, username: string, password: string) {
    try {
      let url = apiBaseName + '/register';
      let body = {
        email,
        fullname,
        username,
        password
      }
      return await _instance.post(url, body);
    } catch (error: any) {
      // Phuong: Annmounce this error by toasting
      toast.error('Error when register: ' + error)
      return Promise.reject(false)
    }
  }
}