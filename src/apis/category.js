import axios from "axios";

export const addCategory = async (categoryId, name) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER}/category`,
    {
      categoryId,
      name,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const getCategories = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/categories`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const updateCategory = async (id, categoryId, name) => {
  const response = await axios.put(
    `${process.env.REACT_APP_SERVER}/category/${id}`,
    {
      categoryId,
      name,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_SERVER}/category/${id}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};
