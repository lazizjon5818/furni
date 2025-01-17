import { ApiResponse } from './interface';

export function createApiResponse<T>(
  statusCode: number,
  message: string,
  data: T | null = null, // Default value for `data` is null
): ApiResponse<T> {
  return { statusCode, message, data };
}
