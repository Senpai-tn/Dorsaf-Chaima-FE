import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { Button, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'

const ListCourses = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/admin/courses').then((response) => {
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

  const restoreCours = (idCours) => {
    axios
      .put('http://127.0.0.1:5000/admin/restore_cours', {
        idCours,
      })
      .then((response) => {
        console.log(response.data)
        setCourses(response.data)
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
                restoreCours(params.row._id)
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
                restoreCours(params.row._id)
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
