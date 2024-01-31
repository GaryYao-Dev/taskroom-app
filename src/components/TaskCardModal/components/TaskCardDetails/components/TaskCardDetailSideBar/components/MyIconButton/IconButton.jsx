import * as React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

const MyIconButton = ({ icon, text, onClick, type }) => {
  const backgroundColor = type === 'danger' ? '#ca3521' : '#091E420F'
  const hoverBackgroundColor = type === 'danger' ? '#AE2A19' : '#091E4224'
  const selectBackgroundColor = type === 'danger' ? '#601E16' : '#091E424F'
  const fontColor = type === 'danger' ? '#FFFFFF' : '#172B4D'
  return (
    <Button
      onClick={onClick}
      variant="contained"
      style={{
        marginTop: '10px',
        padding: '8px 0px 8px 10px',
        boxShadow: 'none',
        textTransform: 'none',
      }}
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        width: '80%',
        color: fontColor,
        backgroundColor: backgroundColor,
        fontSize: '14px',
        ':hover': {
          backgroundColor: hoverBackgroundColor,
        },
        ':select': { backgroundColor: selectBackgroundColor },
      }}>
      <Box display={'flex'} gap={1} alignItems={'center'}>
        {icon}
        <div>
          <Typography sx={{ fontSize: '14px' }}>{text}</Typography>
        </div>
      </Box>
    </Button>
  )
}

export default MyIconButton
