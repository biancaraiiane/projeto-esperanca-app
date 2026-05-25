import * as yup from "yup";

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("Digite um e-mail válido."),
});

export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;
