import { ReactFlowProvider } from '@xyflow/react'
import React, { ReactNode } from 'react'

interface FlowWrapperProps {
  children?: ReactNode;
}

const FlowWrapper: React.FC<FlowWrapperProps>= ({
  children
}) => {
  return (
    <ReactFlowProvider>
      {children}
    </ReactFlowProvider>
  )
}

export default FlowWrapper
