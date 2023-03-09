import { Box, Button, IconButton, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AjoutCours from '../../../Components/AjoutCours/AjoutCours'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CreateIcon from '@mui/icons-material/Create'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useDispatch } from 'react-redux'
import actions from '../../../Redux/actions'

const Home = () => {
  const [openModal, setOpenModal] = useState(false)
  const [listCours, setListCours] = useState([])
  const [type, setType] = useState('ajout')
  const [cours, setCours] = useState(null)
  const dispatch = useDispatch()
  const getCourses = () => {
    axios
      .get('http://127.0.0.1:5000/cours')
      .then((response) => {
        setListCours(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteCours = (id) => {
    axios
      .delete('http://127.0.0.1:5000/cours', { data: { id } })
      .then(() => {
        setListCours(
          listCours.filter((cours) => {
            return cours._id !== id
          })
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getCourses()
  }, [])
  return (
    <div>
      <IconButton
        onClick={() => {
          dispatch({ type: actions.logout })
          localStorage.setItem('user', null)
        }}
      >
        <ExitToAppIcon />
      </IconButton>
      Home Prof
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          setType('ajout')
          setOpenModal(true)
          setCours(null)
        }}
      >
        Ajouter Cours
      </Button>
      <AjoutCours
        cours={cours}
        type={type}
        open={openModal}
        listCours={listCours}
        setListCours={setListCours}
        handleClose={() => {
          setOpenModal(false)
        }}
      />
      <br />
      {listCours.map((cours) => {
        return (
          <Box
            key={cours._id}
            display={'flex'}
            height={'50px'}
            alignItems={'center'}
          >
            <Typography>{`${cours.nom}  --   ${cours.price}`}</Typography>
            <IconButton
              onClick={() => {
                setCours(cours)
                setType('modifier')
                setOpenModal(true)
              }}
            >
              <CreateIcon color="warning" />
            </IconButton>
            <IconButton
              onClick={() => {
                deleteCours(cours._id)
              }}
            >
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )
      })}
    </div>
  )
}

export default Home
