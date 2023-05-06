import { Alert, Box, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cours from '../../../Components/Cours/Cours'
import { useSelector } from 'react-redux'
import TopSell from '../../../Components/TopSell/TopSell'
import TopLiked from '../../../Components/TopLiked/TopLiked'
import TopViewed from '../../../Components/TopViewed/TopViewed'

const Home = () => {
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
    <Stack direction={'row'} spacing={5} padding={'15px'}>
      <Box height={'100%'}>
        <TopSell courses={courses} />
        <TopLiked courses={courses} />
        <TopViewed courses={courses} />
      </Box>
      <Stack width={'100%'} direction={'row'} flexWrap={'wrap'}>
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
