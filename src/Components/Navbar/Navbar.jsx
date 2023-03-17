import { Box, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import actions from '../../Redux/actions'
import Button from '../Button/Button'
const Navbar = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      sx={{
        bgcolor: '#64aceb',
        height: '60px',
        width: 'calc(100vw-90px)',
        padding: '0 45px',
      }}
    >
      <img
        onClick={() => {
          navigate('/')
        }}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png"
        height={'100%'}
        width={'150px'}
        style={{ objectFit: 'contain' }}
      />

      <Box>
        {user === null ? (
          <Button
            text={"S'inscrire"}
            type={'submit'}
            onClick={() => {
              navigate('/auth')
            }}
          />
        ) : (
          <Button
            text={'Logout'}
            type={'delete'}
            onClick={() => {
              dispatch({ type: actions.logout })
              localStorage.setItem('user', null)
              navigate('/')
            }}
          />
        )}
      </Box>
    </Stack>
  )
}

export default Navbar
