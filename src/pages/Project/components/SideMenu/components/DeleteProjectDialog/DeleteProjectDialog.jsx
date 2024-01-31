import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
} from '@mui/material'
import { styled } from '@mui/material'
import http from '../../../../../../utils/axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const FormContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& .cancelButton': {
    color: 'grey',
  },
}))

const alertMessage = {
  duration: 3,
  severity: 'success',
  message: 'Project deleted successfully',
}

const DeleteProjectDialog = ({ open, onClose, projectId }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [alertOpen, setAlertOpen] = React.useState(false)
  const [deleteButtonDisabled, setDeleteButtonDisabled] = React.useState(false)

  const handleAlertClose = () => {
    dispatch({
      type: 'project/deleteProject',
      payload: projectId,
    })
    dispatch(
      {
        type: 'auth/deleteProject',
        payload: projectId,
      }
    )
    setAlertOpen(false)
    navigate('/')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setDeleteButtonDisabled(true)
      const res = await http(`/projects/${projectId}`, {
        method: 'DELETE',
      })

      console.log(res)
      if (res.status === 200) {
        setAlertOpen(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Project</DialogTitle>
      <DialogContent>
        <Typography>
          Deleting a project will result in all data in this project deleted,
          including columns and tasks
        </Typography>
        <FormContainer>
          <Typography sx={{ color: 'red' }}>
            Are you sure you want to delete this project?
          </Typography>
          <form onSubmit={onSubmit}>
            <Button type="submit" variant="contained" color="error" disabled={deleteButtonDisabled}>
              Delete
            </Button>
            <Button onClick={onClose} className="cancelButton">
              Cancel
            </Button>
          </form>
        </FormContainer>
      </DialogContent>
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={alertMessage.duration * 1000}
        onClose={handleAlertClose}>
        <Alert severity={alertMessage.severity}>{alertMessage.message}</Alert>
      </Snackbar>
    </Dialog>
  )
}

export default DeleteProjectDialog
