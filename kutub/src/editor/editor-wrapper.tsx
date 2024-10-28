import React from 'react'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import NoteBubbleMenu from './note-bubble-menu'
import TiptapEditor from './tiptap-editor'
import NoteFloatingMenu from './note-floating-menu'

const extensions = [ StarterKit ]
interface EditorWrapperProps {
  content?: string;
  editable?: boolean;
}

const EditorWrapper: React.FC<EditorWrapperProps>= ({
  content, editable
}) => {
  return (
    <EditorProvider editable={editable} extensions={extensions} content={content}>
      <TiptapEditor>
        <NoteFloatingMenu />
        <NoteBubbleMenu />
      </TiptapEditor>
    </EditorProvider>
  )
}

export default EditorWrapper
