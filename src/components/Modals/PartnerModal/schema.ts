import * as yup from "yup";

export const partnerSchema = yup.object({
  companyName: yup
    .string()
    .required("O nome da empresa é obrigatório.")
    .min(2, "Digite pelo menos 2 caracteres.")
    .max(80, "O nome da empresa deve ter no máximo 80 caracteres."),

  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("Digite um e-mail válido.")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Digite um e-mail válido."),

  phone: yup
    .string()
    .required("O telefone é obrigatório.")
    .test("valid-phone", "Digite um telefone válido com DDD.", (value) => {
      if (!value) return false;

      const onlyNumbers = value.replace(/\D/g, "");

      const phoneRegex = /^(?:55)?[1-9]{2}(?:9\d{8}|\d{8})$/;

      return phoneRegex.test(onlyNumbers);
    }),

  description: yup
    .string()
    .required("A descrição é obrigatória.")
    .min(20, "Escreva pelo menos 20 caracteres sobre a parceria.")
    .max(500, "A descrição deve ter no máximo 500 caracteres."),
});

export type PartnerFormData = yup.InferType<typeof partnerSchema>;