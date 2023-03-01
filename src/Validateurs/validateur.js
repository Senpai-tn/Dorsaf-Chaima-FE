import * as yup from 'yup'

const loginSchema = () => {
  return yup.object({
    cin: yup.string().required('cin est un champs obligatoire'),
    password: yup.string().required('password est un champs obligatoire'),
  })
}

export { loginSchema }
