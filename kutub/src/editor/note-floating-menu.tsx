import React from 'react'
import { FloatingMenu, useCurrentEditor } from '@tiptap/react'
const NoteFloatingMenu = () => {
  const editor = useCurrentEditor().editor
  console.log('NoteFloatingMenu', editor)
  if (!editor) return null
  return (
    <FloatingMenu editor={editor}>
      This is the floating menu
    </FloatingMenu>
  )
}

export default NoteFloatingMenu
