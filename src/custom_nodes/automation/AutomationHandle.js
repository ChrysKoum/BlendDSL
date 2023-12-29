import React, { useMemo } from "react";
import { getConnectedEdges, Handle, useNodeId, useStore } from "reactflow";

const selector = (s) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

const AutomationHandle = (props) => {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();
  const { sourceHandle } = props;

   const isHandleConnectable = useMemo(() => {
     const node = nodeInternals.get(nodeId);
     const connectedEdges = getConnectedEdges([node], edges);
     // Check if the node type is 'automation'
     if (
       sourceHandle === "automation-start-source" ||
       sourceHandle === "automation-stop-source"
     ) {
       // Dont limit the connection for automation nodes
       return true;
     }

    // limit to only none connection for others nodes
     return connectedEdges.length < 3;
   }, [nodeInternals, edges, nodeId]);

  return <Handle {...props} isConnectable={isHandleConnectable}></Handle>;
};

export default AutomationHandle;
