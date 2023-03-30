import { Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Login from '../../Components/Login/Login'
import Register from '../../Components/Register/Register'

const Auth = () => {
  const [actionType, setActionType] = useState('connexion')

  return (
    <Box
      height={'calc(100vh - 60px)'}
      sx={{ bgcolor: '#E1E1E1' }}
      justifyContent={'center'}
      alignItems={'center'}
      display={'flex'}
    >
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
              Connecter
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
              S'inscrire
            </Typography>
          </Stack>
          {actionType === 'connexion' ? <Login /> : <Register />}
        </Box>
        <Box
          width={'245px'}
          height={'560px'}
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
