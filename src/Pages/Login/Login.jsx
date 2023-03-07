import axios from 'axios'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import actions from '../../Redux/actions'
import { loginSchema } from '../../Validateurs/validateur'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

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
    <div>
      <h1>Login</h1>
      <div>
        <form
          onSubmit={handleSubmit(connect, (error) => {
            console.log(error)
          })}
        >
          <Controller
            name="cin"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextField
                error={!!error}
                onChange={onChange}
                value={value}
                label="Cin"
                helperText={error && error.message}
              />
            )}
          />

          <br />
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label="Password"
                error={!!error}
                helperText={error && error.message}
              />
            )}
          />

          <br />
          <button
            type={'reset'}
            onClick={() => {
              reset()
            }}
          >
            Rénisialiser
          </button>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  )
}

export default Login
