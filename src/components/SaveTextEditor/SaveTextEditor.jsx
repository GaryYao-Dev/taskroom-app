import * as React from 'react'
import TextEditor from '../TextEditor'
import { Typography } from '@mui/material'
import http from '../../utils/axios'
const SaveTextEditor = ({
  task,
  isEditingContent,
  setIsEditingContent,
  content,
  setContent,
  children,
  style,
}) => {
  const handleSubmit = async (description) => {
    await http(`/tasks/${task.id}`, {
      method: 'PATCH',
      data: { content: description },
    })
    setIsEditingContent(false)
  }
  const handleContentOnClick = () => {
    setIsEditingContent(true)
  }

  const handleContentOnSave = (editedDescription) => {
    setContent(editedDescription)
    setIsEditingContent(false)
    handleSubmit(editedDescription)
  }

  const handleDescriptionCancel = async () => {
    setContent('')
    setIsEditingContent(false)
    await http(`/tasks/${task.id}`, {
      method: 'PATCH',
      data: { content: '' },
    })
  }
  return (
    <div style={style}>
      {isEditingContent ? (
        <div
          style={{
            borderRadius: '5px',
            marginTop: '10px',
            width: '93%',
          }}>
          <TextEditor
            value={content}
            setValue={setContent}
            onSave={handleContentOnSave}
            onCancel={handleDescriptionCancel}
          />
        </div>
      ) : (
        <div
          style={{
            borderRadius: '5px',
            padding: '10px',
            marginTop: '10px',
            width: '93%',
            height: 'auto',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            overflowY: 'auto',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
          onClick={handleContentOnClick}>
          {content ? (
            <Typography
              sx={{ fontSize: '14px' }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div style={{ color: 'grey' }}>
              <Typography sx={{ fontSize: '14px' }}>
                <em>{children}</em>
              </Typography>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SaveTextEditor
