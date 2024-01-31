import { useDispatch } from 'react-redux'
import { deleteColumn } from '../../../../store/projectSlice'
import {
  copyColumn,
  patchColumnData,
  deleteTasks,
} from '../../../../store/projectThunks'

import http from '../../../../utils/axios'

export const getMenus = (columnId, setAddTaskMenuOpen, handleClose) => {
  const dispatch = useDispatch()
  return [
    {
      name: 'Add task',
      action: () => {
        handleClose()
        setAddTaskMenuOpen(true)
      },
      divider: true,
    },
    {
      name: 'Copy column',
      action: () => {
        dispatch(copyColumn(columnId))
        handleClose()
      },
      divider: true,
    },
    {
      name: 'Sort by created date(↑)',
      action: () => {
        dispatch(
          patchColumnData({ columnId, type: 'created_at', order: 'descend' })
        )
      },
    },
    {
      name: 'Sort by created date (↓)',
      action: () => {
        dispatch(
          patchColumnData({ columnId, type: 'created_at', order: 'ascend' })
        )
      },
    },
    {
      name: 'Sort by due date (↑)',
      action: () => {
        dispatch(
          patchColumnData({ columnId, type: 'due_at', order: 'descend' })
        )
      },
    },
    {
      name: 'Sort by due date (↓)',
      action: () => {
        dispatch(
          patchColumnData({ columnId, type: 'due_at', order: 'ascend' })
        )
      },
    },
    {
      name: 'Sort by card name (A-Z)',
      action: () => {
        dispatch(patchColumnData({ columnId, type: 'title', order: 'ascend' }))
      },
      divider: false,
    },
    {
      name: 'Sort by card name (Z-A)',
      action: () => {
        dispatch(patchColumnData({ columnId, type: 'title', order: 'descend' }))
      },
      divider: true,
    },
    {
      name: 'Delect all tasks',
      action: () => {
        handleClose()
        dispatch(deleteTasks(columnId))
      },
      confirmButtonOpen: false,
    },
    {
      name: 'Delete column and all tasks',
      action: async (columnId) => {
        try {
          const res = await http(`/columns/${columnId}`, {
            method: 'DELETE',
          })
          if (res.status !== 204) {
            throw new Error('Delete column failed')
          }
          dispatch(deleteColumn(columnId))
        } catch (error) {
          console.log(error)
        }
      },
      confirmButtonOpen: false,
    },
  ]
}
