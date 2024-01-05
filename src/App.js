import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { ToastContainer } from "react-toastify";

/* Icons of the Nodes */
import { FaAutoprefixer } from "react-icons/fa";
import { MdOutlineSensors } from "react-icons/md";
import { GrAction } from "react-icons/gr";
import { FaLink } from "react-icons/fa6";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

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

/* Drag and Drop, Save and Restore Fuctionality*/
const flowKey = "example-flow";

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDnSnRFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      const simplifiedNodes = flow.nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
        },
      }));
      const simplifiedFlow = { ...flow, nodes: simplifiedNodes };
      localStorage.setItem(flowKey, JSON.stringify(simplifiedFlow));
      console.log("Saving flow: ", simplifiedFlow);
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      console.log("Restoring flow: ", flow);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        const reconstructedNodes = flow.nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            icon: reconstructIcon(node.type), // reconstruct icon
          },
        }));
        setNodes(reconstructedNodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setEdges, setViewport]);

  const reconstructIcon = (iconIdentifier) => {
    switch (iconIdentifier) {
      case "hybrid":
        return <HiOutlineSwitchHorizontal />;
      case "automation":
        return <FaAutoprefixer />;
      case "sensor":
        return <MdOutlineSensors />;
      case "actuator":
        return <GrAction />;
      case "brocker":
        return <FaLink />;
      default:
        return <MdOutlineSensors />;
    }
  };

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
            <Panel position="top-right">
              <button onClick={onSave}>save</button>
              <button onClick={onRestore}>restore</button>
            </Panel>
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
      <ToastContainer />
    </div>
  );
};
// eslint-disable-next-line
export default () => (
  <ReactFlowProvider>
    <DnDnSnRFlow />
  </ReactFlowProvider>
);
