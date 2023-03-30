import * as yup from 'yup'

const loginSchema = () => {
  return yup.object({
    cin: yup.string().required('cin est un champs obligatoire'),
    password: yup.string().required('password est un champs obligatoire'),
  })
}

const registerSchema = () => {
  return yup.object({
    cin: yup.string().required('cin est un champs obligatoire'),
    nom: yup.string().required('nomest un champs obligatoire'),
    prenom: yup.string().required('prenom est un champs obligatoire'),
    dateN: yup.date().required('date est un champs obligatoire'),
    tel: yup.string().required('tel est un champs obligatoire'),
    email: yup.string().required('email est un champs obligatoire'),
    password: yup.string().required('password est un champs obligatoire'),
    role: yup.string().required('role est un champs obligatoire'),
  })
}

export { loginSchema, registerSchema }
