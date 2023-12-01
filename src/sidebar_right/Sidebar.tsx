import React from "react";

const Sidebar: React.FC = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the panel on the left.
        <br />
        Also you can delete the nodes with the backspace key
      </div>
      <div
        className="dndnode sensor"
        onDragStart={(event) => onDragStart(event, "Sensor")}
        draggable
      >
        Sensor
      </div>
      <div
        className="dndnode actuators"
        onDragStart={(event) => onDragStart(event, "Actuators")}
        draggable
      >
        Actuator
      </div>
      <div
        className="dndnode hybrid"
        onDragStart={(event) => onDragStart(event, "Hybrid")}
        draggable
      >
        Hybrid
      </div>
      <div
        className="dndnode brokers"
        onDragStart={(event) => onDragStart(event, "Brokers")}
        draggable
      >
        Brokers
      </div>
      <div
        className="dndnode automation"
        onDragStart={(event) => onDragStart(event, "Automation")}
        draggable
      >
        Automation
      </div>
      <div
        className="dndnode turbo"
        onDragStart={(event) => onDragStart(event, "Turbo")}
        draggable
      >
        Turbo
      </div>
    </aside>
  );
};

export default Sidebar;
