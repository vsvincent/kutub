import React from 'react'
import { BubbleMenu, useCurrentEditor } from '@tiptap/react'
const NoteBubbleMenu = () => {
  const editor = useCurrentEditor().editor
  if (!editor) return null
  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="bubble-menu">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          Strike
        </button>
      </div>
    </BubbleMenu>
  )
}

export default NoteBubbleMenu
