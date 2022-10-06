import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilterList from '@mui/icons-material/FilterList';

const AxiTest = () => {
  //   const getHeader = () => {
  //     let config = {
  //       headers: {
  //         'Cache-Control': 'no-cache',
  //         'Access-Control-Allow-Origin': '*',
  //       },
  //     };
  //     return config;
  //   };

  //   useEffect(() => {
  //     axios.get('http://localhost:8080/api/notice').then((response) => {
  //       setNotices(response.data).catch(this.handleError);
  //     });
  //   }, [notices]);

  const [notices, setNotices] = useState([]);
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    const fetchNoticeList = async () => {
      try {
        const res1 = await axios.get('http://localhost:8080/api/notice');
        console.log(res1.data);
        setNotices(res1.data);
      } catch (err) {
        console.log('err >> ', err);
      }
    };
    fetchNoticeList();
  }, []);

  // function FilterList() {
  //   temp.forEach(function (data) {
  //     if (data.importance) {
  //       setNotices(current);
  //     }
  //   });
  // }

  return (
    <ul>
      {notices.map((notice) => (
        <li key={notice.id}>
          <div>{notice.id}</div>
          <div>{notice.managerId}</div>
          <div>{notice.managerName}</div>
          <div>{notice.title}</div>
          <div>{notice.content}</div>
          <div>{notice.viewCnt}</div>
          <div>{notice.pubDate}</div>
          <div>{notice.expDate}</div>
        </li>
      ))}
    </ul>
  );
};

export default AxiTest;
