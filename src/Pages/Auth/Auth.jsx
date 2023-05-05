import { Alert, Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Login from '../../Components/Login/Login'
import Register from '../../Components/Register/Register'
import Snackbar from '@mui/material/Snackbar'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../Redux/actions'
import { useTranslation } from 'react-i18next'

const Auth = () => {
  const [actionType, setActionType] = useState('connexion')
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const alert = useSelector((state) => state.alert)
  const { t } = useTranslation(['button,content'])
  useEffect(() => {
    if (alert !== null) {
      setOpen(true)
    }
  }, [])
  return (
    <Box
      height={'calc(100vh - 90px)'}
      sx={{ bgcolor: '#E1E1E1' }}
      justifyContent={'center'}
      alignItems={'center'}
      display={'flex'}
    >
      <Snackbar
        open={open}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false)
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false)
            dispatch({ type: actions.alert, alert: null })
          }}
          severity="success"
          sx={{ width: '100%' }}
        >
          {alert}
        </Alert>
      </Snackbar>
      <Stack direction={'row'} width="490px">
        <Box width={'245px'}>
          <Stack
            direction={'row'}
            spacing={2}
            justifyContent={'flex-end'}
            marginRight={'20px'}
          >
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 100,
                fontSize: 15,
                color: '#AEAEAE',
              }}
              onClick={() => {
                setActionType('connexion')
              }}
            >
              {t('button:login')}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 100,
                fontSize: 15,
                color: '#AEAEAE',
              }}
              onClick={() => {
                setActionType('inscrire')
              }}
            >
              {t('button:register')}
            </Typography>
          </Stack>
          {actionType === 'connexion' ? <Login /> : <Register />}
        </Box>
        <Box
          width={'245px'}
          height={'590px'}
          borderRadius="0 10px 10px 0"
          sx={{
            background:
              'linear-gradient(180deg,rgba(147, 51, 177, 0.55),rgba(35, 61, 245, 1))',
          }}
        ></Box>
      </Stack>
    </Box>
  )
}

export default Auth
