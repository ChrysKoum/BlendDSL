import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Form({
  isVisible,
  onClose,
  confirmDelete,
  formRef,
  initialData, // Initial data for the form fields
  onUpdate, // New prop for updating the node data
  onCloseOutside, // New prop for handling outside clicks
}) {
  const getInitialData = (data) => {
    return {
      title: data?.title ?? "Node_Title",
      subline: data?.subline ?? "Node_Subline",
      freq: data?.freq ?? 3,
      topic: data?.topic ?? "Topic_Name",
      broker: data?.broker ?? "Broker_Name",
    };
  };

  const [formData, setFormData] = useState(getInitialData(initialData));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (event, newValue) => {
    setFormData({ ...formData, freq: newValue });
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
    <div sx={{ padding: 2 }} ref={formRef} className="form">
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
          inputProps: {
            maxLength: 25, // Restricts input to a maximum of 25 characters
          },
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
        label="Subline"
        name="subline"
        value={formData.subline}
        onChange={handleChange}
        margin="normal"
        fullWidth
        variant="outlined"
        InputLabelProps={{
          style: { color: "white" },
        }}
        InputProps={{
          style: { color: "white" },
          inputProps: {
            maxLength: 25, // Restricts input to a maximum of 25 characters
          },
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
      <Typography gutterBottom>Frequency (Hz): {formData.freq}</Typography>
      <Slider
        value={typeof formData.freq === "number" ? formData.freq : 0}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        min={1}
        max={10}
        name="freq"
      />
      <TextField
        label="Topic"
        name="topic"
        value={formData.topic}
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
        label="Broker"
        name="broker"
        value={formData.broker}
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
      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
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
          color="error"
          onClick={confirmDelete}
          startIcon={<MdDelete />}
        >
          Delete
        </Button>
      </Box>
    </div>
  );
}
