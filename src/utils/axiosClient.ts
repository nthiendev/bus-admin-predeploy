'use client'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { BASE_URL } from '@/constants/constant'
import { getAccessToken } from './helpersClient'

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

interface IApiCaller {
  (
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    options?: { data?: any; params?: object },
  ): Promise<AxiosResponse>
}

export const apiCaller: IApiCaller = (method, url, options) => {
  return axiosConfig({
    method,
    url,
    ...options,
  })
}

export const apiAuthCaller: IApiCaller = (method, url, options) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    ...options,
  }

  const accessToken = getAccessToken()
  if (accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    }
  }

  return axiosConfig(config)
}
