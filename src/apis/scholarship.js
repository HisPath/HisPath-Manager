import axios from "axios";

export const approveScholarships = async (formData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER}/students`,
    formData,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const getScholarshipRegistered = async (semester) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/scholarships?approved=false&semester=${semester}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getScholarshipList = async (semester) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/scholarships?approved=true&semester=${semester}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getSemesters = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/scholarship/students`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getStudentInfo = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/scholarship/students`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getScholarshipStudentInfo = async (id, semester) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/scholarship/activities?studentId=${id}&semester=${semester}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getScholarshipByGrade = async (semester) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/chart/grade?semester=${semester}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getScholarshipByDepartment = async (
  semester,
  grade,
  department
) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/chart/department?semester=${semester}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getScholarshipAverage = async (semester) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/chart/weight?semester=${semester}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};
