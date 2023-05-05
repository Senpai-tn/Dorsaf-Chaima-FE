import { Box } from '@mui/material'
import React, { useState } from 'react'
import ListCourses from '../../../Components/ListCourses/ListCourses'
import ListUsers from '../../../Components/ListUsers/ListUsers'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import Stat from '../../../Components/Stat/Stat'

const Home = () => {
  const [cible, setCible] = useState('stat')
  return (
    <Box display={'flex'}>
      <Sidebar setCible={setCible} />
      {cible === 'users' ? (
        <ListUsers />
      ) : cible === 'courses' ? (
        <ListCourses />
      ) : (
        <Stat />
      )}
    </Box>
  )
}

export default Home
