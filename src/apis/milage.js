import axios from "axios";

export const addMileage = async (
  categoryId,
  name,
  remark,
  weight,
  semester
) => {
  const response = await axios.post(
    "/api/mileage",
    {
      categoryId: categoryId,
      name: name,
      remark: remark,
      weight: +weight,
      semester: semester,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const addMileages = async (formData) => {
  const response = await axios.post("/api/mileage", formData, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response;
};

export const getMileage = async (id) => {
  const response = await axios.get(`/api/mileage/${id}`, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response.data;
};

export const getMileages = async () => {
  const response = await axios.get("/api/mileages", {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response.data;
};

export const updateMileage = async (
  id,
  categoryId,
  name,
  remark,
  weight,
  semester
) => {
  const response = await axios.patch(
    `/api/mileage/${id}`,
    {
      categoryId: categoryId,
      name: name,
      remark: remark,
      weight: +weight,
      semester: semester,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const deleteMileages = async (id) => {
  const response = await axios.delete(`/api/mileage/${id}`, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response;
};

export const addParticipant = async (activityId, name, studentNum) => {
  const response = await axios.post(
    "/api/mileage/student",
    {
      activityId,
      name,
      studentNum,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const addParticipants = async (formData) => {
  const response = await axios.post("/api/mileage/students", formData, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response;
};

export const deleteParticipant = async (activityId, studentId) => {
  const response = await axios.delete(
    "/api/mileage/student",
    {
      data: {
        activityId,
        studentId,
      },
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};
