import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const InputField = ({ error, onChange, value, label }) => {
  return (
    <TextField
      helperText={error ? error.message : null}
      size="small"
      error={!!error}
      onChange={onChange}
      value={"" + value}
      label={label}
      variant="outlined"
    />
  );
};

InputField.propTypes = {
  error: PropTypes.any,
  value: PropTypes.string || PropTypes.number,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputField;
