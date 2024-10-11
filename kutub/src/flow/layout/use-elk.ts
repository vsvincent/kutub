import { useReactFlow } from '@xyflow/react'
import ELK, { ElkNode } from 'elkjs'
import { useCallback } from 'react'
import { isNil, map } from 'rambda'

const elk = new ELK()

const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow()
  const defaultOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': 100,
    'elk.spacing.nodeNode': 80,
  }

  const getLayoutedElements = useCallback((options: any) => {
    const layoutOptions = { ...defaultOptions, ...options }
    const graph = {
      id: 'root',
      layoutOptions: layoutOptions,
      children: getNodes().map((node) => ({
        ...node,
        width: node.measured?.width,
        height: node.measured?.height,
      })),
      edges: getEdges(),
    } as any

    elk.layout(graph).then(({ children }) => {
      if(isNil(children)) return
      children.forEach((node: any) => {
        node.position = { x: node.x, y: node.y }
      })
      const flowChildren = map((node: ElkNode) => {
        return { id, position }
      },
      children)

      setNodes(children as unknown as Node[])
      window.requestAnimationFrame(() => {
        fitView()
      })
    })
  }, [])

  return { getLayoutedElements }
}