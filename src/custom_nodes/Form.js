import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function SensorForm({
  isVisible,
  onClose,
  confirmDelete,
  formRef,
  initialData // Initial data for the form fields
}) {
  const [formData, setFormData] = useState(initialData || {
    type: "Type_Name",
    freq: 3,
    topic: "Topic_Name",
    broker: "Broker_Name"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isVisible) return null;

  return (
    <div className="sensor-form" ref={formRef}>
      <label>
        Type:{" "}
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type_Name"
        />
      </label>
      <br />
      <label>
        Frequency:
        <br />
        <input
          type="number"
          name="freq"
          value={formData.freq}
          onChange={handleChange}
          placeholder="..."
          min="1"
          max="100"
        />
      </label>
      <br />
      <label>
        Topic:{" "}
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          placeholder="Topic_Name"
        />
      </label>
      <br />
      <label>
        Broker:{" "}
        <input
          type="text"
          name="broker"
          value={formData.broker}
          onChange={handleChange}
          placeholder="Broker_Name"
        />
      </label>
      <br />
      <div style={{ display: "inline-flex" }}>
        <button
          className="wrapper gradient"
          onClick={onClose}
          style={{ marginRight: "10px", cursor: "pointer" }}
        >
          <span>
            <IoClose />
          </span>
        </button>
        <button
          className="wrapper gradient"
          onClick={confirmDelete}
          style={{ backgroundColor: "red", cursor: "pointer" }}
        >
          <span>
            <MdDelete />
          </span>
        </button>
      </div>
    </div>
  );
}
