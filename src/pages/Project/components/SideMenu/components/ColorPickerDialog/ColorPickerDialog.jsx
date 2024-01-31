import React from 'react'
import { Button, Dialog, FormControl } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { useSelector, useDispatch } from 'react-redux'
import { patchProjectColor } from '../../../../../../store/projectThunks'
import generateBackgroundColor from '../../../../generateBackgroundColor'

const ColorPickerDialog = ({ open, onClose, projectId }) => {
  const { backgroundColor: defaultColor, name: projectTitle } = useSelector(
    (state) => state.project.projects[projectId]
  )
  const dispatch = useDispatch()

  const [color, setColor] = React.useState(
    defaultColor || generateBackgroundColor(projectTitle)
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(patchProjectColor({ projectId, color }))
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Button type="submit">Set</Button>
          <MuiColorInput
            format="hex8"
            value={color}
            onChange={(_, colors) => setColor(colors.hex8)}
          />
        </FormControl>
      </form>
    </Dialog>
  )
}

export default ColorPickerDialog
