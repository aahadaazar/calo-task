import React, { useState } from "react";
import { Fab, Modal, Box, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "react-query";
import { createJob } from "../utils/queryClient";
import { useNavigate } from "react-router-dom";

// Validation schema
const validationSchema = yup.object({
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Job description is required"),
});

const FloatingButtonWithModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      mutate(values);
      //   try {
      //     const response = await mutate(values);
      //     console.log("res", response);
      //     setOpen(false);
      //     resetForm();
      //   } catch (err) {
      //     console.log("err", err);
      //   }
    },
  });

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const { mutate, isLoading } = useMutation(createJob, {
    onSuccess: (response) => {
      console.log("response", response);
      navigate(`/job/${response.uuid}`);
      handleClose();
    },
    onError: (error) => {
      console.log(error.response.data);
      console.log(error.response.status);
    },
  });

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        style={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            id="title"
            name="title"
            label="Job Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            fullWidth
          />
          <TextField
            id="description"
            name="description"
            label="Job Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={!(formik.isValid && formik.dirty) || isLoading}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default FloatingButtonWithModal;
