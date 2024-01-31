import React from 'react'
import { List, ListItem, Divider } from '@mui/joy'
import { Drawer, Typography, styled } from '@mui/material'
import EditableText from '../../../../../../components/EditableText'
import { useDispatch } from 'react-redux'

const DrawerHeader = styled('div')(() => ({
  padding: '10px 2px',
}))
const SideMenuDrawer = ({
  sideMenuOpen,
  projectData,
  projectId,
  onProjectTitleChange,
  user,
  menuList,
  colorPickerDialogOpen,
}) => {
  const dispatch = useDispatch()
  return (
    <Drawer variant="persistent" anchor="left" open={sideMenuOpen}>
      <DrawerHeader>
        <List key={'root-list'}>
          <ListItem key={'project-profile'}>
            <EditableText
              className="projectTitle"
              state={projectData.name}
              submitHttpConfig={{
                endPoint: `/projects/${projectId}`,
                data: { name: undefined },
                method: 'PATCH',
              }}
              setState={onProjectTitleChange}
              validation={{
                required: true,
                min: 3,
                max: 30,
                name: 'Project Title',
              }}
              editable={user.owned_projects.includes(projectId)}
            />
            <EditableText
              className="projectDesc"
              state={projectData.profile}
              submitHttpConfig={{
                endPoint: `/projects/${projectId}`,
                data: { profile: undefined },
                method: 'PATCH',
              }}
              setState={(update) =>
                dispatch({
                  type: 'project/updateProjectDesc',
                  payload: { projectId, update },
                })
              }
              validation={{
                required: true,
                min: 0,
                max: 200,
                name: 'Project Description',
              }}
              textarea={true}
              editable={user.owned_projects.includes(projectId)}
            />
          </ListItem>
          <Divider variant="middle" />
          {menuList.map((section) => (
            <ListItem key={section.name}>
              <Typography>{section.name}</Typography>
              <List key={`section-${section.name}`}>
                {section.items.map((item) => {
                  if (
                    item.ownerValidOnly &&
                    !user.owned_projects.includes(projectId)
                  ) {
                    return null
                  }
                  return (
                    <React.Fragment key={`${section.name}-${item.name}`}>
                      <ListItem onClick={item.action}>
                        <Typography>{item.name}</Typography>
                      </ListItem>
                      {colorPickerDialogOpen && item.component}
                    </React.Fragment>
                  )
                })}
              </List>
            </ListItem>
          ))}
        </List>
      </DrawerHeader>
    </Drawer>
  )
}

export default SideMenuDrawer
