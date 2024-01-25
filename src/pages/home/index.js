import React, { useEffect, useState } from "react";
import EmployeeForm from "./employeeForm";
import EmployeeTable from "./employeeTable";
import { deleteEmployee, getEmployees } from "../../services/employeeService";
import SnackBar from "../../UI/snackBar";

import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Home = () => {
  const [updateEmp, setUpdateEmp] = useState();
  const [employees, setEmployees] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    callEmployees();
  }, []);

  const callEmployees = () => {
    setEmployees([]);
    setTimeout(() => {
      setEmployees(getEmployees());
    }, 1000);
  };

  const askToUpdateEmp = (model) => {
    expansionHandler(true);
    setUpdateEmp(model);
  };

  const askToDeleteEmp = (model) => {
    expansionHandler(true);
    deleteEmployee(model);
    onComplete("delete", model);
    callEmployees();
  };

  const onComplete = (type, model) => {
    switch (type) {
      case "update":
        setMessage(
          `Employee ${model?.fullname}'s profile updated successfully`
        );
        break;
      case "create":
        setMessage(
          `Employee ${model?.fullname}'s profile created successfully`
        );
        break;
      case "delete":
        setMessage(
          `Employee ${model?.fullname}'s profile deleted successfully`
        );
        break;
      default:
        setMessage(`Employee ${model?.fullname}'s profile`);
        break;
    }
    setOpenSnack(true);
    expansionHandler(false);
    setUpdateEmp(null);
  };
  const expansionHandler = (val) => {
    debugger;
    if (val === true || val === false) setExpanded(val);
    else setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={expansionHandler}
        sx={{ margin: "20px 20%" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ textAlign: "center" }}
        >
          <h2>Employee {updateEmp ? "Update" : "Entry"} Form</h2>
        </AccordionSummary>
        <AccordionDetails>
          <EmployeeForm
            callEmployees={callEmployees}
            updateEmp={updateEmp}
            onComplete={onComplete}
          />
        </AccordionDetails>
      </Accordion>

      {employees?.length !== 0 && (
        <EmployeeTable
          askToUpdateEmp={askToUpdateEmp}
          askToDeleteEmp={askToDeleteEmp}
          allEmployees={employees}
        />
      )}
      <SnackBar
        open={openSnack}
        message={message}
        close={() => {
          setOpenSnack(false);
          setMessage("");
        }}
      />
    </div>
  );
};

export default Home;
