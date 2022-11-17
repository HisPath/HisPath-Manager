import axios from "axios";

export const addDepartment = async (departmentId, name) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER}/department`,
    {
      departmentId,
      name,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const getDepartments = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/departments`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const updateDepartment = async (id, departmentId, name) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_SERVER}/department/${id}`,
    {
      departmentId,
      name,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const deleteDepartment = async (id) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_SERVER}/department/${id}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};
