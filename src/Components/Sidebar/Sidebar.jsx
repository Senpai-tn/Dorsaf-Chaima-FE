import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const Sidebar = ({ cible, setCible }) => {
  return (
    <Stack
      width={'200px'}
      minHeight={'calc(100vh - 60px)'}
      sx={{
        bgcolor: 'black',
        color: 'white',
        textAlign: 'center',
        paddingTop: '10px',
      }}
      spacing={3}
      justifyContent={'flex-start'}
    >
      <Typography
        onClick={() => {
          setCible('users')
        }}
      >
        Users
      </Typography>
      <Typography
        onClick={() => {
          setCible('courses')
        }}
      >
        Courses
      </Typography>
    </Stack>
  )
}

export default Sidebar
