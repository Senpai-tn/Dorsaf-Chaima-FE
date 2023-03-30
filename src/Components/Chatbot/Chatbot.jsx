import {
  Box,
  Badge,
  IconButton,
  Input,
  Modal,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import ForumIcon from '@mui/icons-material/Forum'
import { useForm, Controller } from 'react-hook-form'
import socket from '../../Socket/Socket'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import './style.css'
import Message from '../Message/Message'

const Chatbot = () => {
  const [open, setOpen] = useState(false)
  const [messageTemp, setMessageTemp] = useState(null)
  const [messages, setMessages] = useState([])
  const [unseenMessage, setUnseenMessage] = useState(false)
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: { message: '' },
  })
  const user = useSelector((state) => state.user)

  useEffect(() => {
    socket.on('message_recieved', (data) => {
      setMessageTemp(data)
      setUnseenMessage(true)
    })
  }, [])

  useEffect(() => {
    if (messageTemp !== null) {
      setMessages([...messages, messageTemp])
    }
  }, [messageTemp])

  useEffect(() => {
    var out = document.getElementById('listMessages')
    out && (out.scrollTop = out.scrollHeight)
  }, [messages])

  return (
    user.role !== 'ADMIN' && (
      <Box>
        <IconButton
          onClick={() => {
            setOpen(!open)
            setUnseenMessage(false)
          }}
          aria-label="delete"
          sx={{ position: 'fixed', bottom: '30px', right: '30px' }}
        >
          <Badge
            badgeContent={'*'}
            sx={{
              color: 'red',
              span: {
                fontSize: unseenMessage && open === false ? '40px' : '0',
              },
            }}
          >
            <ForumIcon fontSize="large" htmlColor="orange" />
          </Badge>
        </IconButton>

        <Modal
          open={open}
          onClose={() => {
            setOpen(false)
          }}
          hideBackdrop={true}
          sx={{
            position: 'fixed',
            right: '30px',
            bgcolor: 'white',
            height: '350px',
            width: '350px',
            top: window.innerHeight - 480,
            left: window.innerWidth - 420,
            border: '5px solid #ce4914b3',
            borderRadius: '20px',
            padding: '20px',
          }}
        >
          <>
            <Typography textAlign={'center'}>Contact</Typography>
            <Stack direction={'column'} spacing={1}>
              <Box
                id="listMessages"
                height={'300px'}
                overflow={'auto'}
                sx={{ overflowX: 'hidden' }}
              >
                {messages.map((message, index) => {
                  return <Message key={index} message={message} />
                })}
              </Box>
              <Controller
                name="message"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    placeholder="Type in here…"
                    value={value}
                    onChange={onChange}
                    sx={{ width: '350px', right: '24px' }}
                    onKeyDown={(event) => {
                      if (event.keyCode === 13) {
                        socket.emit('send_message', {
                          idSender: user._id,
                          nomSender: user.prenom + ' ' + user.nom,
                          message: value,
                          idReciever: [],
                        })
                        onChange('')
                      }
                    }}
                  />
                )}
              />
            </Stack>
          </>
        </Modal>
      </Box>
    )
  )
}

export default Chatbot
