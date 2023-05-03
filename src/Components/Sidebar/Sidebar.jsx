import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Sidebar = ({ cible, setCible }) => {
  const { t } = useTranslation(['content'])
  return (
    <Stack
      width={'200px'}
      minWidth={'200px'}
      minHeight={'calc(100vh - 90px)'}
      sx={{
        bgcolor: 'black',
        color: 'white',
        textAlign: 'center',
        paddingTop: '10px',
      }}
      spacing={3}
      justifyContent={'flex-start'}
    >
      <Typography
        onClick={() => {
          setCible('stat')
        }}
      >
        {t('stat')}
      </Typography>
      <Typography
        onClick={() => {
          setCible('users')
        }}
      >
        {t('users')}
      </Typography>
      <Typography
        onClick={() => {
          setCible('courses')
        }}
      >
        {t('courses')}
      </Typography>
    </Stack>
  )
}

export default Sidebar
