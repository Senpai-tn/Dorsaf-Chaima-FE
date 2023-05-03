import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../Redux/actions'
import { useTranslation } from 'react-i18next'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'

const EditProfile = ({ open, handleClose }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nom: '',
      prenom: '',
      dateN: null,
      tel: '',
      email: '',
    },
  })
  const dispatch = useDispatch()

  const { t } = useTranslation(['content', 'button'])
  const user = useSelector((state) => state.user)
  const editProfileAction = (data) => {
    axios
      .put(process.env.REACT_APP_URL_BACKEND + 'user', {
        profil: {
          ...user,
          nom: data.nom,
          prenom: data.prenom,
          dateN: dayjs(data.dateN).format('YYYY-MM-DD HH:mm:ss'),
          tel: data.tel,
          email: data.email,
        },
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data))
        dispatch({ type: actions.login, user: response.data })
        handleClose()
      })
      .catch((error) => {
        handleClose()
        Swal.fire('Error', error.message, 'error')
      })
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal
        open={open}
        onClose={handleClose}
        hideBackdrop={true}
        sx={{
          bgcolor: 'white',
          height: '500px',
          width: '350px',
          position: 'absolute',
          boxShadow: '2px 2px 20px 12px #9032329e',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          height={'100%'}
          width={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <IconButton
            sx={{ position: 'absolute', top: '0', right: '0' }}
            onClick={() => {
              handleClose()
            }}
          >
            <CloseIcon color="error" />
          </IconButton>

          <Typography>
            {t('button:edit')} {t('content:profil')}
          </Typography>

          <form onSubmit={handleSubmit(editProfileAction)}>
            <Stack
              justifyContent={'center'}
              width={'100%'}
              spacing={3}
              alignItems={'center'}
            >
              <Controller
                name="nom"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error && error.message}
                    id="outlined-basic"
                    label={t('content:name')}
                    variant="outlined"
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
                    value={value}
                    type={'number'}
                    onChange={onChange}
                    error={!!error}
                    helperText={error && error.message}
                    id="outlined-basic"
                    label={t('content:lastName')}
                    variant="outlined"
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
                    error={!!error}
                    helperText={error && error.message}
                    label={t('content:dateOfBirth')}
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
                    value={value}
                    type={'email'}
                    onChange={onChange}
                    error={!!error}
                    helperText={error && error.message}
                    id="outlined-basic"
                    label={t('content:email')}
                    variant="outlined"
                  />
                )}
              />

              <Box>
                <Button variant="outlined" color="success" type={'submit'}>
                  {t('button:edit')}
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Modal>
    </LocalizationProvider>
  )
}

export default EditProfile
