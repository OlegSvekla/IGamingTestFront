import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

export class Http {
  public static async request<TResult = any, TData = any>(
    url: string,
    options: AxiosRequestConfig<TData>
  ) {
    try {
      return await axios.request<TResult, AxiosResponse<TResult, TData>, TData>({ url, ...options });
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  public static get<TResult = any>(url: string) {
    return this.request<TResult>(url, { method: 'get' });
  }

  public static post<TResult = any, TData = any>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig<TData>
  ) {
    return this.request<TResult, TData>(url, { ...config, method: 'post', data });
  }
}
