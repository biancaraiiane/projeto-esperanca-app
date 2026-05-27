import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup
    .string()
    .required("O nome é obrigatório.")
    .min(3, "Digite pelo menos 3 caracteres."),

  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("Digite um e-mail válido.")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Digite um e-mail válido."),

  ddd: yup
    .string()
    .required("O DDD é obrigatório.")
    .test("valid-ddd", "Digite um DDD válido.", (value) => {
      if (!value) return false;

      const onlyNumbers = value.replace(/\D/g, "");

      return /^[1-9]{2}$/.test(onlyNumbers);
    }),

  phone: yup
    .string()
    .required("O telefone é obrigatório.")
    .test("valid-phone", "Digite um telefone válido.", (value) => {
      if (!value) return false;

      const onlyNumbers = value.replace(/\D/g, "");

      return /^(?:9\d{8}|\d{8})$/.test(onlyNumbers);
    }),

  message: yup
    .string()
    .required("A mensagem é obrigatória.")
    .min(10, "Digite pelo menos 10 caracteres."),

  acceptedTerms: yup
    .boolean()
    .required("Você precisa aceitar os termos.")
    .oneOf([true], "Você precisa aceitar os termos."),

  acceptedEmails: yup
    .boolean()
    .required()
    .default(false),
});

export type ContactFormData = yup.InferType<typeof contactSchema>;