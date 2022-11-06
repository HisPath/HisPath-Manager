import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  departmentList,
  major1List,
  major2List,
} from "../../constants/commons";

function AddStudent({ handleClose, loadData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { isListUpload: false } });
  const onValid = async (data) => {
    await axios.post("/api/department", {
      departmentId: data.departmentId,
      name: data.name,
    });
    loadData();
    handleClose();
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Box mt={3} mb={8}>
        <Box>
          <Box display="flex" justifyContent="space-between"></Box>
          <Box display="flex" gap={2}>
            <Box width="100%">
              <InputLabel sx={{ mt: 1 }}>학부</InputLabel>
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
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Box display="flex" gap={1}>
          <Button color="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button color="secondary" type="submit" variant="contained">
            추가
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default AddStudent;
