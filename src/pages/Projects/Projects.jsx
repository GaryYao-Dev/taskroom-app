import { Box, Typography } from '@mui/material'
import React from 'react'
import ProjectsBox from './components/ProjectsBox'
import { useSelector } from 'react-redux'
import Card from './components/Card'

const Projects = () => {
  const projects = useSelector((state) => state.project.projects)
  const ownedProjects = []
  const joinedProjects = []
  Object.entries(projects).map(([key, value]) => {
    value.type === 'owned'
      ? ownedProjects.push({ id: key, ...value })
      : joinedProjects.push({ id: key, ...value })
  })

  return (
    <ProjectsBox>
      {ownedProjects.length > 0 && (
        <>
          <Typography className="sectionName" variant="h6">
            Owned Projects
          </Typography>
          <Box className="projectContainer">
            {ownedProjects.map((project) => (
              <Card
                key={project.id}
                project={project}
              />
            ))}
          </Box>
        </>
      )}
      {joinedProjects.length > 0 && (
        <>
          <Typography className="sectionName" variant="h6">
            Joined Projects
          </Typography>
          <Box className="projectContainer">
            {joinedProjects.map((project) => (
              <Card
                key={project.id}
                project={project}
              />
            ))}
          </Box>
        </>
      )}
    </ProjectsBox>
  )
}

export default Projects
