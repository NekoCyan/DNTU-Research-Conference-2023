import { AxiosError } from "axios";

import { getMyInfoAsync } from "src/api";

import { ResponseData } from "src/types";

/**
 * 
 * @param error 
 */
export function getErrorResponse(error: AxiosError | any) {
  return error instanceof AxiosError ? error.response!.data : error.message;
}