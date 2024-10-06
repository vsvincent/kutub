import { EditorProvider, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import NoteBubbleMenu from './note-bubble-menu'
import Editor from './editor'

const extensions = [StarterKit]

const content = '<p>Hello World!</p>'
const Tiptap = () => {
  return (
    <EditorProvider extensions={extensions} content={content}>
      <Editor>
        <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
        <NoteBubbleMenu  />
      </Editor>
    </EditorProvider>
  )
}

export default Tiptap
