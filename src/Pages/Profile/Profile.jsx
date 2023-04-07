import { Box } from '@mui/material'
import React from 'react'
import Button from '../../Components/Button/Button'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  return (
    <Box m={3}>
      <Button text={'Edit Profile'} type={'warning'} />
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
                  <Typography
                    sx={{
                      bgcolor: index % 2 === 0 ? '#8080803b' : '',
                      padding: '20px',
                      borderRadius: '20px',
                    }}
                    onClick={() => {
                      navigate('/cours', { state: { cours } })
                    }}
                  >{`${cours.title}  `}</Typography>
                )
              })}
            </AccordionDetails>
          </Accordion>
        ) : (
          user.role !== 'admin' && (
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
          )
        )}
      </Box>
    </Box>
  )
}

export default Profile
