import { Alert, Box, Button, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AjoutCours from '../../../Components/AjoutCours/AjoutCours'
import { useSelector } from 'react-redux'
import Cours from '../../../Components/Cours/Cours'
import axios from 'axios'

const Home = () => {
  const [openModal, setOpenModal] = useState(false)
  const [listCours, setListCours] = useState([])
  const [cours, setCours] = useState(null)
  const user = useSelector((state) => state.user)
  const matiere = useSelector((state) => state.matiere)

  return (
    <Box>
      <AjoutCours
        listCours={listCours}
        setListCours={setListCours}
        type={'ajout'}
        cours={cours}
        open={openModal}
        setCours={setCours}
        handleClose={() => {
          setOpenModal(false)
        }}
      />

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

      <Stack
        width={'100%'}
        direction={'row'}
        padding={'20px '}
        height={'800px'}
        sx={{ display: 'flex', flexWrap: 'wrap' }}
      >
        {user.listeCours
          .filter((cours) => {
            return matiere != ''
              ? cours.matiere.includes(matiere) ||
                  cours.matiere.includes(matiere.toUpperCase())
              : cours
          })
          .map((cours, index) => {
            return cours.deletedAt === null ? (
              <Cours key={index} cours={cours} />
            ) : null
          }).length > 0 ? (
          user.listeCours
            .filter((cours) => {
              return matiere != ''
                ? cours.matiere.includes(matiere) ||
                    cours.matiere.includes(matiere.toUpperCase())
                : cours
            })
            .map((cours, index) => {
              return cours.deletedAt === null ? (
                <Cours key={index} cours={cours} />
              ) : null
            })
        ) : (
          <Stack alignItems={'center'} width={'100%'}>
            <Alert severity="error">No Cours Found</Alert>
          </Stack>
        )}
      </Stack>
    </Box>
  )
}

export default Home
