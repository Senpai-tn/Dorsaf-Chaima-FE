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
import { useTranslation } from 'react-i18next'
import Swal from 'sweetalert2'

const CoursInfo = () => {
  const route = useLocation()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const { t } = useTranslation(['button', 'content', 'Erreur'])
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL_BACKEND + 'cours/' + route.state.cours._id)
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(process.env.REACT_APP_URL_BACKEND + 'cours', {
            data: { idCours: route.state.cours._id, idProf: user._id },
          })
          .then((response) => {
            dispatch({ type: actions.deleteCours, user: response.data.user })
            localStorage.setItem('user', JSON.stringify(response.data.user))
            Swal.fire('Deleted!', 'Your cours has been deleted.', 'success')
            navigate('/')
          })
          .catch((error) => {})
      }
    })
  }

  const interagir = (action) => {
    axios
      .patch(process.env.REACT_APP_URL_BACKEND + 'cours', {
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
      return interaction.cours._id === route.state.cours._id
    })
  }

  const checkAchat = () => {
    return (
      user.listeCoursAchete.find((achat) => {
        return achat.cours._id === route.state.cours._id
      }) || route.state.cours.price === 0
    )
  }

  const acheterCours = () => {
    axios
      .post(process.env.REACT_APP_URL_BACKEND + 'etudiant/acheter_cours', {
        idCours: route.state.cours._id,
        idEtudiant: user._id,
      })
      .then((response) => {
        dispatch({ type: actions.login, user: response.data })
        localStorage.setItem('user', JSON.stringify(response.data))
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
        {t('button:retour')}
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
            {t('button:editCourse')}
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
            {t('button:deleteCourse')}
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
          <Box display={'flex'} justifyContent={'space-between'}>
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
              <sup style={{ fontSize: '10px', fontWeight: '500' }}>TND</sup>
            </Typography>
          </Box>

          {user.role !== 'PROF' && (
            <>
              {route.state.cours.price === 0 ? (
                <Alert severity="success">{t('content:thisCoursIsFree')}</Alert>
              ) : route.state.cours.price > 0 && checkAchat() ? (
                <Alert severity="success">
                  {t('content:youHavePurchasedThisCourse')}
                </Alert>
              ) : (
                <ButtonMUI
                  variant="outlined"
                  color="success"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => {
                    acheterCours()
                  }}
                  disabled={checkAchat() !== false}
                >
                  {t('button:buycourse')}
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
                  {t('button:like')}
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
                  {t('button:dislike')}
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
                      process.env.REACT_APP_URL_BACKEND +
                        'pdf/' +
                        route.state.cours.coursFile
                    )
                  }}
                >
                  {t('button:download')}
                </Typography>
                <Typography
                  sx={{ color: 'orange', fontWeight: '700', cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/quiz', {
                      state: { matiere: route.state.cours.matiere },
                    })
                  }}
                >
                  {t('button:passQuiz')}
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
