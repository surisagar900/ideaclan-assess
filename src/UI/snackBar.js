import React from "react";
import PropTypes from "prop-types";

import { Snackbar, Alert } from "@mui/material";

SnackBar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  close: PropTypes.func,
};

export default function SnackBar({ open, message, close }) {
  const handleClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    close();
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
