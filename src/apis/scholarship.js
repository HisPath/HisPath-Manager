import axios from "axios";

export const approveScholarships = async (formData) => {
  const response = await axios.post("/api/students", formData, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response;
};

export const getScholarshipRegistered = async (semester) => {
  const response = await axios.get(
    `/api/scholarships?approved=false&semester=${semester}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getScholarshipList = async (semester) => {
  const response = await axios.get(
    `/api/scholarships?approved=true&semester=${semester}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getSemesters = async () => {
  const response = await axios.get("/api/scholarship/students", {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response.data;
};

export const getStudentInfo = async () => {
  const response = await axios.get("/api/scholarship/students", {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response.data;
};

export const getScholarshipStudentInfo = async (id, semester) => {
  const response = await axios.get(
    `http://localhost:8080/api/scholarship/activities?studentId=${id}&semester=${semester}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};