import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
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
  const [selectedImage, setSelectedImage] = useState([])
  const [coursFile, setCoursFile] = useState(null)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { handleSubmit, reset, control } = useForm({
    defaultValues:
      type === 'modifier'
        ? {
            title: cours.title,
            price: cours.price,
            image: null,
          }
        : {
            title: 'sdfgdsqfsd',
            price: '0',
            image: null,
            video:
              'https://www.youtube.com/watch?v=g6x2dZsk8dE&list=RDcLWfCkpTqII&index=15',
            matiere: '',
          },
  })

  const onPDFChange = (event) => {
    setCoursFile(event.target.files[0])
  }
  const onImageChange = (event) => {
    setSelectedImage(event.target.files)
  }

  const AddCours = (data) => {
    const { title, price, video, matiere } = data
    const idYoutube = video ? video.split('=')[1].split('&')[0] : ''
    console.log(selectedImage)
    if (type === 'ajout') {
      const formData = new FormData()

      formData.append('title', title)
      formData.append('video', idYoutube)
      formData.append('price', 257)
      formData.append('matiere', matiere)
      formData.append('idProf', user._id)
      for (let index = 0; index < selectedImage.length; index++) {
        const element = selectedImage[index]
        formData.append('images', element)
      }
      formData.append('images', coursFile)

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
        height: '500px',
        width: '350px',
        position: 'absolute',
        boxShadow: '2px 2px 20px 12px #9032329e',
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
          sx={{ position: 'absolute', top: '0', right: '0' }}
          onClick={() => {
            handleClose()
          }}
        >
          <CloseIcon color="error" />
        </IconButton>

        <Typography>
          {type === 'ajout' ? 'Ajouter' : 'Modifier'} Cours
        </Typography>

        <form onSubmit={handleSubmit(AddCours)}>
          <Stack justifyContent={'center'} width={'100%'} spacing={1}>
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

            <Controller
              name="matiere"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  label="Age"
                  onChange={onChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              )}
            />

            {type === 'ajout' && (
              <Stack>
                <label htmlFor="coursFile">Fichier du cours</label>
                <input
                  id="coursFile"
                  accept=".pdf"
                  type={'file'}
                  onChange={(event) => {
                    onPDFChange(event)
                  }}
                />
                <input
                  accept="image/png, image/jpeg"
                  type={'file'}
                  onChange={(event) => {
                    onImageChange(event)
                  }}
                />
                <Controller
                  name="video"
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
                      label="Video"
                      variant="outlined"
                    />
                  )}
                />
              </Stack>
            )}

            <Box>
              <Button
                type="reset"
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
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}

export default AjoutCours
