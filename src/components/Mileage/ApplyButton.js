import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { blue, red } from "@mui/material/colors";
import axios from "axios";
import { useEffect } from "react";
// import { applyMyActivity } from "../../api/mileage";
import { Modal } from "@mui/material";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 450,
  p: 3.5,
  borderRadius: 1,
};

export default function ApplyButton({ id }) {
  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = useState(true);
  const [cancel, setCancel] = useState(false);
  const [openView, setOpenView] = useState(false);

  let cond;
  const approveAndClose = () => {
    // setApply(true);
    setFlag(false);
    console.log(cancel);
    setCancel(!cancel);
    console.log(cancel);
    setOpenView(false);
  };

  const cancelApproveAndClose = () => {
    // setApply(false);
    setFlag(true);
    setCancel(!cancel);
    setOpenView(false);
  };
  const handleOpenView = (id) => {
    // setCurrentId(id);
    setOpenView(true);
  };
  const handleCloseView = () => {
    // setCancel(cancel);
    setOpenView(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   const clickApply = (id) => {
  //     // setApply(true);
  //     applyMyActivity(id);
  //   };

  // console.log("props : " + test);
  return (
    <div>
      <Checkbox onClick={handleOpenView} checked={cancel} />

      <Modal open={openView} onClose={handleCloseView}>
        <Box sx={modalStyle}>
          {flag ? (
            <>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" component="h2">
                  정말 허가하시겠습니까?
                </Typography>
                <Button onClick={handleCloseView} autoFocus>
                  닫기
                </Button>
                <Button onClick={approveAndClose}>허가</Button>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" component="h2">
                  정말 허가를 취소하시겠습니까?
                </Typography>
                <Button onClick={handleCloseView} autoFocus>
                  닫기
                </Button>
                <Button onClick={cancelApproveAndClose}>허가 취소</Button>
              </Box>
            </>
          )}

          {/* <ViewMileage
            id={currentId}
            handleClose={handleCloseView}
            loadData={loadData}
          /> */}
        </Box>
      </Modal>
    </div>
  );
}
