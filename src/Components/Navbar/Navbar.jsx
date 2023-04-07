import { Box, Stack } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import actions from '../../Redux/actions'
import Button from '../Button/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const Navbar = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
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
        height: '60px',
        width: 'calc(100vw-90px)',
        padding: '0 45px',
      }}
    >
      <img
        alt="logo"
        onClick={() => {
          navigate('/')
        }}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png"
        height={'100%'}
        width={'150px'}
        style={{ objectFit: 'contain' }}
      />

      <Box>
        {user === null ? (
          <Button
            text={"S'authentifier"}
            type={'submit'}
            onClick={() => {
              navigate('/auth')
            }}
          />
        ) : (
          <>
            <Button
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
                Profile
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
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </Stack>
  )
}

export default Navbar
