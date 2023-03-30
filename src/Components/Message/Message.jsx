import { Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { useSelector } from 'react-redux'

const Message = ({ message }) => {
  const user = useSelector((state) => state.user)
  return (
    <div
      style={{
        borderRadius: '6px',
        fontSize: '20px',
        padding: '6px',
        marginTop: '5px',
        background: message.idSender === user._id ? '#0000ff50' : '',
      }}
    >
      {message.nomSender + ' : ' + message.message}
      <br />
      <Typography fontSize={'10px'}>
        {dayjs(message.date).format('YYYY-MM-DD HH:mm')}
      </Typography>

      <audio autoPlay hidden>
        <source src="not.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default Message
