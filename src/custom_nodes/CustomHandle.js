import React, { useMemo } from "react";
import {
  getConnectedEdges,
  Handle,
  useNodeId,
  useStore,
} from "reactflow";

const selector = (s) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

const CustomHandle = ({ targetHandle, ...props }) => {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

  const isHandleConnectable = useMemo(() => {
    const node = nodeInternals.get(nodeId);
    const connectedEdges = getConnectedEdges([node], edges);
    // Limit to only one connection
    return connectedEdges.length < 1;
  }, [nodeInternals, edges, nodeId]);

  return <Handle {...props} isConnectable={isHandleConnectable}></Handle>;
};

export default CustomHandle;
