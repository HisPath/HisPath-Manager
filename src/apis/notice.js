import axios from 'axios';

export const addNotice = async (desc, endDate, managerId, important, startDate, title, viewCnt) => {
  const ret = await axios.post(
    `${process.env.REACT_APP_SERVER}/notice/add`,
    {
      content: `${desc}`,
      expDate: `${endDate.toISOString().split('T')[0]}`,
      managerId: `${managerId}`,
      importance: `${important}`,
      pubDate: `${startDate.toISOString().split('T')[0]}`,
      title: `${title}`,
      viewCnt: `${viewCnt}`,
    },
    {
      headers: { Authorization: localStorage.getItem('TOKEN') },
    },
  );
  return ret.data;
};

export const editNotice = async (
  noticeId,
  desc,
  endDate,
  managerId,
  important,
  startDate,
  title,
  viewCnt,
) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_SERVER}/notice/${noticeId}`,
    {
      content: `${desc}`,
      expDate: `${endDate.toISOString().split('T')[0]}`,
      managerId: `${managerId}`,
      importance: `${important}`,
      pubDate: `${startDate.toISOString().split('T')[0]}`,
      title: `${title}`,
      viewCnt: `${viewCnt}`,
    },
    {
      headers: { Authorization: localStorage.getItem('TOKEN') },
    },
  );
  return response.data;
};

export const deleteNotice = async (noticeId) => {
  await axios.delete(`${process.env.REACT_APP_SERVER}/notice/${noticeId}`, {
    headers: { Authorization: localStorage.getItem('TOKEN') },
  });
};

export const getNoticeById = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/notice/${id}`, {
    headers: { Authorization: localStorage.getItem('TOKEN') },
  });
  return response.data;
};

export const getNotices = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/notice`, {
    headers: { Authorization: localStorage.getItem('TOKEN') },
  });
  return response.data;
};
