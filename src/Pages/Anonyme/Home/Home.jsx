import { Stack } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cours from '../../../Components/Cours/Cours'

const Home = () => {
  const [courses, setCourses] = useState([])

  const getCours = () => {
    axios
      .get('http://127.0.0.1:5000/cours')
      .then((response) => {
        setCourses(response.data)
      })
      .catch((error) => {})
  }

  useEffect(() => {
    getCours()
  }, [])

  return (
    <Stack direction={'row'} spacing={5} paddingTop={'15px'}>
      {courses.map((cours) => {
        return <Cours key={cours._id} cours={cours} />
      })}
    </Stack>
  )
}

export default Home
