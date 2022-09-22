import { EventRepeatTwoTone } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const data = {
  name: "김한동",
  studentNumber: 22000000,
  department: "전산전자공학부",
  major1: "전산",
  major2: "전자",
  grade: 3,
  semester: 6,
  contact: "010-1234-5678",
  email: "example@handong.ac.kr",
  // githubid: "https://github.com",
};

export default function EditForm() {
  const [major1, setMajor1] = React.useState("전산");
  const [major2, setMajor2] = React.useState("전자");
  const [contact, setContact] = React.useState("010-1234-5678");

  const handleChangeOne = (event) => {
    setMajor1(event.target.value);
  };

  const handleChangeTwo = (event) => {
    setMajor2(event.target.value);
  };

  const changeContact = (event) => {
    setContact(event.target.value);
  };

  return (
    <>
      <Box sx={{ mt: 3, ml: 10 }}>
        <Typography
          mb={1}
          fontSize={"2.1rem"}
          fontWeight={900}
          fontFamily="Ubuntu"
          color="primary.light"
        >
          {data.name} {data.studentNumber}
        </Typography>
        <Typography mt={1} mb={1} fontSize={"1.3rem"} fontWeight={600}>
          {data.department} {data.grade}학년 {data.semester}학기{" "}
          {/* {data.state ? "재학" : "휴학"} */}
        </Typography>
        {/* email */}
        <Typography mt={2} mb={2} fontSize={"1.2rem"} fontWeight={400}>
          {data.email}
        </Typography>
        <Box display={"flex"} gap={2}>
          {/* 1 전공 */}
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              1 전공
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={major1}
              onChange={handleChangeOne}
              label="Age"
            >
              <MenuItem value={"전산"}>전산</MenuItem>
              <MenuItem value={"전자"}>전자</MenuItem>
              <MenuItem value={"컴퓨터공학심화"}>컴퓨터공학심화</MenuItem>
              <MenuItem value={"전자공학심화"}>전자공학심화</MenuItem>
              <MenuItem value={"ICT"}>ICT</MenuItem>
            </Select>
          </FormControl>
          {/* 2 전공 */}
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              2 전공
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={major2}
              onChange={handleChangeTwo}
              label="Age"
            >
              <MenuItem value={"전산"}>전산</MenuItem>
              <MenuItem value={"전자"}>전자</MenuItem>
              <MenuItem value={"컴퓨터공학심화"}>컴퓨터공학심화</MenuItem>
              <MenuItem value={"전자공학심화"}>전자공학심화</MenuItem>
              <MenuItem value={"ICT"}>ICT</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* contact */}
        <TextField
          id="standard-multiline-flexible"
          label="Contact"
          multiline
          maxRows={4}
          value={contact}
          onChange={changeContact}
          variant="standard"
          sx={{ m: 1, width: "16.9rem" }}
        />
        {/* github id textfield */}
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <GitHubIcon sx={{ color: "primary.main", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Github Id"
            variant="standard"
            sx={{ width: "15.4rem" }}
          />
        </Box>
        {/* blog url textfield */}
        <Box sx={{ display: "flex", alignItems: "flex-end", mt: 2 }}>
          <LaunchIcon sx={{ color: "primary.main", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Blog Url"
            variant="standard"
            sx={{ width: "15.4rem" }}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <Button variant={"contained"} p={10} sx={{ ml: 13, mt: 3 }}>
            프로필 수정
          </Button>
          <Button variant={"outlined"} p={10} sx={{ ml: 2, mt: 3 }}>
            취소
          </Button>
        </Box>
      </Box>
    </>
  );
}
