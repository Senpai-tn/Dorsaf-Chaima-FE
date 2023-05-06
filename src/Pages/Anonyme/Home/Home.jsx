import { Alert, Box, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cours from '../../../Components/Cours/Cours'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TopSell from '../../../Components/TopSell/TopSell'
import TopLiked from '../../../Components/TopLiked/TopLiked'
import TopViewed from '../../../Components/TopViewed/TopViewed'

const Home = () => {
  const route = useLocation()
  const [courses, setCourses] = useState([])
  const matiere = useSelector((state) => state.matiere)

  const getCours = () => {
    axios
      .get(process.env.REACT_APP_URL_BACKEND + 'cours')
      .then((response) => {
        setCourses(response.data)
      })
      .catch((error) => {})
  }

  useEffect(() => {
    getCours()
  }, [])

  return (
    <Stack width={'100%'} direction={'row'} padding={'15px'}>
      <Box height={'100%'}>
        <TopSell courses={courses} />
        <TopLiked courses={courses} />
        <TopViewed courses={courses} />
      </Box>

      <Stack direction={'row'} flexWrap={'wrap'} width={'100%'}>
        {courses
          .filter((cours) => {
            return matiere != ''
              ? cours.matiere.toUpperCase().includes(matiere.toUpperCase())
              : cours
          })
          .map((cours) => {
            return <Cours key={cours._id} cours={cours} />
          }).length > 0 ? (
          courses
            .filter((cours) => {
              return matiere != ''
                ? cours.matiere.toUpperCase().includes(matiere.toUpperCase())
                : cours
            })
            .map((cours) => {
              return <Cours key={cours._id} cours={cours} />
            })
        ) : (
          <Stack alignItems={'center'} width={'100%'}>
            <Alert severity="error">No Cours Found</Alert>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

export default Home
