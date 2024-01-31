import React from 'react'
import http from '../../utils/axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Snackbar } from '@mui/material'

const JoinProjectPage = () => {
  const { token } = useParams()
  const navigate = useNavigate()

  const [alertOpen, setAlertOpen] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState({
    message: '',
    severity: 'info',
    duration: 0,
  })

  const joinProject = async () => {
    try {
      const res = await http('/projects/join', {
        method: 'POST',
        data: { token },
      })

      if (res.status === 208) {
        console.log(res.data)
        setAlertOpen(true)
        setAlertMessage({
          message: `${res.data.message}. Redirecting...`,
          severity: 'warning',
          duration: 5,
        })
        setTimeout(() => {
          navigate(`/project`, {
            state: {
              projectId: res.data.projectId,
              projectTitle: res.data.projectTitle,
            },
          })
        }, 5000)
        return
      }

      if (res.status === 200) {
        setAlertOpen(true)
        setAlertMessage({
          message: `You've joined the project successfully. Redirecting...`,
          severity: 'success',
          duration: 3,
        })

        setTimeout(() => {
          navigate(`/project`, {
            state: {
              projectId: res.data.projectId,
              projectTitle: res.data.projectTitle,
            },
          })
        }, 3000)
        return
      }

      throw new Error('Something went wrong')
    } catch (err) {
      if (err.response.status === 401) {
        setAlertOpen(true)
        setAlertMessage({
          message: `You need to login first. Redirecting...`,
          severity: 'error',
          duration: 5,
        })
        setTimeout(() => {
          navigate('/login')
        }, 5000)
        return
      }
    }
  }

  React.useEffect(() => {
    joinProject()
  }, [])

  return (
    <Snackbar
      open={alertOpen}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={alertMessage.duration * 1000}
      onClose={() => setAlertOpen(false)}>
      <Alert severity={alertMessage.severity}>{alertMessage.message}</Alert>
    </Snackbar>
  )
}

export default JoinProjectPage
