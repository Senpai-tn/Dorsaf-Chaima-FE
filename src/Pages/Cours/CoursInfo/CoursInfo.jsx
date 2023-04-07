import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button as ButtonMUI } from '@mui/material'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../../Redux/actions'
import AjoutCours from '../../../Components/AjoutCours/AjoutCours'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Alert from '@mui/material/Alert'

const CoursInfo = () => {
  const route = useLocation()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/cours/' + route.state.cours._id)
      .then((response) => {
        if (
          user.role === 'PROF' &&
          route.state.cours.idProf.toString() === user._id
        ) {
          dispatch({ type: actions.updateCours, user: response.data.user })
          localStorage.setItem('user', JSON.stringify(response.data.user))
        }
      })
  }, [])

  const deleteCours = () => {
    axios
      .delete('http://127.0.0.1:5000/cours', {
        data: { idCours: route.state.cours._id, idProf: user._id },
      })
      .then((response) => {
        dispatch({ type: actions.deleteCours, user: response.data.user })
        localStorage.setItem('user', JSON.stringify(response.data.user))
        navigate('/')
      })
      .catch((error) => {})
  }

  const interagir = (action) => {
    axios
      .patch('http://127.0.0.1:5000/cours', {
        idCours: route.state.cours._id,
        idEtudiant: user._id,
        action,
      })
      .then((response) => {
        dispatch({ type: actions.deleteCours, user: response.data.user })
        localStorage.setItem('user', JSON.stringify(response.data.user))
      })
  }

  const checkInteraction = () => {
    return user.listeInteraction.find((interaction) => {
      return interaction.idCours === route.state.cours._id
    })
  }

  const checkAchat = () => {
    return user.listeCoursAchete.find((achat) => {
      return achat.cours._id === route.state.cours._id
    })
  }

  const acheterCours = () => {
    axios
      .post('http://127.0.0.1:5000/etudiant/acheter_cours', {
        idCours: route.state.cours._id,
        idEtudiant: user._id,
      })
      .then((response) => {
        dispatch({ type: actions.login, user: response.data })
        localStorage.setItem('user', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const setCours = (cours) => {
    route.state.cours = cours
  }
  return (
    <Box>
      <AjoutCours
        type={'modifier'}
        cours={route.state.cours}
        open={openModal}
        setCours={setCours}
        handleClose={() => {
          setOpenModal(false)
        }}
      />
      <ButtonMUI
        variant="outlined"
        size="large"
        startIcon={<KeyboardReturnIcon />}
        sx={{ margin: '10px 0 0 10px' }}
        onClick={() => navigate('/')}
      >
        Retour
      </ButtonMUI>
      {user.role === 'PROF' && (
        <>
          <ButtonMUI
            variant="outlined"
            color="warning"
            size="large"
            startIcon={<DeleteForeverIcon />}
            sx={{ margin: '10px 0 0 10px' }}
            onClick={() => {
              setOpenModal(true)
            }}
          >
            Modifier ce cours
          </ButtonMUI>
          <ButtonMUI
            variant="outlined"
            color="error"
            size="large"
            startIcon={<DeleteForeverIcon />}
            sx={{ margin: '10px 0 0 10px' }}
            onClick={() => {
              deleteCours()
            }}
          >
            Supprimer ce cours
          </ButtonMUI>
        </>
      )}
      <Stack
        direction={'row'}
        marginTop={'25px'}
        justifyContent={'space-around'}
        height={'600px'}
      >
        <Stack direction={'column'} width={'50vw'}>
          <Typography
            sx={{
              fontWeight: '900',
              fontSize: '40px',
              color: '#1212b7',
            }}
          >
            {route.state.cours.title}
          </Typography>
          <Typography
            sx={{
              fontWeight: '900',
              fontSize: '40px',
              color: '#1212b7',
            }}
          >
            {route.state.cours.price}
          </Typography>

          {user.role !== 'PROF' && (
            <>
              {checkAchat() ? (
                <Alert severity="success">Vous avez acheter ce cours</Alert>
              ) : (
                <ButtonMUI
                  variant="outlined"
                  color="success"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => {
                    acheterCours()
                  }}
                  disabled={checkAchat() !== undefined}
                >
                  Acheter ce cours
                </ButtonMUI>
              )}
              <Stack direction={'row'} spacing={3}>
                <ButtonMUI
                  variant="outlined"
                  color="warning"
                  size="large"
                  startIcon={<ThumbUpOffAltIcon />}
                  onClick={() => {
                    interagir('like')
                  }}
                  disabled={
                    checkInteraction() !== undefined &&
                    checkInteraction().action === 'like'
                  }
                  sx={{
                    ':disabled': {
                      color: 'orange',
                    },
                    visibility:
                      checkInteraction() !== undefined &&
                      checkInteraction().action === 'dislike'
                        ? 'hidden'
                        : 'visible',
                  }}
                >
                  Like
                </ButtonMUI>
                <ButtonMUI
                  variant="outlined"
                  color="warning"
                  size="large"
                  startIcon={<ThumbDownOffAltIcon />}
                  onClick={() => {
                    interagir('dislike')
                  }}
                  disabled={
                    checkInteraction() !== undefined &&
                    checkInteraction().action === 'dislike'
                  }
                  sx={{
                    ':disabled': {
                      color: 'orange',
                    },
                    visibility:
                      checkInteraction() !== undefined &&
                      checkInteraction().action === 'like'
                        ? 'hidden'
                        : 'visible',
                  }}
                >
                  Dislike
                </ButtonMUI>
              </Stack>
            </>
          )}
          <iframe
            style={{ marginTop: '25px' }}
            width="100%"
            height="450px"
            src={`https://www.youtube.com/embed/${route.state.cours.video}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </Stack>
        <Stack direction={'column'} width={'50vw'}>
          <img
            alt={route.state.cours.image}
            src={'http://localhost:5000/images/' + route.state.cours.image}
            width={'100%'}
            height={'90%'}
            style={{ objectFit: 'contain' }}
          />
          <Stack
            direction={'row'}
            justifyContent={'space-around'}
            alignItems={'center'}
            height={'10%'}
          >
            {checkAchat() && (
              <>
                <Typography
                  sx={{ color: 'orange', fontWeight: '700', cursor: 'pointer' }}
                  onClick={() => {
                    axios.get(
                      'http://127.0.0.1:5000/pdf/' + route.state.cours.coursFile
                    )
                  }}
                >
                  Télécharger
                </Typography>
                <Typography
                  sx={{ color: 'orange', fontWeight: '700', cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/quiz', {
                      state: { matiere: route.state.cours.matiere },
                    })
                  }}
                >
                  Passer Quiz
                </Typography>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default CoursInfo
