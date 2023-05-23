import { AxiosError, AxiosResponse } from "axios";

import { getMyInfoAsync } from "src/api";

import {
  ResponseDataProps,
  ResquestBodyDataProps
} from "src/types";

/**
 * Hàm này dùng để lấy lỗi ở trong object error (có thể là từ reponse hoặc lỗi throw từ hệ thống)
 * @param error 
 */
export function getErrorResponse(error: AxiosError | any) {
  return error instanceof AxiosError ? error.response!.data : error.message;
}

export function getResponseData<T>(res: AxiosResponse): ResponseDataProps<T> {
  return res.data;
}