import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { MdDelete, MdAdd, MdRemove } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function AutomationForm({
  isVisible,
  onClose,
  confirmDelete,
  formRef,
  initialData, // Initial data for the form fields
  onUpdate, // Function to update the node data
  onCloseOutside, // New prop for handling outside clicks
}) {
  const getInitialData = (data) => {
    return {
      title: data?.title ?? "Automation",
      condition: data?.condition ?? "",
      enabled: data?.enabled ?? true,
      continuous: data?.continuous ?? false,
      actions: initialData?.actions ?? [{ key: "", value: "" }],
      starts: data?.starts ?? "",
      stops: data?.stops ?? "",
    };
  };

  const [formData, setFormData] = useState(getInitialData(initialData));

  
  const handleChange = (e, index = null, field = null) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Handle switches
      setFormData({ ...formData, [name]: checked });
    } else if (index != null && field) {
      // Handle action fields
      const updatedActions = [...formData.actions];
      updatedActions[index][field] = value;
      setFormData({ ...formData, actions: updatedActions });
    } else {
    setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddAction = () => {
    setFormData({
      ...formData,
      actions: [...formData.actions, { key: "", value: "" }],
    });
  };

  const handleRemoveAction = (index) => {
    const updatedActions = [...formData.actions];
    updatedActions.splice(index, 1);
    setFormData({ ...formData, actions: updatedActions });
  };

  const handleClose = useCallback(() => {
    onUpdate(formData); // Call the update function with the new form data
    onClose(); // Then close the form
  }, [formData, onUpdate, onClose]);

  // Pass handleClose to the onCloseOutside prop
  useEffect(() => {
    if (onCloseOutside) {
      onCloseOutside(handleClose);
    }
  }, [handleClose, onCloseOutside]);

  if (!isVisible) return null;

  return (
    <div className="automation-form" ref={formRef}>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        margin="normal"
        fullWidth
        variant="outlined"
        InputLabelProps={{
          style: { color: "white" },
        }}
        InputProps={{
          style: { color: "white" },
        }}
        sx={{
          "& label.Mui-focused": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
      <TextField
        label="Condition"
        name="condition"
        value={formData.condition}
        onChange={handleChange}
        margin="normal"
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        InputLabelProps={{
          style: { color: "white" },
        }}
        InputProps={{
          style: { color: "white" },
        }}
        sx={{
          "& label.Mui-focused": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={formData.enabled}
              onChange={handleChange}
              name="enabled"
            />
          }
          label="Enabled"
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.continuous}
              onChange={handleChange}
              name="continuous"
            />
          }
          label="Continuous"
        />
      </FormGroup>
      <div>
        <label>Actions:</label>
        {formData.actions.map((action, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <TextField
              label="Key"
              value={action.key}
              onChange={(e) => handleChange(e, index, "key")}
              variant="outlined"
              style={{ flex: 3 }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
              }}
              sx={{
                "& label.Mui-focused": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <TextField
              label="Value"
              value={action.value}
              onChange={(e) => handleChange(e, index, "value")}
              variant="outlined"
              style={{ flex: 1 }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
              }}
              sx={{
                "& label.Mui-focused": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <Button onClick={() => handleRemoveAction(index)}>
              <MdRemove />
            </Button>
          </div>
        ))}
        <Button onClick={handleAddAction} startIcon={<MdAdd />}>
          Add Action
        </Button>
      </div>
      <TextField
        label="Starts"
        name="starts"
        value={formData.starts}
        onChange={handleChange}
        margin="normal"
        fullWidth
        variant="outlined"
        InputLabelProps={{
          style: { color: "white" },
        }}
        InputProps={{
          style: { color: "white" },
        }}
        sx={{
          "& label.Mui-focused": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
      <TextField
        label="Stops"
        name="stops"
        value={formData.stops}
        onChange={handleChange}
        margin="normal"
        fullWidth
        variant="outlined"
        InputLabelProps={{
          style: { color: "white" },
        }}
        InputProps={{
          style: { color: "white" },
        }}
        sx={{
          "& label.Mui-focused": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          startIcon={<IoClose />}
        >
          Close
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "red",
            color: "white",
            "&:hover": { backgroundColor: "darkred" },
          }}
          onClick={confirmDelete}
          startIcon={<MdDelete />}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
