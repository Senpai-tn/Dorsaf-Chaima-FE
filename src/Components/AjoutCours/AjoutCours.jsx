import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../Redux/actions'

const AjoutCours = ({
  open,
  handleClose,
  listCours,
  setListCours,
  type,
  cours,
  setCours,
}) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { handleSubmit, reset, control, register } = useForm({
    defaultValues:
      type === 'ajout'
        ? { title: '', price: '0', image: null }
        : type === 'modifier'
        ? {
            title: cours.title,
            price: cours.price,
            image: null,
          }
        : {},
  })
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0])
    console.log(event.target.files[0])
  }

  const AddCours = (data) => {
    const { title, price, image } = data

    if (type === 'ajout') {
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('title', title)
      formData.append('price', parseInt(price))
      formData.append('idProf', user._id)
      console.log(formData.get('image'))
      axios
        .post('http://127.0.0.1:5000/cours', formData)
        .then((response) => {
          setListCours([...listCours, response.data.cours])
          dispatch({ type: actions.addCours, user: response.data.user })
          localStorage.setItem('user', JSON.stringify(response.data.user))
          reset()
          handleClose()
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      axios
        .put('http://127.0.0.1:5000/cours', {
          title,
          price,
          idCours: cours._id,
        })
        .then((response) => {
          setCours(response.data.cours)
          localStorage.setItem('user', JSON.stringify(response.data.user))
          dispatch({ type: actions.updateCours, user: response.data.user })
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
      title: type === 'modifier' ? cours.title : '',
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
              name="title"
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

            {type === 'ajout' && (
              <input
                type={'file'}
                onChange={(event) => {
                  onFileChange(event)
                }}
              />
            )}

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
