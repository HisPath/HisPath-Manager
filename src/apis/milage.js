import axios from "axios";

export const addMileage = async (categoryId, name, remark, weight, semester) => {
    const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/mileage`,
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
    const response = await axios.post(`${process.env.REACT_APP_SERVER}/mileages`, formData, {
        headers: { Authorization: localStorage.getItem("TOKEN") },
    });
    return response;
};

export const getMileage = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER}/mileage/${id}`, {
        headers: { Authorization: localStorage.getItem("TOKEN") },
    });
    return response.data;
};

export const getMileages = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER}/mileages`, {
        headers: { Authorization: localStorage.getItem("TOKEN") },
    });
    return response.data;
};

export const updateMileage = async (id, categoryId, name, remark, weight, semester) => {
    const response = await axios.put(
        `${process.env.REACT_APP_SERVER}/mileage/${id}`,
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
    const response = await axios.delete(`${process.env.REACT_APP_SERVER}/mileage/${id}`, {
        headers: { Authorization: localStorage.getItem("TOKEN") },
    });
    return response;
};

export const addParticipant = async (activityId, name, studentNum) => {
    const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/mileage/student`,
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
    const response = await axios.post(`${process.env.REACT_APP_SERVER}/mileage/students`, formData, {
        headers: { Authorization: localStorage.getItem("TOKEN") },
    });
    return response;
};

export const deleteParticipant = async (activityId, studentId) => {
    const response = await axios.delete(`${process.env.REACT_APP_SERVER}/mileage/student`, {
        headers: { Authorization: localStorage.getItem("TOKEN") },
        data: {
            activityId,
            studentId,
        },
    });
    return response;
};
