import React from "react";
import PropTypes from "prop-types";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  FormControl,
  FormLabel,
} from "@mui/material";

const RadioField = ({ error, onChange, label, value, options }) => {
  return (
    <>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <RadioGroup row value={value} onChange={onChange}>
          {options?.map((it) => (
            <FormControlLabel
              key={it.value}
              value={it.value}
              label={it.label}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
    </>
  );
};

RadioField.propTypes = {
  error: PropTypes.any,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

export default RadioField;
