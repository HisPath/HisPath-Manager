import axios from "axios";

export const getDashboardInfo = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/manager/dashboard`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};
