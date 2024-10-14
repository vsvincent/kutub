import Dagre from '@dagrejs/dagre'
import { useReactFlow } from '@xyflow/react'

const useDagreLayoutedElements = () => {
  const { getNodes, getEdges } = useReactFlow()


  const getDagreLayoutedElements = (options: any) => {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))
    const nodes = getNodes()
    const edges = getEdges()
    g.setGraph({ rankdir: options.direction })

    edges.forEach((edge) => g.setEdge(edge.source, edge.target))
    nodes.forEach((node) =>
      g.setNode(node.id, {
        ...node,
        width: node.measured?.width ?? 0,
        height: node.measured?.height ?? 0,
      }),
    )

    Dagre.layout(g)
    return {
      nodes: nodes.map((node) => {
        const position = g.node(node.id)
        const x = position.x - (node.measured?.width ?? 0) / 2
        const y = position.y - (node.measured?.height ?? 0) / 2

        return { ...node, position: { x, y } }
      }),
      edges,
    } as any
  }
  return { getDagreLayoutedElements }
}
export default useDagreLayoutedElements