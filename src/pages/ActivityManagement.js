// import { useEffect, useState } from "react";
// import {
//   Backdrop,
//   Box,
//   CircularProgress,
//   Container,
//   Modal,
//   styled,
//   Typography,
// } from "@mui/material";
// import { useRecoilState } from "recoil";
// import { mileageState } from "../atom";
// import ViewMileage from "../components/Mileage/ViewMileage";
// import ParticipantTable from "../components/Mileage/ParticipantTable";
// import { SelectColumnFilter } from "../components/Mileage/filters";
// import { getMileages } from "../apis/milage";
// import { Dialog } from "@mui/material";
// import { Button } from "@mui/material";
// import DummyTable from "../components/Mileage/DummyTable";

// const Header = styled("div")({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "flex-end",
//   paddingBottom: 24,
// });

// const Article = styled(Box)({
//   height: "calc(100vh - 200px)",
// });

// const columns = [
//   {
//     accessor: "semester",
//     Header: "신청시기",
//     Filter: SelectColumnFilter,
//   },
//   {
//     accessor: "categoryName",
//     Header: "학생 이름",
//     Filter: SelectColumnFilter,
//   },
//   {
//     accessor: "studentNum",
//     Header: "학번",
//   },
//   {
//     accessor: "name",
//     Header: "활동명",
//   },
//   {
//     accessor: "remark",
//     Header: "활동비고",
//   },
// ];

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   width: 450,
//   p: 3.5,
//   borderRadius: 1,
// };

// function MileageParticipant() {
//   const [init, setInit] = useState(false);
//   const [mileages, setMileages] = useRecoilState(mileageState);
//   const [currentId, setCurrentId] = useState();
//   const [openView, setOpenView] = useState(false);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [apply, setApply] = useState(false);
//   const [flag, setFlag] = useState(true);
//   const [cancel, setCancel] = useState(false);

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//   };

//   const handleOpenView = (id) => {
//     setCurrentId(id);
//     setOpenView(true);
//   };
//   const handleCloseView = () => {
//     // setCancel(cancel);
//     setOpenView(false);
//   };

//   const handleCancelCloseView = () => {
//     setCancel(false);
//     setOpenView(false);
//   };

//   const approveAndClose = () => {
//     setApply(true);
//     setFlag(false);
//     console.log(cancel);
//     setCancel(!cancel);
//     console.log(cancel);
//     setOpenView(false);
//   };

//   const cancelApproveAndClose = () => {
//     setApply(false);
//     setFlag(true);
//     setCancel(!cancel);
//     setOpenView(false);
//   };

//   const loadData = async () => {
//     const data = await getMileages();
//     setMileages(data);
//     setInit(true);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   return (
//     <Container>
//       <Header>
//         <Typography variant="h5" fontWeight={600}>
//           마일리지 활동인정 신청자 관리
//         </Typography>
//       </Header>
//       <Article>
//         {init ? (
//           <DummyTable
//             columns={columns}
//             data={mileages}
//             handleOpenView={handleOpenView}
//             cancel={cancel}
//           />
//         ) : (
//           ""
//         )}
//       </Article>
//       <Modal open={openView} onClose={handleCloseView}>
//         <Box sx={modalStyle}>
//           {flag ? (
//             <>
//               <Typography variant="h6" component="h2">
//                 정말 허가하시겠습니까?
//               </Typography>
//               <Button onClick={handleCloseView} autoFocus>
//                 닫기
//               </Button>
//               <Button onClick={approveAndClose}>허가</Button>
//             </>
//           ) : (
//             <>
//               <Typography variant="h6" component="h2">
//                 정말 허가를 취소하시겠습니까?
//               </Typography>
//               <Button onClick={handleCloseView} autoFocus>
//                 닫기
//               </Button>
//               <Button onClick={cancelApproveAndClose}>허가 취소</Button>
//             </>
//           )}

//           {/* <ViewMileage
//             id={currentId}
//             handleClose={handleCloseView}
//             loadData={loadData}
//           /> */}
//         </Box>
//       </Modal>
//     </Container>
//   );
// }

// export default MileageParticipant;
