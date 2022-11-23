import axios from "axios";

export const getManagers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/managers`, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response.data;
};

export const approveManagerSuper = async (level, currentId) => {
  const response = await axios.put(
    `${process.env.REACT_APP_SERVER}/manager/approve`,
    {
      level: 2,
      managerId: currentId,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const approveManagerNormal = async (level, currentId) => {
  const response = await axios.put(
    `${process.env.REACT_APP_SERVER}/manager/approve`,
    {
      level: 1,
      managerId: currentId,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const updateManager = async (id, data) => {
  const response = await axios.put(
    `${process.env.REACT_APP_SERVER}/manager/${id}`,
    data,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};
