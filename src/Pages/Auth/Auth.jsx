import { Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Login from '../../Components/Login/Login'

const Auth = () => {
  const [actionType, setActionType] = useState('connexion')

  return (
    <Box
      sx={{ bgcolor: '#E1E1E1', height: '100vh', width: '100vw' }}
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
          {actionType === 'connexion' ? <Login /> : null}
        </Box>
        <Box
          width={'245px'}
          height={'264px'}
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
