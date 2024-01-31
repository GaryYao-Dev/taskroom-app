import * as React from 'react'
import Grid from '@mui/material/Grid'
import DvrIcon from '@mui/icons-material/Dvr'
// import NakedTextField from '../../../NakedTextField'
import IconTitle from '../IconTitle'
import ClearIcon from '@mui/icons-material/Clear'
import { Typography } from '@mui/material'
import EditableText from '../../../EditableText'
import { useDispatch, useSelector } from 'react-redux'
import { updateTaskTitle } from '../../../../store/projectSlice'

const ModalHeader = ({ onClose, task }) => {
  const titleValidation = {
    required: true,
    min: 3,
    max: 30,
    name: 'Task Title',
  }
  const [title, setTitle] = React.useState(task.title)

  const dispatch = useDispatch()
  const columnArray = useSelector((state) => state.project.columnData)
  const columnData = columnArray.find(
    (column) => column.id === task.parent_column
  )
  const onTitleChange = (update) => {
    dispatch(
      updateTaskTitle({
        columnId: task.parent_column,
        taskId: task.id,
        title: update,
      })
    )
    setTitle(update)
  }

  const submitHttpConfig = {
    endPoint: `/tasks/${task.id}`,
    data: { title: undefined },
    method: 'PATCH',
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <span>
          <Grid
            container
            direction="row"
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Grid item>
              <IconTitle
                icon={<DvrIcon sx={{ fontSize: '20px' }} />}
                title={
                  <EditableText
                    state={title}
                    submitHttpConfig={submitHttpConfig}
                    setState={onTitleChange}
                    validation={titleValidation}
                  />
                }
                style={{ width: '600px' }}
              />
            </Grid>
            <Grid item>
              <ClearIcon
                sx={{
                  fontSize: '20px',
                  cursor: 'pointer',
                  '&:hover': {
                    background: '#091E420F',
                    borderRadius: '50%',
                  },
                }}
                onClick={onClose}
              />
            </Grid>
          </Grid>
        </span>
      </Grid>
      <Grid item>
        <Typography
          sx={{ display: 'inline' }}
          style={{ marginLeft: '38px', fontSize: '14px', color: '#44546f' }}>
          in list&nbsp;
        </Typography>
        <Typography
          sx={{ textDecoration: 'underline', fontSize: '14px' }}
          display="inline">
          {columnData?.name}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default ModalHeader
