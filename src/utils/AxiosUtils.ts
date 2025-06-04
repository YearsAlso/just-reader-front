// src/utils/AxiosUtils.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ZodSchema } from 'zod'

type PermissionChecker = () => boolean | Promise<boolean>

export class AxiosUtils {
  private axiosInstance: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config)
  }

  async request<T, P = unknown>({
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
    // 权限校验
    if (checkPermission && !(await checkPermission())) {
      throw new Error('无权限访问')
    }
    // 参数校验
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
}
