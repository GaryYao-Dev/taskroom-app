// projectThunks.js

import { createAsyncThunk } from '@reduxjs/toolkit'
import http from '../utils/axios'

export const patchColumnData = createAsyncThunk(
  'project/patchColumnData',
  async ({ columnId, type, order }) => {
    const response = await http(`/columns/sort/${columnId}`, {
      method: 'PATCH',
      data: {
        type,
        order,
      },
    })
    return response.data
  }
)

export const copyColumn = createAsyncThunk(
  'project/copyColumn',
  async (columnId) => {
    const response = await http(`/columns/copy/${columnId}`, {
      method: 'POST',
    })
    const { id, name, tasks } = response.data
    return { id, name, tasks }
  }
)

export const deleteTasks = createAsyncThunk(
  'project/deleteTasks',
  async (columnId) => {
    await http(`/columns/tasks/${columnId}`, {
      method: 'DELETE',
    })
    return { columnId }
  }
)

export const patchProjectColor = createAsyncThunk(
  'project/patchProjectColor',
  async ({ projectId, color }) => {
    await http(`/projects/${projectId}`, {
      method: 'PATCH',
      data: {
        backgroundColor: color,
      },
    })
    return { projectId, color }
  }
)
