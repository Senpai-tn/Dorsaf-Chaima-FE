import { Stack, Typography } from '@mui/material'
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import { useNavigate } from 'react-router-dom'

const Cours = ({ cours }) => {
  const navigate = useNavigate()
  return (
    <Stack
      width={'250px'}
      height={'300px'}
      position={'relative'}
      sx={{ border: '2px solid #00000040', borderRadius: '0 0 10px 10px' }}
      onClick={() => {
        navigate('/cours', { state: { cours } })
      }}
    >
      <img
        alt={cours.image}
        height={'70%'}
        style={{ objectFit: 'contain' }}
        src={'http://localhost:5000/images/' + cours.image}
      />

      <Typography
        margin={'10px 20px'}
        sx={{
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          height: '50px',
          fontWeight: '800',
        }}
      >
        {cours.title}
      </Typography>
      <Typography
        margin={'0 20px'}
        sx={{
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          height: '50px',
        }}
      >
        {cours.matiere}
      </Typography>
      <Stack direction={'row'} spacing={4} justifyContent={'center'}>
        <span style={{ display: 'flex' }}>
          <VisibilityIcon htmlColor="#ffa500ad" />
          <Typography>{cours.nbView}</Typography>
        </span>
        <span style={{ display: 'flex' }}>
          <ThumbUpOffAltIcon htmlColor="#5656d9d9" />
          <Typography>
            {
              cours.listeInteraction.filter((item) => {
                return item.action === 'like'
              }).length
            }
          </Typography>
        </span>
        <span style={{ display: 'flex' }}>
          <ThumbDownOffAltIcon htmlColor="#f65d5ddb" />
          <Typography>
            {
              cours.listeInteraction.filter((item) => {
                return item.action === 'dislike'
              }).length
            }
          </Typography>
        </span>
      </Stack>
      <div
        style={{ position: 'absolute', top: '65%', background: '#ffa500ad' }}
      >
        {cours.price} TND
      </div>
    </Stack>
  )
}

export default Cours
