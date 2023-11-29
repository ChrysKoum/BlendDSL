import React, { useState, FC } from "react";
import styles from "./sensorNode.module.css"; // Assuming you have a CSS module for styling

interface SensorNodeProps {
  id: string;
  data: { label: string; attributes?: any };
  onChange: (node: SensorNodeProps) => void;
}

const SensorNode: FC<SensorNodeProps> = ({ id, data, onChange }) => {
  return (
    <div className={styles.sensorNode}>
      <button className={styles.sensorNodeButton}>Add</button>
      <div>{data.label}</div>
    </div>
  );
};

export default SensorNode;
