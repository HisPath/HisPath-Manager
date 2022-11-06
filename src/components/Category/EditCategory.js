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

function EditStudent({ id, handleClose, loadData }) {
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
    await axios.put(`/api/category/${id}`, {
      name: data.name,
    });
    loadData();
    handleClose();
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Box mt={3} mb={8}>
        <Box display="flex" gap={2}>
          <InputLabel sx={{ mt: 1 }}>카테고리 이름:</InputLabel>
          <TextField
            {...register("phone", {
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

export default EditStudent;
