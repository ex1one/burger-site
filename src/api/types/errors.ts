export interface APIError {
	success: boolean;
	message: string;
}

// TODO: Этому классу тут не место.
export class ApiErrorClass extends Error implements APIError {
	name = 'ApiError';
	success: boolean;
	message: string;

	constructor(message: string) {
		super(message);

		this.success = false;
		this.message = message;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiErrorClass);
		}
	}
}
