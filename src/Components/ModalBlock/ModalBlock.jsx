import { Box, Button, IconButton, Modal, TextField } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close'
import dayjs from 'dayjs'
import axios from 'axios'

const ModalBlock = ({ open, handleClose, userId, role, setUsers }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { duree: 0 },
  })

  const blockUser = (data) => {
    const { duree } = data
    axios
      .post('http://127.0.0.1:5000/admin/block', {
        userId,
        date: dayjs().add(parseInt(duree), 'days'),
        role,
      })
      .then((response) => {
        handleClose()
        setUsers(response.data)
      })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      hideBackdrop={true}
      sx={{
        bgcolor: 'white',
        height: '350px',
        width: '350px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        boxShadow: '2px 2px 20px 12px #9032329e',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        height={'100%'}
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <IconButton
          sx={{ position: 'absolute', top: '0', right: '0' }}
          onClick={() => {
            handleClose()
          }}
        >
          <CloseIcon fontSize="large" color="error" />
        </IconButton>

        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          width={'100%'}
        >
          <form onSubmit={handleSubmit(blockUser)}>
            <Controller
              name="duree"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  type={'number'}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error && error.message}
                  id="outlined-basic"
                  label="Durée ( en jours )"
                  variant="outlined"
                />
              )}
            />

            <Box>
              <Button
                variant="outlined"
                color="warning"
                onClick={() => {
                  reset()
                }}
              >
                Reset
              </Button>
              <Button variant="outlined" color="success" type={'submit'}>
                Bloquer
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalBlock
