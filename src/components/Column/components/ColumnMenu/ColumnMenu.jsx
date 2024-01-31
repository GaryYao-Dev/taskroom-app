import React, { useState } from 'react'
import { Box, Button, Menu, MenuItem, Typography, Divider } from '@mui/material'
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { getMenus } from './menuList'

const StyledMenu = styled((props) => <Menu {...props} />)(() => ({
  '& .MuiPaper-root': {
    borderRadius: '8px',
  },
  '& .MuiMenuItem-root': {
    padding: '0 16px',
    display: 'flex',
  },
  '& .textContainer': {
    padding: '8px 0',
    width: '100%',
    '& .MuiTypography-root': {
      fontSize: '14px',
    },
  },
  '& .buttonContainer': {
    marginLeft: '8px',
    '& .MuiButton-root': {
      minWidth: 'auto',
    },
  },
}))

const ColumnMenu = ({
  columnMenuAnchorEl,
  columnId,
  setColumnMenuAnchorEl,
  setAddTaskMenuOpen,
}) => {
  const handleClose = () => {
    setColumnMenuAnchorEl(null)
    setMenulist(initMenuList)
  }

  const initMenuList = getMenus(columnId, setAddTaskMenuOpen, handleClose)
  const [menuList, setMenulist] = useState(initMenuList)

  // set selected item's confirmButtonOpen to true, and set others to false,
  // when items has confirmButtonOpen property
  const setConfirmButtonOpen = (value, item) => {
    setMenulist((prev) =>
      prev.map((prevItem) => {
        if (
          !Object.prototype.hasOwnProperty.call(prevItem, 'confirmButtonOpen')
        ) {
          return prevItem
        }
        return {
          ...prevItem,
          confirmButtonOpen: prevItem.name === item.name && value,
        }
      })
    )
  }

  const handleMenuItemClick = (item) => {
    setConfirmButtonOpen(true, item)
    if (!Object.prototype.hasOwnProperty.call(item, 'confirmButtonOpen')) {
      item.action(columnId)
    }
  }

  return (
    <StyledMenu
      open={!!columnMenuAnchorEl}
      anchorEl={columnMenuAnchorEl}
      onClose={handleClose}>
      {menuList.map((item) => (
        <Box key={item.name}>
          <MenuItem>
            <Box
              className="textContainer"
              onClick={() => handleMenuItemClick(item)}>
              <Typography>{item.name}</Typography>
            </Box>
            {item.confirmButtonOpen && (
              <Box className="buttonContainer">
                <Button onClick={() => item.action(columnId)}>
                  <CheckIcon />
                </Button>
                <Button onClick={() => setConfirmButtonOpen(false, item)}>
                  <CloseIcon />
                </Button>
              </Box>
            )}
          </MenuItem>
          {item.divider && <Divider variant="middle" />}
        </Box>
      ))}
    </StyledMenu>
  )
}

export default ColumnMenu
