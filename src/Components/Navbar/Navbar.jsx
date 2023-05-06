import {
  Box,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import actions from '../../Redux/actions'
import Button from '../Button/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'

const Navbar = () => {
  const { t, i18n } = useTranslation(['button'])
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const searchCours = (event) => {
    dispatch({ type: actions.search_cours, matiere: event.target.value })
  }
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      sx={{
        bgcolor:
          user === null
            ? '#325698'
            : user.role === 'PROF'
            ? '#1E90FF'
            : user.role === 'ETUDIANT'
            ? 'orange'
            : 'black',
        height: '90px',
        width: 'calc(100vw-90px)',
        padding: '0 45px',
      }}
    >
      <img
        alt="logo"
        onClick={() => {
          navigate('/')
        }}
        src="./logo.png"
        height={'100%'}
        width={'150px'}
        style={{ objectFit: 'contain' }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <SearchIcon
          fontSize="large"
          sx={{
            color: 'action.active',
            mr: 1,
            my: 0.5,
            transform: 'scale(1.8)',
          }}
        />
        <TextField
          id="input-with-sx"
          label="Search"
          variant="filled"
          onChange={(event) => {
            searchCours(event)
          }}
        />
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        {i18n.language !== 'fr' && (
          <img
            alt="fr"
            onClick={() => {
              i18n.changeLanguage('fr')
            }}
            src="./fr.png"
            height={'100%'}
            width={'40px'}
            style={{ objectFit: 'contain', marginRight: '10px' }}
          />
        )}
        {i18n.language !== 'en' && (
          <img
            alt="en"
            onClick={() => {
              i18n.changeLanguage('en')
            }}
            src="./en.png"
            height={'100%'}
            width={'40px'}
            style={{ objectFit: 'contain', marginRight: '10px' }}
          />
        )}

        {user === null ? (
          <Button
            text={t('sauthenticate')}
            type={'submit'}
            onClick={() => {
              navigate('/auth')
            }}
          />
        ) : (
          <>
            <Button
              type={'reset'}
              onClick={(event) => {
                setAnchorEl(event.currentTarget)
              }}
              text={`${user.nom} ${user.prenom}`}
            />

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate('/Profile')
                  setAnchorEl(null)
                }}
              >
                {t('button:profile')}
              </MenuItem>
              <MenuItem
                sx={{ color: 'red' }}
                onClick={() => {
                  dispatch({ type: actions.logout })
                  localStorage.setItem('user', null)
                  navigate('/')
                  setAnchorEl(null)
                }}
              >
                {t('button:logout')}
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </Stack>
  )
}

export default Navbar
