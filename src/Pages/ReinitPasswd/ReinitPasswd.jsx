import { Box, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../Components/Button/Button'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../Redux/actions'

const ReinitPasswd = () => {
  const route = useLocation()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      code: '',
      newPasswd: '',
      confirmNewPasswd: '',
    },
  })
  const [validCode, setValidCode] = useState(false)

  const reinitPassword = (data) => {
    const { newPasswd, confirmNewPasswd } = data
    if (newPasswd !== confirmNewPasswd) {
      setError('confirmNewPasswd', {
        message: 'Veuillez vérifier la mot de passe',
      })
    } else {
      axios
        .post(process.env.REACT_APP_URL_BACKEND + 'user/reinitialiser', {
          cin: route.state.cin,
          password: newPasswd,
        })
        .then(() => {
          dispatch({
            type: actions.alert,
            alert: 'Mot de pass changé . vous devez connecter',
          })
          navigate('/auth')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  return (
    <Box
      display={'flex'}
      justifyContent="center"
      alignItems={'center'}
      height={'calc(100vh - 90px )'}
    >
      {validCode === false ? (
        <Controller
          control={control}
          name={'code'}
          render={({ field: { value, onChange } }) => (
            <TextField
              value={value}
              label={'Code de confirmation'}
              onChange={(event) => {
                onChange(event)
                if (event.target.value === route.state.code) {
                  setValidCode(true)
                }
              }}
            />
          )}
        />
      ) : (
        <form onSubmit={handleSubmit(reinitPassword)}>
          <Stack spacing={5}>
            <Controller
              name="newPasswd"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  type="password"
                  label={'Nouvelle mot de passe'}
                  value={value}
                  onChange={onChange}
                  helperText={error && error.message}
                  error={!!error}
                />
              )}
            />
            <Controller
              name="confirmNewPasswd"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  type="password"
                  label={'Confirmer mot de passe'}
                  value={value}
                  onChange={onChange}
                  helperText={error && error.message}
                  error={!!error}
                />
              )}
            />
            <Button text={'Enregistrer'} type={'submit'} />
          </Stack>
        </form>
      )}
    </Box>
  )
}

export default ReinitPasswd
