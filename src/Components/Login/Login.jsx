import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import actions from '../../Redux/actions'
import { loginSchema } from '../../Validateurs/validateur'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const { t } = useTranslation(['button', 'content', 'Erreur'])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { control, handleSubmit, reset, setError, watch } = useForm({
    defaultValues: {
      cin: '',
      password: '',
    },
    resolver: yupResolver(loginSchema()),
  })
  const [code, setCode] = useState(null)

  const connect = (data) => {
    const { cin, password } = data
    axios
      .post(process.env.REACT_APP_URL_BACKEND + 'user/connecter', {
        cin,
        password,
      })
      .then((response) => {
        dispatch({ type: actions.login, user: response.data })
        localStorage.setItem('user', JSON.stringify(response.data))
        navigate('/')
      })
      .catch((erreur) => {
        if (erreur.response.status === 403)
          setError('password', { message: erreur.response.data })
        else setError('cin', { message: erreur.response.data })
      })
  }

  useEffect(() => {
    if (code !== null) {
      navigate('/reinit', { state: { code, cin: watch('cin') } })
    }
    return () => {
      setCode(null)
    }
  }, [code])

  const handleForgotPWD = () => {
    if (watch('cin') === '') {
      setError('cin', { message: 'Cin obligatoire' })
    } else {
      axios
        .post(process.env.REACT_APP_URL_BACKEND + 'user', { cin: watch('cin') })
        .then((response) => {
          setCode(response.data)
        })
        .catch((erreur) => {
          console.log(erreur)
        })
    }
  }

  return (
    <Stack spacing={2} justifyContent={'center'} height={'100%'}>
      <Typography
        sx={{ fontFamily: 'Poppins', fontSize: '19px', fontWeight: '700' }}
      >
        {t('button:login')}
      </Typography>
      <form
        onSubmit={handleSubmit(connect, (error) => {
          console.log(error)
        })}
      >
        <Stack spacing={3}>
          <Controller
            name="cin"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextField
                sx={{ width: '215px' }}
                size="small"
                error={!!error}
                onChange={onChange}
                value={value}
                label={t('content:cin')}
                helperText={error && error.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
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

          <Stack
            direction={'row'}
            width={'215px'}
            justifyContent={'space-between'}
          >
            <Button text={t('button:reset')} onClick={reset} type={'reset'} />
            <Button text={t('button:login')} type={'submit'} />
          </Stack>
        </Stack>
      </form>
      <Typography
        sx={{ color: 'blue', textDecoration: 'underline' }}
        onClick={() => handleForgotPWD()}
      >
        {t('content:forgotYourPassword')}
      </Typography>
    </Stack>
  )
}

export default Login
