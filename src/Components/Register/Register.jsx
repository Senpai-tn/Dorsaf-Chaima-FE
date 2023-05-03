import axios from 'axios'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import actions from '../../Redux/actions'
import { registerSchema } from '../../Validateurs/validateur'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'

const Register = () => {
  const { t } = useTranslation(['content', 'button', 'Erreur'])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { control, handleSubmit, reset, setError } = useForm({
    defaultValues: {
      cin: '',
      nom: '',
      prenom: '',
      dateN: null,
      tel: '',
      email: '',
      password: '',
      role: '',
    },
    resolver: yupResolver(registerSchema()),
  })
  const connect = (data) => {
    const { cin, nom, prenom, dateN, tel, email, password, role } = data

    axios
      .post(process.env.REACT_APP_URL_BACKEND + 'user/inscrire', {
        cin,
        nom,
        prenom,
        dateN,
        tel,
        email,
        password,
        role,
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data))
        dispatch({ type: actions.login, user: response.data })
        navigate('/')
      })
      .catch((erreur) => {
        setError('cin', { message: erreur.response.data })
      })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2} justifyContent={'center'} height={'100%'}>
        <Typography
          sx={{ fontFamily: 'Poppins', fontSize: '19px', fontWeight: '700' }}
        >
          {t('button:register')}
        </Typography>

        <form
          onSubmit={handleSubmit(connect, (error) => {
            console.log(error)
          })}
        >
          <Stack spacing={1}>
            <Controller
              name="cin"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  sx={{ width: '215px' }}
                  size="small"
                  onChange={onChange}
                  value={value}
                  label={t('content:cin')}
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
            />

            <Controller
              name="nom"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  sx={{ width: '215px' }}
                  size="small"
                  type={'nom'}
                  onChange={onChange}
                  value={value}
                  label={t('content:name')}
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
            />

            <Controller
              name="prenom"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  sx={{ width: '215px' }}
                  size="small"
                  type={'prenom'}
                  onChange={onChange}
                  value={value}
                  label={t('content:lastName')}
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
            />
            <Controller
              name="dateN"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <DatePicker
                  sx={{ width: '215px' }}
                  value={value}
                  onChange={onChange}
                  label={t('content:dateOfBirth')}
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
            />
            <Controller
              name="tel"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  sx={{ width: '215px' }}
                  size="small"
                  type={'tel'}
                  onChange={onChange}
                  value={value}
                  label={t('content:Tel')}
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  sx={{ width: '215px' }}
                  size="small"
                  type={'email'}
                  onChange={onChange}
                  value={value}
                  label={t('content:email')}
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  sx={{ width: '215px' }}
                  size="small"
                  type={'password'}
                  onChange={onChange}
                  value={value}
                  label={t('content:password')}
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
            />
            <Controller
              name="role"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    {t('content:gender')}
                  </FormLabel>
                  <RadioGroup
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={onChange}
                  >
                    <FormControlLabel
                      value="etudiant"
                      control={<Radio />}
                      label={t('content:etudiant')}
                    />
                    <FormControlLabel
                      value="prof"
                      control={<Radio />}
                      label={t('content:teacher')}
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />

            <Stack
              direction={'row'}
              width={'215px'}
              justifyContent={'space-between'}
            >
              <Button text={t('button:reset')} onClick={reset} type={'reset'} />
              <Button text={t('button:register')} type={'submit'} />
            </Stack>
          </Stack>
        </form>
      </Stack>
    </LocalizationProvider>
  )
}

export default Register
