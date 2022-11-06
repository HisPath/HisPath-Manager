import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { studentState } from "../../atom";
import axios from "axios";
import {
  departmentList,
  major1List,
  major2List,
} from "../../constants/commons";

function EditMajor({ id, handleClose, loadData }) {
  const [student, setStudent] = useRecoilState(studentState);
  const target = student.filter((item) => item.id === id)[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: target,
  });
  const onValid = async (data) => {
    await axios.patch(`/api/major/${id}`, {
      name: data.name,
      studentNum: data.studentNum,
      semester: data.semester,
      phone: data.phone,
      email: data.email,
      profile: data.profile,
      departmentId: data.departmentId,
      major1Id: data.major1Id,
      major2Id: data.major2Id,
      blog: data.blog,
      githubId: data.githubId,
      readme: data.readme,
    });
    loadData();
    handleClose();
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Box mt={3} mb={8}>
        <Box width="100%">
          <InputLabel sx={{ mt: 1 }}>전공</InputLabel>
          <TextField
            {...register("name", {
              required: true,
            })}
            color="secondary"
            InputProps={{ disableUnderline: true }}
            fullWidth
            hiddenLabel
            variant="filled"
            size="small"
          />
          <Typography color="text.secondary" variant="caption" height={24}>
            {errors?.phone?.message}
          </Typography>
        </Box>
      </Box>

      {/* <Box display="flex" gap={2}>
          <Box width="50%">
            <InputLabel sx={{ mt: 1 }}>블로그</InputLabel>
            <TextField
              {...register("blog")}
              color="secondary"
              InputProps={{ disableUnderline: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
            />
            <Typography color="text.secondary" variant="caption" height={24}>
              {errors?.blog?.message}
            </Typography>
          </Box>

          <Box width="50%">
            <InputLabel sx={{ mt: 1 }}>깃허브 아이디</InputLabel>
            <TextField
              {...register("githubId")}
              color="secondary"
              InputProps={{ disableUnderline: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
            />
            <Typography color="text.secondary" variant="caption" height={24}>
              {errors?.githubId?.message}
            </Typography>
          </Box>
        </Box>

        <InputLabel sx={{ mt: 1 }}>README</InputLabel>
        <TextField
          color="secondary"
          InputProps={{ disableUnderline: true }}
          fullWidth
          hiddenLabel
          variant="filled"
          size="small"
          {...register("readme")}
        />
        <Typography color="text.secondary" variant="caption" height={24}>
          {errors?.readme?.message}
        </Typography>
      </Box> */}
      <Box display="flex" justifyContent="flex-end">
        <Box display="flex" gap={1}>
          <Button color="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button color="secondary" type="submit" variant="contained">
            수정
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default EditMajor;
