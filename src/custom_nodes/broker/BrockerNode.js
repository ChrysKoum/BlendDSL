import { useState, memo } from "react";
import { Handle, Position } from "reactflow";
import { MdEdit } from "react-icons/md";
import { useNodeHandlers } from "../useNodeHandlers";
import Form from "../Form";

// Actuator component
export default memo(({ id, data, isConnectable }) => {
  const [isFormVisible, setFormVisible] = useState(false);

  const {
    formRef,
    handleEditClick,
    handleCloseForm,
    confirmDelete,
    handleUpdateNodeData,
  } = useNodeHandlers(id, isFormVisible, setFormVisible);

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        id="target-turbo"
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <button onClick={handleEditClick} className="edit-button">
        <div className="cloud gradient">
          <div>
            <MdEdit />
          </div>
        </div>
      </button>
      <Form
        isVisible={isFormVisible}
        onClose={handleCloseForm}
        confirmDelete={() => confirmDelete(id)}
        formRef={formRef} // Pass the ref to the form
        initialData={data} // Pass the initial data for the form
        onUpdate={handleUpdateNodeData}
      />
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
    </>
  );
});
