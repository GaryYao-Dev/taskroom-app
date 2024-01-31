import * as React from 'react'
import IconButton from './components/MyIconButton'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ReplayIcon from '@mui/icons-material/Replay'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import { Typography } from '@mui/material'
import CustomDialog from './components/CustomDialog'

const TaskCardDetailSideBar = ({ task, setState }) => {
  const [showDeleteButton, setShowDeleteButton] = React.useState(false)
  const handleArchiveClick = () => {
    setShowDeleteButton(true)
  }

  const handleSendToBoardClick = () => {
    setShowDeleteButton(false)
  }
  return (
    <>
      <Typography style={{ fontSize: '12px' }}>Add to card</Typography>
      <IconButton
        icon={<PersonOutlineOutlinedIcon sx={{ fontSize: '20px' }} />}
        text="Members"
      />
      <IconButton
        icon={<AccessTimeIcon sx={{ fontSize: '20px' }} />}
        text="Dates"
      />
      <Typography style={{ fontSize: '12px', marginTop: '20px' }}>
        Actions
      </Typography>
      <IconButton
        icon={<ArrowForwardIcon sx={{ fontSize: '20px' }} />}
        text="Move"
      />
      <IconButton
        icon={<ContentCopyOutlinedIcon sx={{ fontSize: '20px' }} />}
        text="Copy"
      />
      {showDeleteButton ? (
        <>
          <CustomDialog task={task} setState={setState} />
          <IconButton
            onClick={handleSendToBoardClick}
            icon={<ReplayIcon sx={{ fontSize: '20px' }} />}
            text="Send to board"
          />
        </>
      ) : (
        <div>
          <IconButton
            onClick={handleArchiveClick}
            icon={<ArchiveOutlinedIcon sx={{ fontSize: '20px' }} />}
            text="Archive"
          />
        </div>
      )}
    </>
  )
}
export default TaskCardDetailSideBar
