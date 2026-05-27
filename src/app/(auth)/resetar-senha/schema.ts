import * as yup from "yup";

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("A nova senha é obrigatória.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),

  confirmPassword: yup
    .string()
    .required("Confirme sua senha.")
    .oneOf([yup.ref("password")], "As senhas não conferem."),
});

export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;