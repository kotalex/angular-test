export interface ApiResponse {
  success: boolean;
  message?: string;
  errors?: object;
  data?: any;
  token?: string;
}

export interface ErrorResponse {
  error: ApiResponse;
  status: number;
}

