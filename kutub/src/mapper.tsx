import React from 'react'
import './app.css'
import NodeMap from './flow/node-map'
import FlowWrapper from './flow/flow-wrapper'

function Mapper() {
  return (
    <FlowWrapper>
      <NodeMap />
    </FlowWrapper>
  )
}

export default Mapper
