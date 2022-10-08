// import { Component, useState } from 'react';
// import { Box, Button, Container, Modal, styled, Typography } from '@mui/material';
// import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
// import OpenInFullIcon from '@mui/icons-material/OpenInFull';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/DeleteOutline';
// import { useRecoilState } from 'recoil';
import Notice_TabTT from '../components/notice/Notice_TabTT';
import Header from '../components/common/Header';
import TT from '../components/notice/tables/TT';
// const Header = styled('div')({
//   height: '15%',
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'flex-end',
//   paddingBottom: 24,
// });

function Notice() {
  return (
    <div>
      {/* <Notice_TabTT /> */}
      <TT />
    </div>
  );
}

export default Notice;
