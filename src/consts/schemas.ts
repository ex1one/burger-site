import * as yup from 'yup';

const errorMessages = {
	notValid: 'This field is not valid!',
	required: 'This field is required!',
};

// TODO: Разделить на разные схемы и с помощью утилитарных функций использовать одни и те же email валидаторы.
// А то получается, что для каждой формы разный валидатор email.
export const schemas = {
	auth: {
		signIn: yup
			.object({
				email: yup.string().email(errorMessages.notValid).required(errorMessages.required),
				password: yup.string().min(1, errorMessages.required).required(errorMessages.required),
			})
			.required(),
		signUp: yup
			.object({
				name: yup.string().required(errorMessages.required),
				email: yup.string().email(errorMessages.notValid).required(errorMessages.required),
				password: yup.string().min(1, errorMessages.required).required(errorMessages.required),
			})
			.required(),
		forgotPassword: yup
			.object({
				email: yup.string().email(errorMessages.notValid).required(errorMessages.required),
			})
			.required(),
		resetPassword: yup
			.object({
				password: yup.string().min(1, errorMessages.required).required(errorMessages.required),
				code: yup.string().min(1, errorMessages.required).required(errorMessages.required),
			})
			.required(),
	},
};
