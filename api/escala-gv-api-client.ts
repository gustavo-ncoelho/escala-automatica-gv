import axios, {AxiosError, AxiosResponse, isAxiosError} from "axios";
import axiosRetry from "axios-retry";
import {isServer} from "@/lib/utils";
import {redirect} from "next/navigation";
import {HttpError, UnauthenticatedError} from "@/lib/errors/errors";
import {obterSessao} from "@/actions/session-actions/obter-sessao";

export const Api = {
    get: get,
    post: post,
    put: put,
    delete: del
}

const MAX_RETRIES: number = 3

function axiosInstance({withoutRetry = false, headers = {}}: {
    withoutRetry?: boolean,
    headers?: Record<string, string>
}) {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        withCredentials: true,
        timeout: 35000,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    })

    if (withoutRetry || MAX_RETRIES === 0)
        return instance

    axiosRetry(
        instance,
        {
            retries: MAX_RETRIES,
            retryCondition: (error: AxiosError) => {
                return axiosRetry.isNetworkError(error) || error.response?.status === 500
            }
        }
    )

    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config;

            const isLoginAttempt = originalRequest?.url?.endsWith('/api/auth/login');

            if (error.response?.status === 401 && originalRequest && !isLoginAttempt && !(originalRequest as any)._retry) {
                (originalRequest as any)._retry = true;

                try {

                    const refreshInstance = axios.create({
                        baseURL: "/",
                        withCredentials: true,
                        timeout: 15000,
                    });

                    const refreshResponse = await refreshInstance.post("/api/auth/refresh-token");

                    if (refreshResponse.status === 200) {

                        return instance(originalRequest);
                    }
                } catch (refreshError) {

                    console.error('Erro ao tentar refrescar o token:', refreshError);

                    /*if (isServer()) {
                        redirect('/login');
                    } else {
                        window.location.href = "/login";
                    }
                    return Promise.reject(new UnauthenticatedError());*/
                }
            }

            return Promise.reject(error);
        }
    );

    return instance;
}

async function get<TResponse = any>(endpoint: string, queryParams?: Map<string, string | string[]>, headers?: Record<string, string>): Promise<TResponse> {
    return await request<TResponse>({endpoint: endpoint, method: 'GET', queryParams: queryParams, headers: headers});
}

async function post<TResponse = any, TData = any>(endpoint: string, data?: TData, queryParams?: Map<string, string | string[]>, headers?: Record<string, string>): Promise<TResponse> {
    return await request<TResponse>({
        endpoint: endpoint,
        method: 'POST',
        data: data,
        queryParams: queryParams,
        headers: headers
    });
}

async function put<TResponse = any, TData = any>(endpoint: string, data?: TData, queryParams?: Map<string, string | string[]>, headers?: Record<string, string>): Promise<TResponse> {
    return await request<TResponse>({
        endpoint: endpoint,
        method: 'PUT',
        data: data,
        queryParams: queryParams,
        headers: headers
    });
}

async function del<TResponse = any, TData = any>(endpoint: string, data?: TData, queryParams?: Map<string, string | string[]>, headers?: Record<string, string>): Promise<TResponse> {
    return await request<TResponse>({
        endpoint: endpoint,
        method: 'DELETE',
        data: data,
        queryParams: queryParams,
        headers: headers
    });
}

async function request<T>({endpoint, method, data, queryParams, headers}: {
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    data?: any,
    queryParams?: Map<string, string | string[]>,
    headers?: Record<string, string>
}): Promise<T> {
    try {
        if (queryParams) {
            const params = new URLSearchParams();

            queryParams.forEach((values, key) => {
                if (Array.isArray(values)) {
                    values.forEach((value) => {
                        params.append(key, value)
                    })
                } else {
                    params.append(key, values)
                }
            });

            endpoint = endpoint + '?' + params.toString();
        }

        const session = await obterSessao();
        if (session.success) {
            headers = {
                ...headers,

                Authorization: `Bearer ${session.data.authorizationToken}`
            }
        }

        const instance = axiosInstance({headers: headers});

        const response: AxiosResponse<T> = await instance.request<T>({
            method: method,
            url: endpoint,
            data: data,
            params: queryParams
        });

        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response) {
                if ((error.response.data.message ?? '').length > 0) {
                    throw new HttpError(error.response.status, error.response.data.message);
                }

                if (typeof error.response.data === 'string') {
                    throw new HttpError(error.response.status, error.response.data);
                }

                if (error.response.data.errors) {
                    const firstErrorField: any = Object.values(error.response.data.errors)[0];

                    if (firstErrorField)
                        throw new HttpError(error.response.status, firstErrorField[0]);
                }
            }

            if (error.status) {
                throw new HttpError(error.status, error.message);
            }
        }

        throw error;
    }
}