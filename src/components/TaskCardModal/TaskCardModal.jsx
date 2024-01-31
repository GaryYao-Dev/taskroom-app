import * as React from 'react'
import Container from '@mui/material/Container'
import ModalHeader from './components/ModalHeader'
import TaskCardDetails from './components/TaskCardDetails'
import { createPortal } from 'react-dom'
import http from '../../utils/axios'

const TaskCardModal = ({ onClose, task, setState }) => {
  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const modalStyle = {
    width: '750px',
    backgroundColor: 'white',
    borderRadius: '0.25rem',
    zIndex: 1000,
  }
  const [taskData, setTaskData] = React.useState(null)

  const fetchTaskData = async () => {
    try {
      const response = await http(`/tasks/${task.id}`, {
        method: 'GET',
      })
      setTaskData(response.data)
      console.log('taskData:', taskData)
      console.log('task:', task)
    } catch (err) {
      console.log(err)
    }
  }

  React.useEffect(() => {
    fetchTaskData()
  }, [task.id])

  if (!taskData) return null

  return createPortal(
    <div style={backgroundStyle}>
      <div style={modalStyle}>
        <Container
          style={{
            padding: '0px 0px 30px 0px',
          }}
          sx={{
            width: 750,
            height: 600,
            borderRadius: '8px',
            backgroundColor: '#091E420F',
            overflow: 'hidden',
          }}>
          <Container
            style={{ padding: '20px 30px 0px 30px' }}
            sx={{
              height: '10%',
            }}>
            <ModalHeader onClose={onClose} task={taskData} />
          </Container>
          <Container
            style={{ padding: '20px 0px 0px 30px', marginTop: '20px' }}
            sx={{
              height: '10%',
            }}>
            <TaskCardDetails task={taskData} setState={setState} />
          </Container>
        </Container>
      </div>
    </div>,
    document.body
  )
}

export default TaskCardModal
