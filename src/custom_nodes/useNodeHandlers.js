// useNodeHandlers.js
import { useRef, useEffect } from "react";
import { useReactFlow } from "reactflow";
import { toast } from "react-toastify";

export function useNodeHandlers(id, isVisible, setIsVisible) {
  const { setEdges, setNodes } = useReactFlow();
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [id, setIsVisible]);

  const handleEditClick = (event) => {
    event.preventDefault();
    setIsVisible(true);
  };

  const handleCloseForm = () => {
    setIsVisible(false);
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

  const onEdgeClick = (edgeId) => {
    setEdges((edges) => edges.filter((edge) => edge.id !== edgeId));
  };

   const handleConnect = (connection, id, data) => {
     if (connection.targetHandle === "automation-target") {
       onEdgeClick(id); // Function to remove the edge
       toast.error(`${data.title} and Automation cannot connect!`, {
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

  return {
    formRef,
    handleEditClick,
    handleCloseForm,
    onDeleteNode,
    confirmDelete,
    onEdgeClick,
    handleConnect,
  };
}
