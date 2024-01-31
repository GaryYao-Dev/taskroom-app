import { createSlice } from '@reduxjs/toolkit'
import {
  patchColumnData,
  copyColumn,
  deleteTasks,
  patchProjectColor,
} from './projectThunks'

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    columnData: [],
    projects: {},
    status: 'idle',
  },
  reducers: {
    // Project
    updateProject(state, action) {
      state.projects = action.payload
    },
    updateProjectTitle(state, action) {
      state.projects[action.payload.projectId].name = action.payload.update
    },
    updateProjectDesc(state, action) {
      state.projects[action.payload.projectId].profile = action.payload.update
    },
    deleteProject(state, action) {
      delete state.projects[action.payload]
    },
    addProject(state, action) {
      state.projects[action.payload.id] = action.payload
    },

    // DND
    updateColumnData(state, action) {
      state.columnData = action.payload
    },

    // Column
    deleteColumn(state, action) {
      state.columnData = state.columnData.filter(
        (column) => column.id !== action.payload
      )
    },
    createColumn(state, action) {
      state.columnData.push(action.payload)
    },
    updateColumnTitle(state, action) {
      state.columnData = state.columnData.map((column) =>
        column.id === action.payload.id
          ? { ...column, name: action.payload.name }
          : column
      )
    },
    createTask(state, action) {
      const { columnId, newTask } = action.payload
      state.columnData = state.columnData.map((updateColumnData) => {
        if (updateColumnData.id === columnId) {
          return {
            ...updateColumnData,
            tasks: [...updateColumnData.tasks, newTask],
          }
        } else {
          return updateColumnData
        }
      })
    },
    updateTaskTitle(state, action) {
      state.columnData = state.columnData.map((column) =>
        column.id === action.payload.columnId
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === action.payload.taskId
                  ? { ...task, title: action.payload.title }
                  : task
              ),
            }
          : column
      )
    },
    deleteTask(state, action) {
      const { columnId, taskId } = action.payload
      state.columnData = state.columnData.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            }
          : column
      )
    },
  },
  extraReducers(builder) {
    builder
      .addCase(patchColumnData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(patchColumnData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.columnData = state.columnData.map((column) => {
          if (column.id === action.payload.id) {
            return action.payload
          } else {
            return column
          }
        })
      })
      .addCase(patchColumnData.rejected, (state, action) => {
        state.status = 'failed'
        console.log(action.payload)
      })
      .addCase(copyColumn.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.columnData.push(action.payload)
      })
      .addCase(copyColumn.rejected, (state, action) => {
        state.status = 'failed'
        console.log(action.payload)
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.columnData = state.columnData.map((column) =>
          column.id === action.payload.columnId
            ? { ...column, tasks: [] }
            : { ...column }
        )
      })
      .addCase(deleteTasks.rejected, (state, action) => {
        state.status = 'failed'
        console.log(action.payload)
      })
      .addCase(patchProjectColor.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.projects[action.payload.projectId].backgroundColor =
          action.payload.color
      })
  },
})

export const {
  updateColumnData,
  deleteColumn,
  createColumn,
  updateColumnTitle,
  updateProjectData,
  updateProjectTitle,
  createTask,
  updateTaskTitle,
  deleteTask,
  addProject,
} = projectSlice.actions

const projectReducer = projectSlice.reducer

export default projectReducer
