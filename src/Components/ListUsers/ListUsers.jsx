import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import dayjs from 'dayjs'
import { Button, Stack, Typography } from '@mui/material'
import ModalBlock from '../ModalBlock/ModalBlock'

const ListUsers = () => {
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState('')
  const [role, setRole] = useState('')
  const [open, setOpen] = useState(false)
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/admin/users').then((response) => {
      var array = response.data
      array = array.map((item) => {
        return {
          ...item,
          id: item._id,
          dateN: dayjs(item.dateN).format('YYYY-MM-DD'),
        }
      })

      setUsers(array)
    })
  }, [])

  const deleteUser = (userId, role) => {
    role !== 'ADMIN'
      ? axios
          .delete('http://127.0.0.1:5000/admin/delete_user', {
            data: { userId, role },
          })
          .then((response) => {
            setUsers(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      : axios
          .delete('http://127.0.0.1:5000/admin/delete_admin', {
            data: { adminId: userId },
          })
          .then((response) => {
            setUsers(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
  }

  const changeRole = (userId, role) => {
    axios
      .put('http://127.0.0.1:5000/admin/change_role', { userId, role })
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const debloquer = (userId, role) => {
    axios
      .post('http://127.0.0.1:5000/admin/block', {
        userId,
        role,
        date: null,
      })
      .then((response) => {
        setUsers(response.data)
      })
  }

  const columns = [
    { field: '_id', headerName: 'Cin' },
    { field: 'cin', headerName: 'Cin' },
    { field: 'nom', headerName: 'Nom' },
    { field: 'prenom', headerName: 'Prénom' },
    { field: 'role', headerName: 'Role' },
    {
      field: 'blocked',
      headerName: 'blocked',
      width: 200,
      renderCell: (params) => {
        return (
          <Typography>
            {params.row.blocked
              ? dayjs(params.row.blocked).format('YYYY-MM-DD')
              : ''}
          </Typography>
        )
      },
    },
    {
      field: 'deleted',
      headerName: 'Role',
    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => {
        return params.row.deleted !== null ? (
          <Stack direction={'row'} spacing={3}>
            <Typography>Deleted</Typography>
            <Button
              color="info"
              variant="contained"
              onClick={() => {
                deleteUser(params.row._id, params.row.role)
              }}
            >
              Restore
            </Button>
          </Stack>
        ) : (
          <Stack direction={'row'} spacing={1}>
            {params.row.blocked === null ? (
              <Button
                color="warning"
                variant="contained"
                onClick={() => {
                  setOpen(true)
                  setRole(params.row.role)
                  setUserId(params.row._id)
                }}
              >
                Bloquer
              </Button>
            ) : (
              <Button
                color="warning"
                variant="contained"
                onClick={() => {
                  debloquer(params.row._id, params.row.role)
                }}
              >
                Débloquer
              </Button>
            )}
            {params.row.role === 'PROF' ? (
              <Button
                color="success"
                variant="contained"
                onClick={() => {
                  changeRole(params.row._id, params.row.role)
                }}
              >
                Promovoir Admin
              </Button>
            ) : null}
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                deleteUser(params.row._id, params.row.role)
              }}
            >
              Delete
            </Button>
          </Stack>
        )
      },
    },
  ]

  return (
    <div style={{ width: '100%' }}>
      <ModalBlock
        setUsers={setUsers}
        userId={userId}
        role={role}
        open={open}
        handleClose={() => {
          setOpen(false)
        }}
      />
      <DataGrid
        initialState={{
          columns: {
            columnVisibilityModel: {
              deleted: false,
              _id: false,
              // blocked: false,
            },
          },
        }}
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
      />
    </div>
  )
}

export default ListUsers
