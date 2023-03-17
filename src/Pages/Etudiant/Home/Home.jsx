import { Stack } from '@mui/material'
import React from 'react'
import Cours from '../../../Components/Cours/Cours'
import socket from '../../../Socket/Socket'

const Home = () => {
  return (
    <Stack direction={'row'} spacing={5} paddingTop={'15px'}>
      <Cours
        title={'CSS'}
        nbView={10}
        nbDislike={3}
        nbLike={4}
        price={60}
        image={
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png'
        }
      />
      <Cours
        title={'JS'}
        nbView={110}
        nbDislike={15}
        nbLike={17}
        price={870}
        image={
          'https://static.javatpoint.com/images/javascript/javascript_logo.png'
        }
      />
    </Stack>
  )
}

export default Home
