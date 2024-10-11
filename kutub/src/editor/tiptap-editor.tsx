import React, { ReactNode } from 'react'
import { useCurrentEditor, useEditor } from '@tiptap/react'
import { Editor } from '@tiptap/core'

interface TiptapEditorProps {
  editor?: Editor;
  extensions?: any;
  content?: string;
  children?: ReactNode;
  editable?: boolean;
}

const TiptapEditor: React.FC<TiptapEditorProps>= ({
  editor: externalEditor, extensions, content, children, editable
}) => {
  const inputtedEditor = externalEditor ?? undefined

  const currentEditor = useCurrentEditor()
  console.log('currentEditor', currentEditor)
  const editor = inputtedEditor ?? currentEditor

  if (!editor) return null

  return (
    <>
      {children}
    </>
  )
}

export default TiptapEditor
