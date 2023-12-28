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

/* Icons of the Nodes */
import { FaAutoprefixer } from "react-icons/fa";
import { MdOutlineSensors } from "react-icons/md";
import { GrAction } from "react-icons/gr";
// import { FaLink } from "react-icons/fa6";

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

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      icon: <MdOutlineSensors />,
      title: "Sensor",
      subline: "Ambient Light",
    },
    type: "sensor",
  },
  {
    id: "2",
    position: { x: 0, y: 125 },
    data: {
      icon: <MdOutlineSensors />,
      title: "Actuator",
      subline: "Humidifier",
    },
    type: "sensor",
  },
  {
    id: "3",
    position: { x: 0, y: 250 },
    data: {
      icon: <GrAction />,
      title: "Sensor",
      subline: "Area Alarm",
    },
    type: "sensor",
  },
  {
    id: "4",
    position: { x: 0, y: 375 },
    data: {
      icon: <MdOutlineSensors />,
      title: "Actuator",
      subline: "Light",
    },
    type: "sensor",
  },
  {
    id: "5",
    position: { x: 500, y: 175 },
    data: { icon: <MdOutlineSensors />, title: "Brokers", subline: "MQTT" },
    type: "sensor",
  },
  {
    id: "6",
    position: { x: 750, y: 125 },
    data: { icon: <FaAutoprefixer />, title: "Automation 1" },
    type: "automation",
  },
  {
    id: "7",
    position: { x: 1200, y: 250 },
    data: { icon: <FaAutoprefixer />, title: "Automation 2" },
    type: "automation",
  },
  {
    id: "8",
    position: { x: 1200, y: 0 },
    data: { icon: <FaAutoprefixer />, title: "Automation 3" },
    type: "automation",
  },
];

const initialEdges = [
  {
    id: "e1-5",
    source: "1",
    target: "5",
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
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
    id: "estart6-7",
    source: "6",
    target: "8",
    sourceHandle: "automation-start-source",
  },
  {
    id: "estop6-8",
    source: "6",
    target: "7",
    sourceHandle: "automation-stop-source",
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
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

        const newNode = {
          id: getId(),
          type: "sensor",
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
    </div>
  );
};

export default DnDFlow;
