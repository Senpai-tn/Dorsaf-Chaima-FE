import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Box, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'
import actions from '../../../Redux/actions'

ChartJS.register(ArcElement, Tooltip, Legend)

export function MostSold({ labels, courses }) {
  const user = useSelector((state) => state.user)
  const d = user.listeCours.map((c) => {
    return c.listeInteraction.filter((interact) => {
      return interact.action === 'like'
    })
  })

  console.log(d)
  const data = {
    labels: user.listeCours.map((c) => {
      return c.title
    }),
    datasets: [
      {
        label: 'Sold',
        data: user.listeCours.map((c) => {
          return c.listeAchat.length
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Stack alignItems={'center'} height={'450px'} m={5} width={'50%'}>
      <Typography>Most Sold</Typography>
      <Pie
        data={data}
        style={{ height: '100%', width: '100%', position: 'relative' }}
      />
    </Stack>
  )
}
