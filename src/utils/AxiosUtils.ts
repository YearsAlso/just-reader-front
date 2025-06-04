// src/utils/AxiosUtils.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ZodSchema } from 'zod'

type PermissionChecker = () => boolean | Promise<boolean>

export class AxiosUtils {
  private axiosInstance: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config)
  }

  private async handleRequest<T, P = unknown>({
    url,
    method,
    params,
    data,
    schema,
    checkPermission,
    config
  }: {
    url: string
    method: 'get' | 'post' | 'put' | 'delete'
    params?: P
    data?: any
    schema?: ZodSchema<P>
    checkPermission?: PermissionChecker
    config?: AxiosRequestConfig
  }): Promise<AxiosResponse<T>> {
    if (checkPermission && !(await checkPermission())) {
      throw new Error('无权限访问')
    }
    if (schema && params) {
      schema.parse(params)
    }
    return this.axiosInstance.request<T>({
      url,
      method,
      params,
      data,
      ...config
    })
  }

  get<T, P = unknown>(options: {
    url: string
    params?: P
    schema?: ZodSchema<P>
    checkPermission?: PermissionChecker
    config?: AxiosRequestConfig
  }): Promise<AxiosResponse<T>> {
    return this.handleRequest<T, P>({
      ...options,
      method: 'get'
    })
  }

  post<T, P = unknown>(options: {
    url: string
    data?: any
    params?: P
    schema?: ZodSchema<P>
    checkPermission?: PermissionChecker
    config?: AxiosRequestConfig
  }): Promise<AxiosResponse<T>> {
    return this.handleRequest<T, P>({
      ...options,
      method: 'post'
    })
  }

  put<T, P = unknown>(options: {
    url: string
    data?: any
    params?: P
    schema?: ZodSchema<P>
    checkPermission?: PermissionChecker
    config?: AxiosRequestConfig
  }): Promise<AxiosResponse<T>> {
    return this.handleRequest<T, P>({
      ...options,
      method: 'put'
    })
  }

  delete<T, P = unknown>(options: {
    url: string
    params?: P
    schema?: ZodSchema<P>
    checkPermission?: PermissionChecker
    config?: AxiosRequestConfig
  }): Promise<AxiosResponse<T>> {
    return this.handleRequest<T, P>({
      ...options,
      method: 'delete'
    })
  }
}
