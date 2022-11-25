import axios from "axios";

export const addStudent = async (
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
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER}/student`,
    {
      id: id,
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
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER}/students`,
    formData,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const getStudents = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/students`, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response.data;
};

export const updateStudent = async (id, data) => {
  const response = await axios.put(
    `${process.env.REACT_APP_SERVER}/student/${id}`,
    data,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};

export const deleteStudent = async (id) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_SERVER}/student/${id}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response;
};
