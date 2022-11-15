import axios from "axios";

export const addStudent = async (
  categoryId,
  departmentId,
  studentNum,
  semester,
  name,
  phone,
  email,
  profile,
  blog,
  githubId,
  readme,
  major1Id,
  major2Id
) => {
  const response = await axios.post(
    "/api/student",
    {
      categoryId: categoryId,
      departmentId: departmentId,
      studentNum: studentNum,
      semester: semester,
      name: name,
      phone: phone,
      email: email,
      profile: profile,
      blog: blog,
      githubId: githubId,
      readme: readme,
      major1Id: major1Id,
      major2Id: major2Id,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const addStudents = async (formData) => {
  const response = await axios.post("/api/students", formData, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response;
};

export const getStudents = async () => {
  const response = await axios.get("/api/students", {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response.data;
};

export const updateStudent = async (
  id,
  departmentId,
  studentNum,
  semester,
  name,
  phone,
  email,
  profile,
  blog,
  githubId,
  readme,
  major1Id,
  major2Id
) => {
  const response = await axios.put(
    `/api/student/${id}`,
    {
      departmentId: departmentId,
      studentNum: studentNum,
      semester: semester,
      name: name,
      phone: phone,
      email: email,
      profile: profile,
      blog: blog,
      githubId: githubId,
      readme: readme,
      major1Id: major1Id,
      major2Id: major2Id,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const deleteStudent = async (id) => {
  const response = await axios.delete(`/api/student/${id}`, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response;
};
