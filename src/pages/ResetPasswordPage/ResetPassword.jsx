import React, { useState } from 'react'
import { Box, Container, Alert, Snackbar } from '@mui/material'

const ResetPassword = () => {
  const [emailSentAlertOpen, setEmailSentAlertOpen] = useState(false)

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#ffffff">
      <Snackbar
        open={emailSentAlertOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={() => setEmailSentAlertOpen(false)}>
        <Alert severity={'error'}>
          Your email address hasn&apos;t been verified. <br />
          Please click the button below and verify through the link sent to your
          email
        </Alert>
      </Snackbar>
      <Container
        maxWidth="sm"
        sx={{
          borderRadius: '3px',
          padding: '25px 40px',
          boxShadow: 'rgba(0,0,0,0.1) 0 0 10px',
        }}>
        <form></form>
      </Container>
    </Box>
  )
}

export default ResetPassword
