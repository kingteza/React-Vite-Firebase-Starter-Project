/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */
import.meta.hot;
import { Axios, AxiosError, AxiosRequestConfig } from 'axios';
import { auth } from 'config/firebase/FirebaseConfig';

import ErrorCode from './ErrorCode';

const authUserServiceLink = import.meta.env.VITE_SERVER_URL as string;

export interface ErrorResponse {
  code: ErrorCode;
  known: boolean;
  status: string;
  message: string | string[];
}

export const requestInterceptor = async (config: AxiosRequestConfig) => {
  // const accessToken = await auth?.currentUser?.getIdToken();

  const tokenType = 'Bearer';
  // if (accessToken && config.headers) {
  //   config.headers.Authorization = `${tokenType} ${accessToken}`;
  // }
  config.data = JSON.stringify(config.data);
  return config;
};

export const responseInterceptor = async (config: AxiosRequestConfig) => {
  try {
    config.data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
    return config;
  } catch (e) {
    return config;
  }
};

export const handleResponseError = async (
  error: AxiosError<ErrorResponse>,
): Promise<ErrorResponse> => {
  let data: any = error.response?.data ?? '{}';
  data = typeof data === 'string' ? JSON.parse(data) : data;
  console.error(data);
  if(error.response?.status === 401) {
    // await AuthService.logout();
  }
  const reject = {
    ...data,
    status: error.response?.status,
    message: (error.response as any)?.message ?? error.response?.statusText,
    code: error.response?.status,
  };
  return Promise.reject(reject);
};

export const validateState = (status: number) => status >= 200 && status < 300;

const commonHeaders = {
  'Content-Type': 'application/json',
};

export const api = new Axios({
  baseURL: authUserServiceLink,
  headers: commonHeaders,
  validateStatus: validateState,
});

api.interceptors.request.use(requestInterceptor as any);
api.interceptors.response.use(responseInterceptor as any, handleResponseError);
