import React from 'react'
import { MostLiked } from './MostLiked'
import { Box, Stack } from '@mui/material'
import { MostSold } from './MostSold'

const Stat = () => {
  return (
    <Stack alignItems={'center'} direction={'row'}>
      <MostLiked />
      <MostSold />
    </Stack>
  )
}

export default Stat
