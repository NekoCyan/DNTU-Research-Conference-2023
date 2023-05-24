import axios from "axios";

import { API_ROOT } from "src/utils/constants";

export const axiosIntance = axios.create({
  baseURL: API_ROOT,
  timeout: 60000 * 5,
  responseType: "json"
});