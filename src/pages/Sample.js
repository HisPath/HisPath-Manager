import { useState } from "react";
import { Box, Container } from "@mui/material";
import {
  Button,
  DatePicker,
  EmButton,
  InputText,
  Modal,
  Search,
  Select,
} from "../components/common/CustomComponents";

function Sample() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Container sx={{ mt: 8 }}>
      <Box display="flex" gap={1.5}>
        <Select title="학기" items={["2022-2", "2022-1", "2021-2"]} />
        <Select
          title="카테고리"
          items={["전공 활동", "교내 활동", "교외 활동"]}
        />
        <DatePicker title="시작일" />
        <InputText title="입력창" placeholder="이름을 입력하세요" />
        <Search />
        <Button title="모달 열기" onClick={handleOpen} />
        <EmButton title="강조 버튼" />
      </Box>

      <Modal open={open} handleClose={handleClose} />
    </Container>
  );
}

export default Sample;
