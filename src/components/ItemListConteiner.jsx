import { Box } from '@mui/material'
import React from 'react'

export default function ItemListConteiner({greeting}) {
  return (
    <>
        <Box sx={{ color: 'primary.main' }}>
            <h2>Bienvenido {greeting}</h2>         
            
        </Box>
    </>
  )
}
