import React from "react";
import {
  getSmoothStepPath,
  BaseEdge,
  EdgeLabelRenderer,
  useReactFlow,
} from "reactflow";

export default function CustomEdge({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const xEqual = sourceX === targetX;
  const yEqual = sourceY === targetY;
  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX: xEqual ? sourceX + 0.0001 : sourceX,
    sourceY: yEqual ? sourceY + 0.0001 : sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  // Render edge for self connect
  if (source === target) {
    const radiusX = (sourceX - targetX) * 0.6;
    const radiusY = 50;
    const selfConnectPath = `M ${
      sourceX - 5
    } ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${targetX + 2} ${targetY}`;

    return (
      <>
        <BaseEdge
          path={selfConnectPath}
          id={id}
          style={style}
          className="react-flow__edge-path"
          d={selfConnectPath}
          markerEnd={markerEnd}
        />

        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-40%, -440%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              pointerEvents: "all",
            }}
            className="nodrag nopan"
          >
            <button className="edgebutton" onClick={onEdgeClick}>
              ×
            </button>
          </div>
        </EdgeLabelRenderer>
      </>
    );
  }

  // Render normal edge
  return (
    <>
      <BaseEdge
        path={edgePath}
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <button className="edgebutton" onClick={onEdgeClick}>
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
