import React, { FC } from "react";
import "./SidebarLeft.css"; // This file should contain the CSS for the sidebar

const SidebarLeft = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  return (
    <div className={`left-sidebar ${isOpen ? "open" : ""}`}>
      <label>
        Type: <input type="text" name="type" defaultValue={"Type"} />
      </label>
      <br />
      <label>
        Frequency: <input type="number" name="freq" defaultValue={"freq"} />
      </label>
      <br />
      <label>
        Topic: <input type="text" name="topic" defaultValue={"topic"} />
      </label>
      <br />
      <label>
        Broker: <input type="text" name="broker" defaultValue={"broker"} />
      </label>
      <br />
      <button onClick={onClose}>SAVE</button>
    </div>
  );
};

export default SidebarLeft;
