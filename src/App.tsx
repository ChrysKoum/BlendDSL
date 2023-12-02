import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Edge,
  Node,
  Connection,
  EdgeChange,
  NodeChange,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { FiFile } from "react-icons/fi";

import Sidebar from "./sidebar_right/Sidebar";

import "reactflow/dist/base.css";
import "./index.css";
import TurboNode, { TurboNodeData } from "./style/TurboNode";
import TurboEdge from "./style/TurboEdge";
import FunctionIcon from "./style/FunctionIcon";

const nodeTypes = {
  turbo: TurboNode,
};

const edgeTypes = {
  turbo: TurboEdge,
};

const defaultEdgeOptions = {
  type: "turbo",
  markerEnd: "edge-circle",
};

const initialNodes: Node<TurboNodeData>[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { icon: <FunctionIcon />, title: "Sensor", subline: "api.ts" },
    type: "turbo",
  },
  {
    id: "2",
    position: { x: 250, y: 0 },
    data: { icon: <FunctionIcon />, title: "Actuator", subline: "apiContents" },
    type: "turbo",
  },
  {
    id: "3",
    position: { x: 0, y: 250 },
    data: { icon: <FunctionIcon />, title: "Sensor", subline: "sdk.ts" },
    type: "turbo",
  },
  {
    id: "4",
    position: { x: 250, y: 250 },
    data: { icon: <FunctionIcon />, title: "Actuator", subline: "sdkContents" },
    type: "turbo",
  },
  {
    id: "5",
    position: { x: 500, y: 125 },
    data: { icon: <FunctionIcon />, title: "Brokers", subline: "api, sdk" },
    type: "turbo",
  },
  {
    id: "6",
    position: { x: 750, y: 125 },
    data: { icon: <FiFile />, title: "Automation 1" },
    type: "turbo",
  },
  {
    id: "7",
    position: { x: 1000, y: 125 },
    data: { icon: <FiFile />, title: "Automation 2" },
    type: "turbo",
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
  },
  {
    id: "e2-5",
    source: "2",
    target: "5",
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();

      const type = event.dataTransfer.getData("application/reactflow");
      console.log(type);
      if (typeof type === "undefined" || !type) {
        return;
      }

      if (reactFlowInstance && reactFlowBounds) {
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const newNode = {
          id: getId(),
          type: "turbo",
          position,
          data: {
            icon: <FunctionIcon />,
            title: `${type} Node`,
            subline: `${type}.ts`,
          },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            onNodesChange={onNodesChange as (changes: NodeChange[]) => void}
            onEdgesChange={onEdgesChange as (changes: EdgeChange[]) => void}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <svg>
              <defs>
                <linearGradient id="edge-gradient">
                  <stop offset="0%" stopColor="#ae53ba" />
                  <stop offset="100%" stopColor="#2a8af6" />
                </linearGradient>

                <marker
                  id="edge-circle"
                  viewBox="-5 -5 10 10"
                  refX="0"
                  refY="0"
                  markerUnits="strokeWidth"
                  markerWidth="10"
                  markerHeight="10"
                  orient="auto"
                >
                  <circle
                    stroke="#2a8af6"
                    strokeOpacity="0.75"
                    r="2"
                    cx="0"
                    cy="0"
                  />
                </marker>
              </defs>
            </svg>
            <MiniMap />
            <Background color="#ccc" gap={12} size={1} />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
