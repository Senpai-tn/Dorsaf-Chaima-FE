import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { Button, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'

const ListCourses = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL_BACKEND + 'admin/courses')
      .then((response) => {
        var array = response.data
        array = array.map((item) => {
          return {
            ...item,
            id: item._id,
            deletedAt: item.deletedAt
              ? dayjs(item.deletedAt).format('YYYY-MM-DD HH:mm')
              : null,
          }
        })

        setCourses(array)
      })
  }, [])

  const restoreCours = (cours) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: cours.deletedAt === null ? 'error' : 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${
        cours.deletedAt === null ? 'delete' : 'restore'
      } it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(process.env.REACT_APP_URL_BACKEND + 'admin/restore_cours', {
            idCours: cours._id,
          })
          .then((response) => {
            console.log(response.data)
            setCourses(response.data)
          })
      }
    })
  }

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 500,
    },
    { field: '_id', headerName: 'ID' },
    { field: 'price', headerName: 'Price' },
    { field: 'nbView', headerName: 'Views', width: 100 },
    { field: 'deletedAt', headerName: 'DeletedAt', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => {
        return params.row.deletedAt !== null ? (
          <Stack direction={'row'} spacing={3}>
            <Typography>Deleted</Typography>
            <Button
              color="info"
              variant="contained"
              onClick={() => {
                restoreCours(params.row)
              }}
            >
              Restore
            </Button>
          </Stack>
        ) : (
          <Stack direction={'row'} spacing={6}>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                restoreCours(params.row)
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
      <DataGrid
        rows={courses}
        getRowId={(row) => row._id}
        columns={columns}
        initialState={{
          columns: {
            columnVisibilityModel: {
              deleted: false,
              _id: false,
            },
          },
        }}
      />
    </div>
  )
}

export default ListCourses
