import React from "react";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">
        <h3>You can drag these nodes to the panel on the left.</h3>
        <h3>
          Also you can delete the nodes and the edges with the backspace key
        </h3>
          <h3>The default controls are:</h3>
          <ul>
            <li><h4>pan: drag mouse</h4></li>
            <li><h4>zoom: scroll</h4></li>
            <li><h4>create selection: Shift + drag</h4></li>
          </ul>
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
        onDragStart={(event) => onDragStart(event, "Actuator")}
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
        onDragStart={(event) => onDragStart(event, "Broker")}
        draggable
      >
        Broker
      </div>
      <div
        className="dndnode automation"
        onDragStart={(event) => onDragStart(event, "Automation")}
        draggable
      >
        Automation
      </div>
    </aside>
  );
};

export default Sidebar;
