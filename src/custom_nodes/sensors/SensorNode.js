import { useState, memo } from "react";
import { Position } from "reactflow";
import { MdEdit } from "react-icons/md";
import CustomHandle from "../CustomHandle";
import { useNodeHandlers } from "../useNodeHandlers";
import Form from "../Forms/Form";

// Actuator component
export default memo(({ id, data, isConnectable }) => {
  const [isFormVisible, setFormVisible] = useState(false);

  const {
    formRef,
    handleEditClick,
    handleCloseForm,
    confirmDelete,
    handleConnect,
    handleUpdateNodeData,
    setHandleClose,
  } = useNodeHandlers(id, setFormVisible);

  return (
    <>
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
        onCloseOutside={setHandleClose} // Pass setHandleClose to Form
        isType={"Sensor"} // Pass Type to Form
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
      <CustomHandle
        type="source"
        position={Position.Right}
        id="source-sensor"
        onConnect={(connection) => handleConnect(connection, id, data)}
      />
    </>
  );
});
