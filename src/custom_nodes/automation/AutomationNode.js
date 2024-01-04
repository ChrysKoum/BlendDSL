import { useState, memo } from "react";
import { Position, useReactFlow } from "reactflow";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AutomationHandle from "./AutomationHandle";

// SensorForm component
const SensorForm = ({ isVisible, onClose, confirmDelete }) => {
  if (!isVisible) return null;

  return (
    <div className="sensor-form">
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
};

// TurboNode component
export default memo(({ id, data, isConnectable }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const { setEdges, setNodes } = useReactFlow();

  const handleEditClick = (event) => {
    event.preventDefault();
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  const onEdgeClick = (id) => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  const onDeleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
  };

  const confirmDelete = (nodeId) => {
    const ConfirmDeleteToast = ({ closeToast }) => (
      <div>
        Are you sure you want to delete this node?
        <button
          style={{ marginLeft: "10px", color: "green" }}
          onClick={() => {
            onDeleteNode(nodeId);
            closeToast();
          }}
        >
          Yes
        </button>
        <button
          style={{ marginLeft: "10px", color: "red" }}
          onClick={closeToast}
        >
          No
        </button>
      </div>
    );

    toast(<ConfirmDeleteToast />, {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
    });
  };

  const handleConnect = (connection, id) => {
    if (connection.targetHandle !== "automation-target") {
      onEdgeClick(id); // Function to remove the edge
      toast.error("Automation only connect with Automations!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: "red", color: "white" },
      });
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <AutomationHandle
        type="target"
        position={Position.Left}
        id="automation-target"
        onConnect={(connection) => handleConnect(connection, id)}
      />

      <button onClick={handleEditClick} className="edit-button">
        <div className="cloud gradient">
          <div>
            <MdEdit />
          </div>
        </div>
      </button>
      <SensorForm isVisible={isFormVisible} onClose={handleCloseForm} 
        confirmDelete={() => confirmDelete(id)}/>
      <div className="wrapper gradient">
        <div className="inner">
          <div className="body">
            {data.icon && <div className="icon">{data.icon}</div>}
            <div>
              <div className="title">{data.title}</div>
              {data.subline && <div className="subline">{data.subline}</div>}
            </div>
          </div>
        </div>
      </div>
      <AutomationHandle
        type="source"
        position={Position.Right}
        id="automation-start-source"
        style={{ top: 30, background: "#2a8af6" }}
        onConnect={(connection) => handleConnect(connection, id)}
      />

      <AutomationHandle
        type="source"
        position={Position.Right}
        id="automation-stop-source"
        style={{ top: 50, background: "#e92a67" }}
        onConnect={(connection) => handleConnect(connection, id)}
      />
    </>
  );
});
