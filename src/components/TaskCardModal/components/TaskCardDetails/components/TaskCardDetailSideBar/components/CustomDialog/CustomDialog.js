import * as React from 'react'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import DeleteButton from '../../../../../../../DeleteButton'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import MyIconButton from '../MyIconButton/IconButton'
import http from '../../../../../../../../utils/axios'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../../../../../../../../store/projectSlice'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const CustomizedDialog = ({ task, setState }) => {
  const dispatch = useDispatch()
  const handleDeleteTask = async (task) => {
    await http(`/tasks/${task.id}`, {
      method: 'DELETE',
      data: { task: task },
    })
    dispatch(deleteTask({ columnId: task.parent_column, taskId: task.id }))
  }
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    console.log(task)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setState(() => {})
  }
  const handleDeleteClose = () => {
    setOpen(false)
    setState(() => {})
    handleDeleteTask(task)
  }

  return (
    <div>
      <MyIconButton
        onClick={handleClickOpen}
        type="danger"
        icon={<ArchiveOutlinedIcon sx={{ fontSize: '20px' }} />}
        text="Delete"
      />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Delete card?
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Typography>
            All actions will be removed from the activity feed and you won’t be
            able to re-open the card. There is no undo.
          </Typography>
        </DialogContent>
        <DialogActions>
          <DeleteButton onClick={handleDeleteClose}>Delete</DeleteButton>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
export default CustomizedDialog
