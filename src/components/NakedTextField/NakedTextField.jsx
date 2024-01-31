import * as React from 'react'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'

const NakedTextField = ({ fontSize, sx, style, value, onChange }) => {
  return (
    <Typography>
      <TextField
        value={value}
        onChange={onChange}
        sx={sx}
        variant="standard"
        style={style}
        multiline
        maxRows={2}
        InputProps={{ disableUnderline: true, style: { fontSize } }}
      />
    </Typography>
  )
}
export default NakedTextField
