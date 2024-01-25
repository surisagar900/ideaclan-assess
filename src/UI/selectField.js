import React from "react";
import PropTypes from "prop-types";
import {
  MenuItem,
  FormHelperText,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

const SelectField = ({ error, onChange, value, options, label }) => {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select onChange={onChange} value={value} label={label}>
          {options?.map((it) => (
            <MenuItem key={it.value} value={it.value}>
              {it.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
    </Box>
  );
};

SelectField.propTypes = {
  error: PropTypes.any,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

export default SelectField;
