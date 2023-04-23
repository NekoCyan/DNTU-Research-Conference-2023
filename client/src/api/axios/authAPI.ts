import axios, { AxiosInstance } from 'axios';

const authAPIBase = 'auth';

export function configureLoginAsyncFunc(_instace: AxiosInstance) {
  return async function(username: string, password: string) {
    try {
      let url = authAPIBase + '/login';
      let body = {
        username,
        password
      }
      return await _instace.post(url, body);
    } catch (error: any) {
      // Handle lỗi tại đây
    }
  }
}

export function configureRegisterAsyncFunc(_instace: AxiosInstance) {
  return async function(email: string, fullname: string, username: string, password: string) {
    try {
      let url = authAPIBase + '/register';
      let body = {
        email,
        fullname,
        username,
        password
      }
      return await _instace.post(url, body);
    } catch (error: any) {
      // Handle lỗi tại đây
    }
  }
}