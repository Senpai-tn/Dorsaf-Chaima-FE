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
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { control, handleSubmit, reset, setError } = useForm({
    defaultValues: {
      cin: '',
      nom: '',
      prenom: '',
      dateN: '',
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
      .post('http://127.0.0.1:5000/user/inscrire', {
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
    <Stack spacing={2} justifyContent={'center'} height={'100%'}>
      <Typography
        sx={{ fontFamily: 'Poppins', fontSize: '15px', fontWeight: '700' }}
      >
        sinscrire
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
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextField
                sx={{ width: '215px' }}
                size="small"
                onChange={onChange}
                value={value}
                label="Cin"
                error={!!error}
                helperText={error && error.message}
              />
            )}
          />

          <Controller
            name="nom"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextField
                sx={{ width: '215px' }}
                size="small"
                type={'nom'}
                onChange={onChange}
                value={value}
                label="Nom"
                error={!!error}
                helperText={error && error.message}
              />
            )}
          />

          <Controller
            name="prenom"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextField
                sx={{ width: '215px' }}
                size="small"
                type={'prenom'}
                onChange={onChange}
                value={value}
                label="Prenom"
                error={!!error}
                helperText={error && error.message}
              />
            )}
          />
          <Controller
            name="dateN"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextField
                sx={{ width: '215px' }}
                size="small"
                type={'date'}
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={error && error.message}
              />
            )}
          />
          <Controller
            name="tel"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextField
                sx={{ width: '215px' }}
                size="small"
                type={'tel'}
                onChange={onChange}
                value={value}
                label="Tel"
                error={!!error}
                helperText={error && error.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextField
                sx={{ width: '215px' }}
                size="small"
                type={'email'}
                onChange={onChange}
                value={value}
                label="Email"
                error={!!error}
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
          <Controller
            name="role"
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
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
                    label="Etudiant"
                  />
                  <FormControlLabel
                    value="prof"
                    control={<Radio />}
                    label="Prof"
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
            <Button text={'Réinitialiser'} onClick={reset} type={'reset'} />
            <Button text={'Se connecter'} type={'submit'} />
          </Stack>
        </Stack>
      </form>
    </Stack>
  )
}

export default Register
