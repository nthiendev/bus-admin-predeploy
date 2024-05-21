import { Box, BoxProps, CircularProgress } from '@mui/material'
import React from 'react'

export default function LoadingElement({ sx, ...props }: BoxProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        ...sx,
      }}
    >
      <CircularProgress />
    </Box>
  )
}
