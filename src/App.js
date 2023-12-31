import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { ToastContainer } from "react-toastify";

/* Icons of the Nodes */
import { MdOutlineSensors } from "react-icons/md";


import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements/initial-elements";

/* Sidebar */
import Sidebar from "./sidebar_right/Sidebar";

/* CSS */
import "reactflow/dist/base.css";
import "./index.css";

/* Custom Nodes */
import BrockerNode from "./custom_nodes/broker/BrockerNode";
import HybridNode from "./custom_nodes/hybrid/HybridNode";
import SensorNode from "./custom_nodes/sensors/SensorNode";
import ActuatorNode from "./custom_nodes/actuator/ActuatorNode";
import AutomationNode from "./custom_nodes/automation/AutomationNode";
import CustomEdge from "./custom_edge/CustomEdge";

const nodeTypes = {
  brocker: BrockerNode,
  hybrid: HybridNode,
  sensor: SensorNode,
  actuator: ActuatorNode,
  automation: AutomationNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const defaultEdgeOptions = {
  type: "customEdge",
  markerEnd: "edge-circle",
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(params,
          eds
        )
      ),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      if (reactFlowInstance && reactFlowBounds) {
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        
       console.log("Type connection", type); 

        const newNode = {
          id: getId(),
          type: `${type.toLowerCase()}`,
          position,
          data: {
            icon: <MdOutlineSensors />,
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
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
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
      <ToastContainer />
    </div>
  );
};

export default DnDFlow;
