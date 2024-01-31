import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { TaskColumn } from '../../components/Column'
import http from '../../utils/axios'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useLocation } from 'react-router'
import { Alert, Snackbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import CreateColumn from './components/CreactColumn/CreateColumn'
import { useDispatch, useSelector } from 'react-redux'
import { updateColumnData } from '../../store/projectSlice'
import SideMenu from './components/SideMenu'
import onDragEnd from './dndOnDragEnd'
import generateBackgroundColor from './generateBackgroundColor'

const drawerWidth = 240
const HeaderSpace = styled('div')(({ theme, backgroundColor }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  backgroundColor,
}))

const ProjectBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, backgroundColor }) => ({
  overflowY: 'clip',
  overflowX: 'auto',
  display: 'flex',
  flexGrow: 1,
  backgroundColor,

  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth - 10}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  '& .columnsContainer': {
    // position: 'relative',
    // top: '64px',
    height: 'calc(100vh - 64px)',
    overflowY: 'auto',
  },
  '& .columns': {
    display: 'flex',
    padding: '10px 20px',
    height: 'fit-content',
    width: '100%',
    zIndex: 0,

    // marginTop: '64px',
    '& .column': {
      borderRadius: '12px',
      margin: '6px',
      height: '100%',
    },
  },
}))

function Project() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const projectId = location.state?.projectId
  const projectTitle = useSelector(
    (state) => state.project.projects[projectId]?.name
  )
  const customizedColor = useSelector(
    (state) => state.project.projects[projectId]?.backgroundColor
  )

  const [sideMenuOpen, setSideMenuOpen] = useState(false)
  const columnData = useSelector((state) => state.project.columnData)

  const dispatchColumnData = (data) => {
    dispatch(updateColumnData(data))
  }
  const fetchColumnData = async () => {
    dispatchColumnData([])
    try {
      const response = await http(`/projects/data/${projectId}`, {
        method: 'GET',
      })
      dispatchColumnData(response.data.columns)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchColumnData()
    setSideMenuOpen(false)
  }, [projectId])
  if (!projectId) {
    return (
      <Snackbar
        open={true}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => {
          navigate(-1)
        }}>
        <Alert severity="error">Project not found</Alert>
      </Snackbar>
    )
  }
  return (
    <Box>
      <HeaderSpace
        backgroundColor={generateBackgroundColor(projectTitle, customizedColor)}
      />
      <ProjectBox
        open={sideMenuOpen}
        backgroundColor={generateBackgroundColor(
          projectTitle,
          customizedColor
        )}>
        <SideMenu
          sideMenuOpen={sideMenuOpen}
          toggleMenu={setSideMenuOpen}
          projectId={projectId}
        />
        <Box className="columnsContainer">
          <DragDropContext
            onDragEnd={(result) =>
              onDragEnd(result, dispatchColumnData, columnData, projectId)
            }>
            <Droppable
              droppableId={projectId}
              direction="horizontal"
              type="column">
              {(provided) => (
                <Box
                  className="columns"
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {columnData.map((column, index) => (
                    <Draggable
                      key={column.id}
                      draggableId={column.id}
                      index={index}
                      type="column">
                      {(provided) => (
                        <Box
                          className="column"
                          key={column.id}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}>
                          <TaskColumn
                            column={column}
                            key={column.id}
                            projectId={projectId}
                          />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <CreateColumn
                    projectId={projectId}
                    setColumnData={dispatchColumnData}
                  />
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </ProjectBox>
    </Box>
  )
}

export default Project
