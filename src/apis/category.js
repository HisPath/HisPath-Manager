import axios from "axios";

export const addCategory = async (name) => {
  const response = await axios.post(
    "/api/category",
    {
      name,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const getCategories = async () => {
  const response = await axios.get("/api/categories", {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response.data;
};

export const updateCategory = async (id, name) => {
  const response = await axios.put(
    `/api/category/${id}`,
    {
      name,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`/api/category/${id}`, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response;
};
