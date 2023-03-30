import { Box, Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import AjoutCours from '../../../Components/AjoutCours/AjoutCours'
import { useSelector } from 'react-redux'
import Cours from '../../../Components/Cours/Cours'

const Home = () => {
  const [openModal, setOpenModal] = useState(false)
  const [listCours, setListCours] = useState([])
  const [cours, setCours] = useState(null)
  const user = useSelector((state) => state.user)

  return (
    <Box>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          setOpenModal(true)
          setCours(null)
        }}
      >
        Ajouter Cours
      </Button>
      <AjoutCours
        type={'ajout'}
        cours={cours}
        open={openModal}
        listCours={listCours}
        setListCours={setListCours}
        handleClose={() => {
          setOpenModal(false)
        }}
      />

      <Stack
        direction={'row'}
        padding={'20px '}
        height={'800px'}
        sx={{ display: 'flex', flexWrap: 'wrap' }}
      >
        {user.listeCours.map((cours, index) => {
          return cours.deletedAt === null ? (
            <Cours key={index} cours={cours} />
          ) : null
        })}
      </Stack>
    </Box>
  )
}

export default Home
