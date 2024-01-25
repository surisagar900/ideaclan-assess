import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormLabel, Slider } from "@mui/material";

const SliderField = ({ name, value, setValue, label, range }) => {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    if (sliderValue) setValue(name, sliderValue);
  }, [name, setValue, sliderValue]);

  const handleChange = (_event, newValue) => {
    setSliderValue(newValue);
  };

  return (
    <>
      <FormLabel component="legend">{label}</FormLabel>
      <Slider
        value={+value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={range.start}
        max={range.end}
        step={1}
        valueLabelFormat={(it) => `${it} LPA`}
      />
    </>
  );
};

SliderField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  label: PropTypes.string,
  setValue: PropTypes.func,
  range: PropTypes.object,
};
export default SliderField;
