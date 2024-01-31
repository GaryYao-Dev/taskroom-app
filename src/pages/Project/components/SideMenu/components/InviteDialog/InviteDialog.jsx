import React from 'react'
import {
  Box,
  Typography,
  Dialog,
  Button,
  IconButton,
  Tooltip,
  styled,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CloseIcon from '@mui/icons-material/Close'
import http from '../../../../../../utils/axios'

const CustomDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    width: '500px',
    padding: '10px 10px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '& .buttonContainer': {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  '& .MuiButton-root': {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  '& .content': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}))

const InviteDialog = ({ open, projectId, onClose }) => {
  const [toolTipTitle, setToolTipTitle] = React.useState('Copy Invite Link')

  const getInviteLink = async () => {
    const {
      data: { inviteLink },
    } = await http(`/projects/invite/${projectId}`)
    navigator.clipboard.writeText(inviteLink)
    setToolTipTitle('Copied!')
    setTimeout(() => {
      setToolTipTitle('Copy Invite Link')
    }, 5000)
  }

  return (
    <CustomDialog open={open} onClose={onClose}>
      <Box className="buttonContainer">
        <Button onClick={onClose}>
          <CloseIcon fontSize="small" color="disabled" />
        </Button>
      </Box>
      <Box className="content">
        <Typography>
          Click the copy button, and share the link with your memebers
        </Typography>

        <Tooltip title={toolTipTitle}>
          <IconButton onClick={getInviteLink}>
            <ContentCopyIcon color="info" />
          </IconButton>
        </Tooltip>
      </Box>
    </CustomDialog>
  )
}

export default InviteDialog
