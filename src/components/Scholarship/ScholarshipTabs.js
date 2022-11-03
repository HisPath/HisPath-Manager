// import * as React from "react";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import ScholarshipListTable from "./ScholarshipListTable";
// import { useEffect, useState } from "react";
// import { Backdrop } from "@mui/material";
// import { CircularProgress } from "@mui/material";
// import { SelectColumnFilter } from "./filters";
// import { useRecoilState } from "recoil";
// import { scholarshipState } from "../../atom";
// import { styled } from "@mui/system";
// import axios from "axios";
// import ScholarshipRegisteredTable from "./ScholarshipRegisteredTable";
// import { Modal } from "@mui/material";
// import { InputLabel } from "@mui/material";
// import ViewScholarshipRegistered from "./ViewScholarshipRegistered";
// import { FormControl } from "@mui/material";
// import { Select } from "@mui/material";
// import { MenuItem } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { GridActionsCellItem } from "@mui/x-data-grid";
// import { GridToolbar } from "@mui/x-data-grid";

// const Article = styled(Box)({
//   height: "calc(100vh - 200px)",
// });

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   width: 800,
//   p: 3.5,
//   borderRadius: 4,
// };

// const scholarshipRegisterColumns = [
//   {
//     field: "id",
//     headerName: "번호",
//     width: 60,
//   },
//   {
//     field: "studentNum",
//     headerName: "학번",
//     width: 150,
//   },
//   {
//     field: "name",
//     headerName: "이름",
//     width: 120,
//   },
//   {
//     field: "departmentName",
//     headerName: "학부",
//     width: 200,
//   },
//   {
//     field: "major1Name",
//     headerName: "1전공",
//     width: 180,
//   },
//   {
//     field: "major2Name",
//     headerName: "2전공",
//     width: 180,
//   },
//   {
//     field: "semester",
//     headerName: "학기",
//     width: 100,
//   },
// ];

// const scholarshipListColumns = [
//   {
//     accessor: "departmentName",
//     Header: "학부",
//     Filter: SelectColumnFilter,
//   },
//   // {
//   //   accessor: "major1Name",
//   //   Header: "1전공",
//   //   Filter: SelectColumnFilter,
//   // },
//   // {
//   //   accessor: "major2Name",
//   //   Header: "2전공",
//   //   Filter: SelectColumnFilter,
//   // },
//   {
//     accessor: "name",
//     Header: "이름",
//   },
//   {
//     accessor: "studentNum",
//     Header: "학번",
//   },
//   {
//     accessor: "totalWeight",
//     Header: "가중치",
//   },
//   {
//     accessor: "phone",
//     Header: "전화번호",
//   },
//   {
//     accessor: "email",
//     Header: "이메일",
//   },
// ];

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// export default function BasicTabs() {
//   const [value, setValue] = React.useState(0);

//   const [init, setInit] = useState(false);
//   const [scholarships, setScholarships] = useRecoilState(scholarshipState);
//   const [currentId, setCurrentId] = useState();
//   const [openView, setOpenView] = useState(false);
//   const handleOpenView = (id) => {
//     setCurrentId(id);
//     setOpenView(true);
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleCloseView = () => setOpenView(false);
//   const loadData = () => {
//     axios
//       .get(`/api/scholarships?approved=true&semester=2022-2`)
//       .then(function (response) {
//         setScholarships(response.data);
//         setInit(true);
//       });
//   };
//   useEffect(() => {
//     loadData();
//   }, []);

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           aria-label="basic tabs example"
//         >
//           <Tab label="마일리지 장학금 신청자 관리" {...a11yProps(0)} />
//           <Tab label="마일리지 장학금 수혜자 목록" {...a11yProps(1)} />
//         </Tabs>
//       </Box>
//       <TabPanel value={value} index={0}>
//         <Article>
//           {/* <DataGrid
//             components={{
//               Toolbar: GridToolbar,
//               NoRowsOverlay: CustomNoRowsOverlay,
//             }}
//             componentsProps={{
//               toolbar: {
//                 showQuickFilter: true,
//                 quickFilterProps: { debounceMs: 500 },
//                 printOptions: { disableToolbarButton: true },
//               },
//             }}
//             // rows={students}
//             columns={[
//               ...columns,
//               {
//                 field: "actions",
//                 type: "actions",
//                 headerName: "기능",
//                 width: 60,
//                 cellClassName: "actions",
//                 getActions: ({ id }) => {
//                   return [
//                     <GridActionsCellItem
//                       icon={<OpenInFullIcon />}
//                       label="View"
//                       onClick={() => {
//                         setCurrentId(+id);
//                         handleOpenView();
//                       }}
//                     />,
//                   ];
//                 },
//               },
//             ]}
//             pageSize={20}
//             rowsPerPageOptions={[20]}
//             disableColumnMenu
//             disableDensitySelector
//             hideFooterSelectedRowCount
//           /> */}
//         </Article>
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         <Article>
//           {init ? (
//             <ScholarshipListTable
//               columns={scholarshipListColumns}
//               data={scholarships}
//               handleOpenView={handleOpenView}
//             />
//           ) : (
//             <Backdrop
//               sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//               open={true}
//             >
//               <CircularProgress color="inherit" />
//             </Backdrop>
//           )}
//         </Article>
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         Item Three
//       </TabPanel>

//       <Modal open={openView} onClose={handleCloseView}>
//         <Box sx={modalStyle}>
//           <Typography variant="h6" component="h2">
//             (2022-2) 마일리지 목록
//           </Typography>
//           <InputLabel>[전산전자] 박성진 (21700266)</InputLabel>
//           <ViewScholarshipRegistered
//             id={currentId}
//             handleClose={handleCloseView}
//           />
//         </Box>
//       </Modal>
//     </Box>
//   );
// }
