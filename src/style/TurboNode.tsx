import { useState, memo, ReactNode } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { MdEdit } from "react-icons/md";

export type TurboNodeData = {
  title: string;
  icon?: ReactNode;
  subline?: string;
};

// Form component (placeholder for your detailed form)
const SensorForm = ({ isVisible, onClose }) => {
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
      <div>
        <button className="wrapper gradient" onClick={onClose}>
          <span>Close</span>
        </button>
      </div>
    </div>
  );
};

export default memo(({ id, data, isConnectable }: NodeProps<TurboNodeData>) => {
  const [isFormVisible, setFormVisible] = useState(false);

  const handleEditClick = (event) => {
    event.preventDefault();
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        id="target-turbo"
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <a href="#" onClick={handleEditClick}>
        <div className="cloud gradient">
          <div>
            <MdEdit />
          </div>
        </div>
      </a>
      <SensorForm isVisible={isFormVisible} onClose={handleCloseForm} />
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
      <Handle
        type="source"
        position={Position.Right}
        id="source-turbo"
        isConnectable={isConnectable}
      />
    </>
  );
});
