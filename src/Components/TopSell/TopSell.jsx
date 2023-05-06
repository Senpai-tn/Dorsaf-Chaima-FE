import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const TopSell = ({ courses }) => {
  const navigate = useNavigate()
  return (
    <>
      <Typography sx={{ textAlign: 'center', fontWeight: 900 }}>
        Top Sell
      </Typography>
      <Stack
        overflow={'hidden'}
        sx={{ flexWrap: 'wrap', height: '150px', my: '50px' }}
      >
        {courses
          .sort((a, b) => {
            return a.listeAchat.length > b.listeAchat.length ? -1 : 1
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

export default TopSell
