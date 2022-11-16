import axios from "axios";

export const addDepartment = async (departmentId, name) => {
  const response = await axios.post(
    "/api/department",
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
  const response = await axios.get("/api/departments", {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response.data;
};

export const updateDepartment = async (id, departmentId, name) => {
  const response = await axios.put(
    `/api/department/${id}`,
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
  const response = await axios.delete(`/api/department/${id}`, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response;
};
