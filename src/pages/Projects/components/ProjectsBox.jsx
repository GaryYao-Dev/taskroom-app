import { Box, styled } from '@mui/material'

export const HEADER_HEIGHT = 64
export const BOX_WIDTH = 825
export default styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: HEADER_HEIGHT + 20,

  '& .sectionName': {
    maxWidth: BOX_WIDTH,
    width: '100%',
    color: theme.palette.grey[600],
    margin: '10px 0',
  },
  '& .projectContainer': {
    maxWidth: BOX_WIDTH,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    // justifyContent: 'space-around',
  },
}))
