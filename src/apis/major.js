import axios from "axios";

export const addMajor = async (majorName) => {
  const response = await axios.post(
    "/api/major",
    {
      majorName,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const getMajors = async () => {
  const response = await axios.get("/api/majors", {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response.data;
};

export const updateMajor = async (id, majorName) => {
  const response = await axios.patch(
    `/api/major/${id}`,
    {
      majorName: majorName,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const deleteMajor = async (id) => {
  const response = await axios.delete(`/api/major/${id}`, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response;
};
