import { API_BASE_URL } from "../../environment";

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
};

export class ApiError extends Error {
  public status: number;
  public data?: unknown;

  constructor(
    status: number,
    message: string,
    data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}
