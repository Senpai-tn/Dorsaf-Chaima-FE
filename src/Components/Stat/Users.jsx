import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Box } from '@mui/material'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../Redux/actions'
import { useEffect } from 'react'

ChartJS.register(ArcElement, Tooltip, Legend)

export function Users() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const getUsers = () => {
    axios
      .get(process.env.REACT_APP_URL_BACKEND + 'admin/users')
      .then((response) => {
        dispatch({ type: actions.getUsers, users: response.data })
      })
  }
  const data = {
    labels: ['Super Admins', 'Admins', 'Prof', 'Etudiants'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          users.filter((u) => {
            return u.role === 'SUPER_ADMIN'
          }).length,
          users.filter((u) => {
            return u.role === 'ADMIN'
          }).length,
          users.filter((u) => {
            return u.role === 'PROF'
          }).length,
          users.filter((u) => {
            return u.role === 'ETUDIANT'
          }).length,
        ],
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

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <Box height={'450px'} m={5} textAlign={'center'}>
      <Pie
        data={data}
        style={{ height: '100%', width: '100%', position: 'relative' }}
      />
    </Box>
  )
}
