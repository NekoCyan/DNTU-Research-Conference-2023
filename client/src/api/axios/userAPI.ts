import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

import { readCookie, TOKEN_NAME } from 'src/utils/cookie';

const apiBaseName = 'user';

export function configureGetMyInfoAsyncFunc(_instance: AxiosInstance) {
  return async function() {
    try {
      let token = readCookie(TOKEN_NAME);
      let options: AxiosRequestConfig = {
        headers: {
          "Authorization": token
        }
      }
      let url = apiBaseName + '/me';
      return await _instance.get(url, options);
    } catch (error: any) {
      // Phuong: Annmounce this error by toasting
      toast.error('Error cookie: ' + error)
      return Promise.reject(false)
    }
  }
}