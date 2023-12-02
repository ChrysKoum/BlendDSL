import React, { useState, FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import styles from "./sensorNode.module.css";

interface SensorNodeProps {
  id: string;
  data: { label: string; attributes?: any };
}

const SensorNode: FC<SensorNodeProps> = ({ id, data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div className={styles.sensorNode}>
        <button className={styles.sensorNodeButton}>Add</button>
        <div>{data.label}</div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="source-turbo"
        isConnectable={isConnectable}
      />
    </>
  );
};

export default SensorNode;
