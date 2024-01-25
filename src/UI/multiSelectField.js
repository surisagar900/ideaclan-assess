import React from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

const MultiSelectField = ({ selected, onChange, label, options }) => {
  return (
    <FormControl size={"small"} variant={"outlined"}>
      <FormLabel>{label}</FormLabel>
      <div>
        {options.map((option) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={selected.includes(option.value)}
                onChange={() => onChange(option.value)}
              />
            }
            label={option.label}
            key={option.value}
          />
        ))}
      </div>
    </FormControl>
  );
};

MultiSelectField.propTypes = {
  selected: PropTypes.array,
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

export default MultiSelectField;
