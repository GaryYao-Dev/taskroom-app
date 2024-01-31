import React from 'react'
import { Box, Card, Typography } from '@mui/material'
import StyledBox from './components/StyledBox'
import { useNavigate } from 'react-router'

const ProjectCard = ({ project }) => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/project', { state: { projectId: project.id } })
  }
  return (
    <StyledBox onClick={handleClick}>
      <Card>
        <Box
          className="title"
          sx={{ backgroundColor: `${project.backgroundColor}` }}>
          <Typography>{project.name}</Typography>
        </Box>
        <Box className="description">
          <Typography>{project.profile}</Typography>
        </Box>
      </Card>
    </StyledBox>
  )
}

export default ProjectCard
