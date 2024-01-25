import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PropTypes from "prop-types";
import { genderOptions, roleOptions } from "../../utilities/constants";
import InputField from "../../UI/inputField";

const tableColumns = [
  { id: "fullname", label: "Full Name", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 150 },
  {
    id: "phone",
    label: "Mobile No",
    minWidth: 150,
    format: (value) => (value ? `+91-${value}` : ""),
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 80,
    format: (value) => genderOptions.find((it) => it.value === value)?.label,
  },
  {
    id: "role",
    label: "Job Role",
    minWidth: 80,
    format: (value) => roleOptions.find((it) => it.value === value)?.label,
  },
  {
    id: "salary",
    label: "Salary",
    minWidth: 50,
    format: (value) => (+value ? `${+value} LPA` : "ND"),
  },
  {
    id: "skills",
    label: "Skill Set",
    minWidth: 150,
    format: (value) => value?.join(", "),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
  },
];

const EmployeeTable = ({ askToUpdateEmp, allEmployees, askToDeleteEmp }) => {
  const [currentEmps, setCurrentEmps] = useState(allEmployees);
  const [searchValue, setSearchValue] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const onSearchHandler = (_event) => {
    setSearchValue(_event.target.value);
    setTimeout(() => {
      searchEmpByNameOrEmail(_event.target.value);
    }, 1000);
  };

  const searchEmpByNameOrEmail = (val) => {
    setPage(0);
    if (!val) return setCurrentEmps(allEmployees);
    if (val && allEmployees && allEmployees.length) {
      const result = allEmployees.filter((it) => it?.fullname?.includes(val));
      setCurrentEmps(result);
    }
  };

  const renderEachCell = (row, column) => {
    console.log(row, column);
    const value = row[column?.id];
    if (column?.id === "salary" && row?.id === "last_row") {
      let calc = currentEmps
        .map((it) => it.salary)
        .reduce((cur, acc) => +cur + +acc);
      return <TableCell>{+calc ? calc + " LPA" : "ND"}</TableCell>;
    } else if (column?.id === "actions") {
      if (row?.id === "last_row") return <TableCell></TableCell>;
      return (
        <TableCell key={column?.id}>
          <IconButton
            onClick={() => askToUpdateEmp(row)}
            color="info"
            title="Edit"
          >
            <EditOutlinedIcon titleAccess="Edit" />
          </IconButton>
          <IconButton
            onClick={() => askToDeleteEmp(row)}
            color="error"
            title="Delete"
          >
            <DeleteOutlineRoundedIcon titleAccess="Delete" />
          </IconButton>
        </TableCell>
      );
    } else {
      return (
        <TableCell key={column?.id} align={column?.align}>
          {column?.format ? column?.format(value) : value}
        </TableCell>
      );
    }
  };

  const renderRows = () => {
    return (
      <>
        {currentEmps
          ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => {
            return (
              <TableRow hover tabIndex={-1} key={row.phone}>
                {tableColumns.map((column) => renderEachCell(row, column))}
              </TableRow>
            );
          })}
        <TableRow hover tabIndex={-1} key={"last_row"}>
          {tableColumns.map((column) =>
            renderEachCell({ id: "last_row" }, column)
          )}
        </TableRow>
      </>
    );
  };

  return (
    <Paper sx={{ margin: "auto", marginBottom: "40px", width: "80%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <InputField
                  label={"Search the table via name and email"}
                  value={searchValue}
                  onChange={onSearchHandler}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              {tableColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{currentEmps?.length > 0 && renderRows()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={currentEmps.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

EmployeeTable.propTypes = {
  askToUpdateEmp: PropTypes.func,
  askToDeleteEmp: PropTypes.func,
  allEmployees: PropTypes.array,
};

export default EmployeeTable;
