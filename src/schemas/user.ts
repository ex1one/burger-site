import * as yup from "yup";

import { FORM_ERRORS_MESSAGES } from "@src/consts";

const baseSchema = yup
  .object({
    email: yup
      .string()
      .email(FORM_ERRORS_MESSAGES.notValid)
      .required(FORM_ERRORS_MESSAGES.required),
    password: yup
      .string()
      .min(1, FORM_ERRORS_MESSAGES.required)
      .required(FORM_ERRORS_MESSAGES.required),
    login: yup.string().required(FORM_ERRORS_MESSAGES.required),
    name: yup.string().required(FORM_ERRORS_MESSAGES.required),
    code: yup
      .string()
      .min(1, FORM_ERRORS_MESSAGES.required)
      .required(FORM_ERRORS_MESSAGES.required),
  })
  .required();

const signInSchema = baseSchema.pick(["email", "password"]);
const signUpSchema = baseSchema.pick(["name", "email", "password"]);
const forgotPasswordSchema = baseSchema.pick(["email"]);
const resetPasswordSchema = baseSchema.pick(["password", "code"]);
const updateSchema = baseSchema.pick(["name", "password", "login"]);

export const userSchemas = {
  auth: {
    signIn: signInSchema,
    signUp: signUpSchema,
    forgotPassword: forgotPasswordSchema,
    resetPassword: resetPasswordSchema,
  },
  update: updateSchema,
};
