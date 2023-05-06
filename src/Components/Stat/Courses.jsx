import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Box } from '@mui/material'
import actions from '../../Redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import dayjs from 'dayjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
}

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const Courses = () => {
  const dispatch = useDispatch()
  const courses = useSelector((state) => state.courses)
  const getCourses = () => {
    axios
      .get(process.env.REACT_APP_URL_BACKEND + 'admin/courses')
      .then((response) => {
        dispatch({ type: actions.getCourses, courses: response.data })
      })
  }

  const achat = []
  courses.map((c) => {
    c.listeAchat.map((a) => {
      achat.push(a)
      console.log(dayjs(a.date).year())
    })
  })

  console.log('achat', achat)

  const data = {
    labels,
    datasets: [
      {
        label: 'Cours',
        data: labels.map(
          (label, index) =>
            courses.filter((c) => {
              return (
                dayjs(c.createdAt).month() === index &&
                dayjs(c.createdAt).year() === dayjs(new Date()).year()
              )
            }).length
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Achat',
        data: labels.map(
          (label, index) =>
            achat.filter((a) => {
              return (
                dayjs(a.date).month() === index &&
                dayjs(a.date).year() === dayjs().year()
              )
            }).length
        ),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  useEffect(() => {
    getCourses()
  }, [])

  return (
    <Box height={'450px'} m={5} textAlign={'center'}>
      <Bar
        options={options}
        data={data}
        style={{ height: '100%', width: '100%', position: 'relative' }}
      />
    </Box>
  )
}

export default Courses
