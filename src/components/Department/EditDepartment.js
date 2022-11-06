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
    await axios.put(`/api/department/${id}`, {
      name: data.name,
    });
    loadData();
    handleClose();
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Box display="flex" gap={2}>
        <Box width="100%">
          <InputLabel sx={{ mt: 1 }}>학부 이름:</InputLabel>
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
