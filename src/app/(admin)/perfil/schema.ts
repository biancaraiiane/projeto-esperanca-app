import * as yup from "yup";

export const profileSchema = yup.object({
  name: yup
    .string()
    .required("O nome é obrigatório.")
    .min(3, "Digite pelo menos 3 caracteres."),

  birthDate: yup
    .string()
    .required("A data de nascimento é obrigatória."),
});

export const passwordSchema = yup.object({
  newPassword: yup
    .string()
    .required("A nova senha é obrigatória.")
    .min(6, "A nova senha deve ter pelo menos 6 caracteres."),

  confirmPassword: yup
    .string()
    .required("Confirme a nova senha.")
    .oneOf([yup.ref("newPassword")], "As senhas não conferem."),
});

export const newAdminSchema = yup.object({
  adminName: yup
    .string()
    .required("O nome do administrador é obrigatório.")
    .min(3, "Digite pelo menos 3 caracteres."),

  adminEmail: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("Digite um e-mail válido."),

  adminPassword: yup
    .string()
    .required("A senha é obrigatória.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),

  adminBirthDate: yup
    .string()
    .required("A data de nascimento é obrigatória."),
});

export type ProfileFormData = yup.InferType<typeof profileSchema>;
export type PasswordFormData = yup.InferType<typeof passwordSchema>;
export type NewAdminFormData = yup.InferType<typeof newAdminSchema>;