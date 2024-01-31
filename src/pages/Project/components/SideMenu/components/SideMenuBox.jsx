import { Box, styled } from '@mui/material'

const SideMenuBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'auto',
  backgroundColor: 'rgba(255,255,255,0.5)',
  backdropFilter: 'blur(5px)',
  '& .MuiDrawer-root': {
    width: '240px',
    flexShrink: 0,

    '& .MuiDrawer-paper': {
      width: '240px',
      border: 'none',
      boxSizing: 'border-box',
      top: 'auto !important',
      backgroundColor: 'inherit',
    },
  },
  '& .MuiList-root': {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '& .MuiDivider-root': {
      margin: '10px 0',
    },
    '& .projectTitle': {
      width: '95%',
      '& .MuiTypography-root': {
        fontWeight: '500',
      },
      '& .MuiInput-root': {
        fontSize: '16px',
        fontWeight: '500',
      },
    },
    '& .MuiListItem-root': {
      padding: '8px 8px',
      flexDirection: 'column',
      alignItems: 'flex-start',
      cursor: 'default',
      '& .sectionTitle': {
        fontWeight: '450',
      },
      '& .MuiListItem-root': {
        width: '100%',
        '&:hover': {
          backgroundColor: theme.palette.grey[300],
          cursor: 'pointer',
        },
        color: theme.palette.grey[700],
      },
    },
  },
  '& .projectDesc': {
    '& .MuiTypography-root': {
      paddingRight: '20px',
      margin: '0',
      fontSize: '14px',
      color: theme.palette.grey[600],
      wordBreak: 'break-all',
    },
    '& .MuiTextarea-root': {
      fontSize: '14px',
      color: theme.palette.grey[700],
    },
  },
  '& .toggleMenuButton': {
    position: 'absolute',
    color: '#000',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: '16px 16px',
    backdropFilter: 'blur(5px)',
    right: '-16px',
    top: '32px',
    zIndex: theme.zIndex.drawer + 1,
    '&:hover': {
      backgroundColor: '#fff',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1rem',
    },
  },
}))

export default SideMenuBox
