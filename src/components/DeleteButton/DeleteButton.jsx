import * as React from 'react'
import Button from '@mui/material/Button'

const DeleteButton = ({ children, icon, onClick }) => {
  return (
    <>
      <Button
        onClick={onClick}
        variant="contained"
        startIcon={icon}
        sx={{
          width: '100%',
          backgroundColor: '#ca3521',
          boxShadow: 'none',
          textTransform: 'none',
          justifyContent: 'center',
          '&:hover': {
            backgroundColor: '#AE2A19',
            boxShadow: 'none',
          },
          '&:press': {
            backgroundColor: '#601E16',
            boxShadow: 'none',
          },
        }}>
        {children}
      </Button>
    </>
  )
}

export default DeleteButton
