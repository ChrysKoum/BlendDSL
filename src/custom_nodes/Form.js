export default function SensorForm({
  isVisible,
  onClose,
  confirmDelete,
  formRef,
}) {
  if (!isVisible) return null;

  return (
    <div className="sensor-form" ref={formRef}>
      <label>
        Type: <input type="text" name="type" defaultValue={"Type_Name"} />
      </label>
      <br />
      <label>
        Frequency:
        <br />
        <input type="number" name="freq" defaultValue={"3"} min="1" max="100" />
      </label>
      <br />
      <label>
        Topic: <input type="text" name="topic" defaultValue={"Topic_Name"} />
      </label>
      <br />
      <label>
        Broker: <input type="text" name="broker" defaultValue={"Broker_Name"} />
      </label>
      <br />
      <div style={{ display: "inline-flex" }}>
        <button
          className="wrapper gradient"
          onClick={onClose}
          style={{ marginRight: "10px", cursor: "pointer" }}
        >
          <span>Close</span>
        </button>
        <button
          className="wrapper gradient"
          onClick={confirmDelete}
          style={{ backgroundColor: "red", cursor: "pointer" }}
        >
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
