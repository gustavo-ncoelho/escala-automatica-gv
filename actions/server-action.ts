import { HttpError, ServerActionError } from "@/lib/errors/errors";
import { isRedirectError } from "next/dist/client/components/redirect-error";

type ServerAction<TReturn, TArgs extends unknown[] = []> = (...args: TArgs) => Promise<TReturn>;

export type SuccessResponse<R> = { success: true; data: R; }

export type ErrorResponse = { success: false; error: string; }

export type ActionResponse<T> = SuccessResponse<T> | ErrorResponse;

export function serverAction<TReturn, TArgs extends unknown[] = []>(callback: ServerAction<TReturn, TArgs>): ServerAction<ActionResponse<TReturn>, TArgs> {
    return async (...args: TArgs): Promise<ActionResponse<TReturn>> => {
        try {
            const result = await callback(...args);

            return {
                success: true,
                data: result
            }
        } catch (error) {
            if (isRedirectError(error))
                throw error;

            if (error instanceof HttpError) {
                return {
                    success: false,
                    error: error.message.trim().length > 0 ? error.message : 'Ocorreu um erro inesperado!'
                };
            }

            if (error instanceof ServerActionError) {
                return {
                    success: false,
                    error: error.message
                };
            }

            return {
                success: false,
                error: 'Ocorreu um erro inesperado!'
            };
        }
    };
}