import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../Components/Button/Button'
import { Button as ButtonMUI } from '@mui/material'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import socket from '../../../Socket/Socket'

const CoursInfo = () => {
  const route = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    socket.on('event', (data) => {
      console.log(data)
    })
  }, [])
  return (
    <Box>
      <ButtonMUI
        variant="outlined"
        size="large"
        startIcon={<KeyboardReturnIcon />}
        sx={{ margin: '10px 0 0 10px' }}
        onClick={() => navigate('/')}
      >
        Retour
      </ButtonMUI>
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
            Titre du cours
          </Typography>
          <Typography
            sx={{
              fontSize: '18px',
              color: '#000',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 18,
              height: '500px',
            }}
          >
            Description du cours Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolorum nesciunt reprehenderit autem officia
            recusandae alias maiores doloremque! Voluptates, porro quam ullam
            dolorem vitae e
          </Typography>
          {route.state.num === 'JS' ? (
            <Button type={'warning'} text={'Acheter ce cours'} />
          ) : (
            <ButtonMUI
              variant="outlined"
              color="warning"
              size="large"
              startIcon={<ThumbUpOffAltIcon />}
            >
              Delete
            </ButtonMUI>
          )}
        </Stack>
        <Stack direction={'column'} width={'50vw'}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png"
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
            <Typography style={{ color: 'orange', fontWeight: '700' }}>
              Télécharger
            </Typography>
            <Typography style={{ color: 'orange', fontWeight: '700' }}>
              Passer Quiz
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <iframe
        style={{ marginTop: '25px' }}
        width="100%"
        height="600px"
        src="https://www.youtube.com/embed/m1-XAOyL8kk"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </Box>
  )
}

export default CoursInfo
