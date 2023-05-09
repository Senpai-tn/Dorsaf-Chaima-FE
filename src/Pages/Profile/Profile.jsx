import { Box, Button } from '@mui/material'
import React, { useEffect } from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import EditProfile from './EditProfile'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Profile = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { t } = useTranslation(['content'])
  return (
    <Box m={3}>
      <Button
        sx={{ mx: '15px' }}
        text={'Edit Profile'}
        color={'warning'}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Edit Profile
      </Button>

      <Button
        sx={{ mx: '15px' }}
        text={'Edit Profile'}
        color={'warning'}
        variant="contained"
        onClick={() => {
          navigate('/stat')
        }}
      >
        {t('stat')}
      </Button>

      <EditProfile open={open} handleClose={() => setOpen(false)} />
      <Box m={10}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: 900 }}>
              Informations générales
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>
              <span
                style={{
                  color:
                    user.role === 'PROF'
                      ? '#1E90FF'
                      : user.role === 'ETUDIANT'
                      ? 'orange'
                      : 'black',
                  fontWeight: 900,
                }}
              >
                Nom :
              </span>
              {` ${user.nom}`}
            </Typography>
            <Typography>
              <span
                style={{
                  color:
                    user.role === 'PROF'
                      ? '#1E90FF'
                      : user.role === 'ETUDIANT'
                      ? 'orange'
                      : 'black',
                  fontWeight: 900,
                }}
              >
                Prénom :
              </span>
              {` ${user.prenom}`}
            </Typography>
            <Typography>
              <span
                style={{
                  color:
                    user.role === 'PROF'
                      ? '#1E90FF'
                      : user.role === 'ETUDIANT'
                      ? 'orange'
                      : 'black',
                  fontWeight: 900,
                }}
              >
                Date de naissance :
              </span>
              {` ${dayjs(user.dateN).format('YYYY-MM-DD')}`}
            </Typography>

            <Typography>
              <span
                style={{
                  color:
                    user.role === 'PROF'
                      ? '#1E90FF'
                      : user.role === 'ETUDIANT'
                      ? 'orange'
                      : 'black',
                  fontWeight: 900,
                }}
              >
                Tel :
              </span>
              {` ${user.tel}`}
            </Typography>

            <Typography>
              <span
                style={{
                  color:
                    user.role === 'PROF'
                      ? '#1E90FF'
                      : user.role === 'ETUDIANT'
                      ? 'orange'
                      : 'black',
                  fontWeight: 900,
                }}
              >
                Email :
              </span>
              {` ${user.email}`}
            </Typography>
          </AccordionDetails>
        </Accordion>
        {user.role === 'PROF' ? (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontWeight: 900 }}>Liste des Cours</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {user.listeCours.map((cours, index) => {
                return (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography sx={{ fontWeight: 900 }}>
                        {cours.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {cours.listeAchat.map((achat) => {
                        return (
                          <Typography>
                            <span
                              style={{
                                color:
                                  user.role === 'PROF'
                                    ? '#1E90FF'
                                    : user.role === 'ETUDIANT'
                                    ? 'orange'
                                    : 'black',
                                fontWeight: 900,
                              }}
                            >
                              {achat.etudiant}
                            </span>
                            {` ${dayjs(achat.date).format('YYYY-MM-DD HH:mm')}`}
                          </Typography>
                        )
                      })}
                    </AccordionDetails>
                  </Accordion>
                )
              })}
            </AccordionDetails>
          </Accordion>
        ) : (
          user.role === 'ETUDIANT' && (
            <>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 900 }}>
                    Liste des Cours Achetés
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {user.listeCoursAchete.map((achat, index) => {
                    return (
                      <Typography
                        sx={{
                          cursor: 'pointer',
                          bgcolor: index % 2 === 0 ? '#8080803b' : '',
                          padding: '10px',
                          borderRadius: '10px',
                        }}
                        onClick={() => {
                          navigate('/cours', { state: { cours: achat.cours } })
                        }}
                      >{`${achat.cours.title} ${dayjs(achat.date).format(
                        'YYYY-MM-DD HH:mm'
                      )}`}</Typography>
                    )
                  })}
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 900 }}>
                    Liste des Intéractions
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {user.listeInteraction.map((interaction) => {
                    return (
                      <Typography
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          m: '15px',
                          cursor: 'pointer',
                          bgcolor:
                            interaction.action === 'like'
                              ? '#00ff0020'
                              : '#ff000020',
                          padding: '10px',
                          borderRadius: '10px',
                        }}
                        onClick={() => {
                          navigate('/cours', {
                            state: { cours: interaction.cours },
                          })
                        }}
                      >
                        {interaction.action === 'like' ? (
                          <ThumbUpOffAltIcon fontSize="medium" />
                        ) : (
                          <ThumbDownOffAltIcon fontSize="medium" />
                        )}
                        {`        ${
                          interaction.cours.title
                        }        -        ${dayjs(interaction.date).format(
                          'YYYY-MM-DD HH:mm'
                        )}`}
                      </Typography>
                    )
                  })}
                </AccordionDetails>
              </Accordion>
            </>
          )
        )}
      </Box>
    </Box>
  )
}

export default Profile
