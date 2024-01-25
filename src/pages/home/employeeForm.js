import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../../UI/inputField";
import RadioField from "../../UI/radioField";
import SelectField from "../../UI/selectField";
import SliderField from "../../UI/sliderField";
import MultiSelectField from "../../UI/multiSelectField";
import { FormHelperText, Paper, Button, Typography } from "@mui/material";
import {
  genderOptions,
  roleOptions,
  skillSet,
} from "../../utilities/constants";
import { addEmployee, updateEmployee } from "../../services/employeeService";
import PropTypes from "prop-types";

const defaultValues = {
  id: "",
  fullname: "",
  email: "",
  phone: "",
  gender: "",
  role: "",
  salary: 0,
  skills: [],
};

const schema = yup
  .object({
    id: yup.string(),
    fullname: yup
      .string()
      .trim()
      .max(30, "Maximum 30 characters allowed")
      .required("Full name is required"),
    email: yup
      .string()
      .email("Entered email is invalid")
      .trim()
      .max(100, "Maximum 100 characters allowed")
      .required("Email is required"),
    phone: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .positive()
      .min(1000000000, "10 digit number allowed")
      .max(10000000000, "10 digit number allowed")
      .required("Phone number is required"),
    gender: yup.string().required("Gender is required"),
    role: yup.string().required("Job role is required"),
    salary: yup.string(),
    skills: yup
      .array(yup.string())
      .min(1, "At least choose 1 skill set")
      .required(),
  })
  .required();

const EmployeeForm = ({ updateEmp, callEmployees, onComplete }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    register,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (updateEmp) {
      reset(updateEmp);
      if (updateEmp.skills) setSelectedItems(updateEmp.skills);
    }
  }, [updateEmp]);

  const [selectedItems, setSelectedItems] = useState([]);

  // handling the skills selection
  const handleSelect = (value) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };

  // setting skills manually
  useEffect(() => {
    setValue("skills", selectedItems);
  }, [selectedItems, setValue]);

  const onSubmitHandler = (vals) => {
    if (vals?.id) {
      updateEmployee(vals);
      onComplete("update", vals);
    } else {
      addEmployee(vals);
      onComplete("create", vals);
    }
    callEmployees();
    resetForm();
  };

  const resetForm = () => {
    reset(defaultValues);
    setSelectedItems([]);
  };

  return (
    <div>
      <Paper
        elevation={6}
        style={{
          display: "grid",
          gridRowGap: "20px",
          padding: "20px",
          margin: "10px 20%",
        }}
      >
        <input {...register("id")} hidden />

        <Controller
          name={"fullname"}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputField
              onChange={onChange}
              value={value}
              error={error}
              label={"Full Name"}
            />
          )}
        />

        <Controller
          name={"email"}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputField
              onChange={onChange}
              value={value}
              error={error}
              label={"Email"}
            />
          )}
        />

        <Controller
          name={"phone"}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputField
              onChange={onChange}
              value={value}
              error={error}
              label={"Phone Number"}
            />
          )}
        />

        <Controller
          name={"gender"}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <RadioField
              onChange={onChange}
              value={value}
              error={error}
              label={"Gender"}
              options={genderOptions}
            />
          )}
        />

        <Controller
          name={"role"}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <SelectField
              onChange={onChange}
              value={value}
              error={error}
              label={"Job Role"}
              options={roleOptions}
            />
          )}
        />

        <Controller
          name={"salary"}
          control={control}
          render={({ field: { name, value } }) => (
            <SliderField
              name={name}
              value={value}
              setValue={setValue}
              label={"Salary in LPA (optional)"}
              range={{ start: 3, end: 25 }}
            />
          )}
        />

        <MultiSelectField
          selected={selectedItems}
          onChange={handleSelect}
          label={"Skill Set"}
          options={skillSet}
        />
        {errors.skills ? (
          <FormHelperText error>{errors.skills.message}</FormHelperText>
        ) : null}

        <Button
          onClick={handleSubmit(onSubmitHandler)}
          variant={"contained"}
          color="success"
        >
          Submit
        </Button>

        <Button onClick={resetForm} variant={"outlined"}>
          Reset
        </Button>
      </Paper>
    </div>
  );
};

EmployeeForm.propTypes = {
  updateEmp: PropTypes.object,
  callEmployees: PropTypes.func,
  onComplete: PropTypes.func,
};

export default EmployeeForm;
