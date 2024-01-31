import { Box, styled } from '@mui/material'
import { BOX_WIDTH } from '../../ProjectsBox'

const WIDTH = (BOX_WIDTH - 10) / 3
export default styled(Box)(({ theme }) => ({
  width: WIDTH,
  height: (WIDTH * 9) / 16,
  padding: 10,
  '& .MuiCard-root': {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: '0.2s',
    '&:hover': {
      transform: 'perspective(800px) rotateX(15deg)',
      boxShadow: '0px 20px 8px -8px rgba(0,0,0,0.5)',
      '& .title': {
        
        '& .MuiTypography-root': {
          transform: 'perspective(800px) translate3d(0, -15px, 50px)',
          transition: '0.2s ease-out',
        },
      },
    },
  },
  '& .title': {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    padding: '0 10px',
    '& .MuiTypography-root': {
      color: theme.palette.common.white,
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.05em',
      textShadow: '0px 0px 8px rgba(0,0,0,0.2)',
    },

  },
  '& .description': {
    padding: '0 4px',
    height: '25%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    '& .MuiTypography-root': {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
}))
