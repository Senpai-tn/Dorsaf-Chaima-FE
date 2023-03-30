import { Box } from '@mui/material'
import React, { useState } from 'react'
import ListCourses from '../../../Components/ListCourses/ListCourses'
import ListUsers from '../../../Components/ListUsers/ListUsers'
import Sidebar from '../../../Components/Sidebar/Sidebar'

const Home = () => {
  const [cible, setCible] = useState('users')
  return (
    <Box display={'flex'}>
      <Sidebar setCible={setCible} />
      {cible === 'users' ? (
        <ListUsers />
      ) : cible === 'courses' ? (
        <ListCourses />
      ) : null}
    </Box>
  )
}

export default Home
