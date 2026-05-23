import * as yup from "yup";

export const volunteerSchema = yup.object({
  name: yup
    .string()
    .required("O nome é obrigatório.")
    .min(10, "Digite pelo menos 10 caracteres."),

  email: yup
  .string()
  .required("O e-mail é obrigatório.")
  .email("Digite um e-mail válido.")
  .matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    "Digite um e-mail válido."
  ),

  phone: yup
  .string()
  .required("O telefone é obrigatório.")
  .test("valid-phone", "Digite um telefone válido.", (value) => {
    if (!value) return false;

    const onlyNumbers = value.replace(/\D/g, "");

    const regex = /^(?:55)?[1-9]{2}(?:9\d{8}|\d{8})$/;

    return regex.test(onlyNumbers);
  }),

  horario: yup
    .string()
    .required("O horário é obrigatório.")
    .min(10, "Digite um horário com pelo menos 10 caracteres."),
});

export type VolunteerFormData = yup.InferType<typeof volunteerSchema>;