import {
  ReactFlow,
  Background,
  Controls,
  useReactFlow,
  useNodesState,
  useEdgesState,
  Panel
} from '@xyflow/react'
import { Paper } from '@mui/material'
 
import '@xyflow/react/dist/style.css'
import useDagreLayoutedElements from './layout/use-dagre-layouted-elements'
import { initialNodes, initialEdges } from './consts'
import { useCallback } from 'react'

export default function NodeMap() {
  const { fitView } = useReactFlow()
  const { getDagreLayoutedElements } = useDagreLayoutedElements()

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onLayout = useCallback((direction: string) => {
    const layouted = getDagreLayoutedElements({ direction })
    
    setNodes([...layouted.nodes])
    setEdges([...layouted.edges])

    window.requestAnimationFrame(() => {
      fitView()
    })
  }, [nodes, edges])

  return (
    <Paper elevation={3} style={{
      margin: '10px',
      padding: '20px',
      height: 'calc(100% - 10px)',
      width: 'calc(100% - 10px)'
    }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
        <Panel position="top-right">
          <button
            onClick={() =>
              onLayout('TB')
            }
          >
            vertical layout
          </button>
          <button
            onClick={() =>
              onLayout('LR')
            }
          >
            horizontal layout
          </button>
        </Panel>
      </ReactFlow>
    </Paper>
  )
}