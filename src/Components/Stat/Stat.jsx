import { Box, Divider } from '@mui/material'
import React from 'react'
import Courses from './Courses'
import { Users } from './Users'

const Stat = () => {
  return (
    <Box width={'100%'}>
      <Courses />
      <Divider />
      <Users />
    </Box>
  )
}

export default Stat
