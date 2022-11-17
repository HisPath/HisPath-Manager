import axios from "axios";

export const addMajor = async (majorName) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER}/major`,
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
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/majors`, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response.data;
};

export const updateMajor = async (id, majorName) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_SERVER}/major/${id}`,
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
  const response = await axios.delete(
    `${process.env.REACT_APP_SERVER}/major/${id}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};
