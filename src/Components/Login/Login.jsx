import axios from 'axios'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import actions from '../../Redux/actions'
import { loginSchema } from '../../Validateurs/validateur'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { control, handleSubmit, reset, setError } = useForm({
    defaultValues: {
      cin: '',
      password: '',
    },
    resolver: yupResolver(loginSchema()),
  })
  const connect = (data) => {
    const { cin, password } = data
    axios
      .post('http://127.0.0.1:5000/user/connecter', { cin, password })
      .then((response) => {
        if (response.data === 'cin incorrecte') {
          setError('cin', { message: 'Cin incorecte' })
        } else if (response.data === 'mot de passe incorrecte') {
          setError('password', { message: 'Password incorecte' })
        } else {
          dispatch({ type: actions.login, user: response.data })
          localStorage.setItem('user', JSON.stringify(response.data))
          navigate('/')
        }
      })
      .catch((erreur) => {
        console.log(erreur)
      })
  }

  return (
    <Stack spacing={2} justifyContent={'center'} height={'100%'}>
      <Typography
        sx={{ fontFamily: 'Poppins', fontSize: '15px', fontWeight: '700' }}
      >
        Se Connecter
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
                label="Cin"
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
                label="Password"
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
            <Button text={'Réinitialiser'} onClick={reset} type={'reset'} />
            <Button text={'Se connecter'} type={'submit'} />
          </Stack>
        </Stack>
      </form>
    </Stack>
  )
}

export default Login
