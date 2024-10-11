import React, { useCallback } from 'react'
import {
  ReactFlow,
  type Node,
  type Edge,
  Background,
  Controls,
  useReactFlow,
  useNodesState,
  useEdgesState,
  ReactFlowProvider
} from '@xyflow/react'
import { Paper } from '@mui/material'
 
import '@xyflow/react/dist/style.css'
const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  return { nodes, edges }
}
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
] as Node[]
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }] as Edge[]

export default function NodeMap() {
  const { fitView } = useReactFlow()
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onLayout = useCallback(() => {
    const layouted = getLayoutedElements(nodes, edges)

    setNodes([...layouted.nodes])
    setEdges([...layouted.edges])

    window.requestAnimationFrame(() => {
      fitView()
    })
  }, [nodes, edges])
  return (
    <ReactFlowProvider>
      <Paper elevation={3} style={{
        margin: '10px',
        padding: '20px',
        height: 'calc(100% - 10px)',
        width: 'calc(100% - 10px)'
      }}>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </Paper>
    </ReactFlowProvider>
  )
}