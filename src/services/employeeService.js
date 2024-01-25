import employees from "../utilities/emps.json";

export const getEmployees = () => {
  return employees;
};

export const addEmployee = (model) => {
  model = {
    ...model,
    id: `${model.phone.toString().substr(0, 3)}_${model.fullname.substr(0, 3)}`,
  };
  let obj = getEmployees();
  obj.push(model);
  JSON.stringify(obj);
  return getEmployees();
};

export const updateEmployee = (model) => {
  let obj = getEmployees();
  let updatingObjIndex = obj.findIndex((it) => it.id === model.id);
  if (updatingObjIndex >= 0) {
    obj[updatingObjIndex] = model;
  } else {
    addEmployee(model);
  }
  JSON.stringify(obj);
  return getEmployees();
};

export const deleteEmployee = (model) => {
  let obj = getEmployees();
  let updatingObjIndex = obj.findIndex((it) => it.id === model.id);
  if (updatingObjIndex >= 0) {
    obj.splice(updatingObjIndex, 1);
  }
  JSON.stringify(obj);
  return getEmployees();
};
