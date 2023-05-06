import { Stack, Typography } from '@mui/material'
import React from 'react'
import Cours from '../Cours/Cours'
import { useNavigate } from 'react-router-dom'

const TopLiked = ({ courses }) => {
  const navigate = useNavigate()
  return (
    <>
      <Typography sx={{ textAlign: 'center', fontWeight: 900 }}>
        Top Liked
      </Typography>
      <Stack
        overflow={'hidden'}
        sx={{ flexWrap: 'wrap', height: '150px', my: '50px' }}
      >
        {courses
          .sort((a, b) => {
            return a.listeInteraction.filter((interact) => {
              return interact.action === 'like'
            }).length >
              b.listeInteraction.filter((interact) => {
                return interact.action === 'like'
              }).length
              ? -1
              : 1
          })
          .map((c) => {
            return (
              <Typography
                sx={{
                  color: 'blue',
                  fontSize: '18px',
                  cursor: 'pointer',
                  width: '150px',
                }}
                onClick={() => {
                  navigate('/cours', { state: { cours: c } })
                }}
              >
                {c.title}
              </Typography>
            )
          })}
      </Stack>
    </>
  )
}

export default TopLiked
