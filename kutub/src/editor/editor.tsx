import React, { ReactNode } from 'react'
import { useCurrentEditor, useEditor } from '@tiptap/react'
import { Editor } from '@tiptap/core'

interface TiptapEditorProps {
  editor?: Editor;
  extensions?: any;
  content?: string;
  children?: ReactNode;
}

const TiptapEditor: React.FC<TiptapEditorProps>= ({
  editor: externalEditor, extensions, content, children
}) => {
  const inputtedEditor = externalEditor ?? undefined

  const currentEditor = useCurrentEditor()
  const editor = inputtedEditor ?? currentEditor

  if (!editor) return null

  return (
    <>
      {children}
    </>
  )
}

export default TiptapEditor
