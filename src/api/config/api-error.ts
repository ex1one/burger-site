import { APIError } from "../types/errors";

export class ApiErrorClass implements APIError {
  name = "ApiError";
  success: boolean;
  message: string;

  constructor(message: string) {
    this.success = false;
    this.message = message;
  }
}
