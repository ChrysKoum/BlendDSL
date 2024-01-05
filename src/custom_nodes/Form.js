import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function Form({
  isVisible,
  onClose,
  confirmDelete,
  formRef,
  initialData, // Initial data for the form fields
  onUpdate // New prop for updating the node data
}) {
  const [formData, setFormData] = useState(
    initialData || {
      title: "Node_Title",
      subline: "Node_Subline",
      freq: 3,
      topic: "Topic_Name",
      broker: "Broker_Name",
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleClose = () => {
    onUpdate(formData); // Call the update function with the new form data
    onClose(); // Then close the form
  };

  if (!isVisible) return null;

  return (
    <div className="sensor-form" ref={formRef}>
      <label>
        Title:{" "}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title_Name"
        />
      </label>
      <br />
      <label>
        Subline:{" "}
        <input
          type="text"
          name="subline"
          value={formData.subline}
          onChange={handleChange}
          placeholder="Subline_Name"
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
          onClick={handleClose}
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
