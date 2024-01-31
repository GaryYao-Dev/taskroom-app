import * as React from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
// import { Typography } from '@mui/material'

const IconTitle = ({ icon, title, style }) => {
  return (
    <Box display={'flex'} gap={2} alignItems={'center'}>
      <div>{icon}</div>

      <div style={style}>
        <Typography variant="subtitle1">{title}</Typography>
      </div>
    </Box>
  )
}

export default IconTitle
