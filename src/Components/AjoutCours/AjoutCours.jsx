import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close'

const AjoutCours = ({
  open,
  handleClose,
  listCours,
  setListCours,
  type,
  cours,
}) => {
  const { handleSubmit, reset, control } = useForm({
    defaultValues:
      type === 'ajout'
        ? { nom: '', price: '0' }
        : type === 'modifier'
        ? {
            nom: '',
            price: '',
          }
        : {},
  })

  const AddCours = (data) => {
    const { nom, price } = data
    if (type === 'ajout') {
      axios
        .post('http://127.0.0.1:5000/cours', { nom, price: parseInt(price) })
        .then((response) => {
          setListCours([...listCours, response.data])
          reset()
          handleClose()
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      axios
        .put('http://127.0.0.1:5000/cours', {
          cours: { ...cours, nom, price: parseInt(price) },
        })
        .then((response) => {
          var temporary = [...listCours]
          temporary = temporary.map((tempCours) => {
            return cours._id === tempCours._id ? response.data : tempCours
          })
          setListCours(temporary)
          reset()
          handleClose()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    reset({
      nom: type === 'modifier' ? cours.nom : '',
      price: type === 'modifier' ? cours.price : '',
    })
  }, [cours])

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
          onClick={() => {
            handleClose()
          }}
        >
          <CloseIcon color="error" />
        </IconButton>

        <Typography>
          {type === 'ajout' ? 'Ajouter' : 'Modifier'} Cours
        </Typography>
        <Box justifyContent={'center'} width={'100%'}>
          <form onSubmit={handleSubmit(AddCours)}>
            <Controller
              name="nom"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error && error.message}
                  id="outlined-basic"
                  label="Nom"
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  value={value}
                  type={'number'}
                  onChange={onChange}
                  error={!!error}
                  helperText={error && error.message}
                  id="outlined-basic"
                  label="Price"
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
                {type === 'ajout' ? 'Ajouter' : 'Modifier'}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  )
}

export default AjoutCours
