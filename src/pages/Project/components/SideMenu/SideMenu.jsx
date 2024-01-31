import React, { useEffect } from 'react' // useEffect, useState
import { IconButton, FormControl, Button } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
// import OutsideClick from '../../../../hooks/OutsideClick'
import { useDispatch, useSelector } from 'react-redux'
import { updateProjectTitle } from '../../../../store/projectSlice'
import InviteDialog from './components/InviteDialog'
import DeleteProjectDialog from './components/DeleteProjectDialog'
import { MuiColorInput } from 'mui-color-input'
import generateBackgroundColor from '../../generateBackgroundColor'
import { patchProjectColor } from '../../../../store/projectThunks'
import SideMenuBox from './components/SideMenuBox'
import SideMenuDrawer from './components/SideMenuDrawer'

const SideMenu = ({ sideMenuOpen, toggleMenu, projectId }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const projectData = useSelector((state) => state.project.projects[projectId])
  const defaultColor = projectData?.backgroundColor
  const projectTitle = projectData?.name
  const [inviteDialogOpen, setInviteDialogOpen] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [colorPickerDialogOpen, setColorPickerDialogOpen] =
    React.useState(false)
  const [color, setColor] = React.useState(
    defaultColor || generateBackgroundColor(projectTitle)
  )
  const onProjectTitleChange = (update) => {
    dispatch(updateProjectTitle({ projectId, update }))
  }

  useEffect(() => {
    setColor(defaultColor || generateBackgroundColor(projectTitle))
    setColorPickerDialogOpen(false)
  }, [projectTitle, defaultColor, sideMenuOpen])

  const menuList = [
    {
      name: 'Group Settings',
      items: [
        {
          name: 'Members',
          action: () => alert('Members'),
        },
        {
          name: 'Invite',
          action: () => setInviteDialogOpen(true),
          ownerValidOnly: true,
        },
      ],
    },
    {
      name: 'Project Settings',
      items: [
        {
          name: 'Settings',
          action: () => alert('Settings'),
        },
        {
          name: 'Background Color',
          action: () => setColorPickerDialogOpen(!colorPickerDialogOpen),
          component: (
            <form
              key={'colorPickerForm'}
              onSubmit={(e) => {
                e.preventDefault()
                dispatch(patchProjectColor({ projectId, color }))
                setColorPickerDialogOpen(false)
                toggleMenu(false)
              }}>
              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                    width: '100%',
                  },
                  '& .MuiInputBase-input': {
                    padding: '5px 0',
                  },
                }}>
                <MuiColorInput
                  format="hex8"
                  value={color}
                  onChange={(_, colors) => {
                    toggleMenu(true)
                    setColor(colors.hex8)
                  }}
                />
                <Button type="submit">Set</Button>
              </FormControl>
            </form>
          ),
        },
        {
          name: 'Delete',
          action: () => setDeleteDialogOpen(true),
          ownerValidOnly: true,
        },
      ],
    },
  ]
  if (!projectData) return null
  return (
    <SideMenuBox key={projectId}>
      {/* <OutsideClick
        onClickOutside={() => {
          toggleMenu(false)
        }}
        className="clickOutSide"> */}
      <IconButton
        className="toggleMenuButton"
        variant="contained"
        onClick={() => {
          toggleMenu(!sideMenuOpen)
        }}>
        {sideMenuOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      <SideMenuDrawer
        sideMenuOpen={sideMenuOpen}
        projectData={projectData}
        projectId={projectId}
        onProjectTitleChange={onProjectTitleChange}
        user={user}
        menuList={menuList}
        colorPickerDialogOpen={colorPickerDialogOpen}
      />
      {/* </OutsideClick> */}
      <InviteDialog
        open={inviteDialogOpen}
        onClose={() => {
          setInviteDialogOpen(false)
        }}
        projectId={projectId}
        keepMounted
      />
      <DeleteProjectDialog
        projectId={projectId}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </SideMenuBox>
  )
}

export default SideMenu
