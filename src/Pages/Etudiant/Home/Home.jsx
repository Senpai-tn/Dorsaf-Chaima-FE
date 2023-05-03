import { Alert, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cours from '../../../Components/Cours/Cours'
import { useSelector } from 'react-redux'

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
    <Stack direction={'row'} spacing={5} paddingTop={'15px'}>
      {courses
        .filter((cours) => {
          return matiere != ''
            ? cours.matiere.includes(matiere) ||
                cours.matiere.includes(matiere.toUpperCase())
            : cours
        })
        .map((cours) => {
          return <Cours key={cours._id} cours={cours} />
        }).length > 0 ? (
        courses
          .filter((cours) => {
            return matiere != ''
              ? cours.matiere.includes(matiere) ||
                  cours.matiere.includes(matiere.toUpperCase())
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
  )
}

export default Home
