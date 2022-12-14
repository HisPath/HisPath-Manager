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
import { useForm } from "react-hook-form";
import {
  departmentList,
  major1List,
  major2List,
} from "../../constants/commons";
import { useSnackbar } from "notistack";
import { addStudent } from "../../apis/student";

function AddStudent({ handleClose, loadData }) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { isListUpload: false } });
  const onValid = async (data) => {
    await addStudent(
      data.id,
      data.departmentId,
      data.studentNum,
      data.semester,
      data.name,
      data.phone,
      data.email,
      data.profile,
      data.blog,
      data.githubId,
      data.readme,
      data.major1Id,
      data.major2Id
    );
    enqueueSnackbar("추가되었습니다!", { variant: "success" });
    loadData();
    handleClose();
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Box mt={3} mb={8}>
        <Box mb={2}>
          <Box>
            <Box display="flex" justifyContent="space-between"></Box>
            <Box display="flex" gap={2}>
              <Box width="50%">
                <InputLabel sx={{ mt: 1 }}>이름</InputLabel>
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
                <Typography
                  color="text.secondary"
                  variant="caption"
                  height={24}
                >
                  {errors?.name?.message}
                </Typography>
              </Box>
              <Box width="50%">
                <InputLabel sx={{ mt: 1 }}>학번</InputLabel>
                <TextField
                  {...register("studentNum", {
                    required: true,
                  })}
                  color="secondary"
                  InputProps={{ disableUnderline: true }}
                  fullWidth
                  hiddenLabel
                  variant="filled"
                  size="small"
                />
                <Typography
                  color="text.secondary"
                  variant="caption"
                  height={24}
                >
                  {errors?.studentNum?.message}
                </Typography>
              </Box>
            </Box>

            <Box mb={2} display="flex" gap={2}>
              <Box width="50%">
                <InputLabel sx={{ mt: 1 }}>학부</InputLabel>
                <FormControl
                  fullWidth
                  hiddenLabel
                  variant="filled"
                  size="small"
                >
                  <Select
                    {...register("departmentId", {
                      required: "필수 항목입니다.",
                    })}
                    defaultValue=""
                    disableUnderline
                  >
                    {departmentList.map((item, index) => (
                      <MenuItem key={item} value={index + 1}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography
                  color="text.secondary"
                  variant="caption"
                  height={24}
                >
                  {errors?.departmentId?.message}
                </Typography>
              </Box>
              <Box width="50%">
                <InputLabel sx={{ mt: 1 }}>학기</InputLabel>
                <TextField
                  color="secondary"
                  InputProps={{ disableUnderline: true }}
                  fullWidth
                  hiddenLabel
                  variant="filled"
                  size="small"
                  {...register("semester", {
                    required: "필수 항목입니다.",
                  })}
                />
                <Typography
                  color="text.secondary"
                  variant="caption"
                  height={24}
                >
                  {errors?.semester?.message}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" gap={2}>
              <Box width="50%">
                <InputLabel>1전공</InputLabel>
                <FormControl
                  fullWidth
                  hiddenLabel
                  variant="filled"
                  size="small"
                >
                  <Select
                    {...register("major1Id", {
                      required: "필수 항목입니다.",
                    })}
                    defaultValue=""
                    disableUnderline
                  >
                    {major1List.map((item, index) => (
                      <MenuItem key={item} value={index + 1}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography
                  color="text.secondary"
                  variant="caption"
                  height={24}
                >
                  {errors?.major1Id?.message}
                </Typography>
              </Box>
              <Box width="50%">
                <InputLabel>2전공</InputLabel>
                <FormControl
                  fullWidth
                  hiddenLabel
                  variant="filled"
                  size="small"
                >
                  <Select
                    {...register("major2Id", {
                      required: "필수 항목입니다.",
                    })}
                    defaultValue=""
                    disableUnderline
                  >
                    {major2List.map((item, index) => (
                      <MenuItem key={item} value={index + 1}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography
                  color="text.secondary"
                  variant="caption"
                  height={24}
                >
                  {errors?.major2Id?.message}
                </Typography>
              </Box>
            </Box>

            <InputLabel sx={{ mt: 1 }}>이메일</InputLabel>
            <TextField
              color="secondary"
              InputProps={{ disableUnderline: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
              {...register("email", {
                required: "필수 항목입니다.",
              })}
            />
            <Typography color="text.secondary" variant="caption" height={24}>
              {errors?.email?.message}
            </Typography>
          </Box>

          <Box display="flex" gap={2}>
            {/* <Box width="50%">
              <InputLabel sx={{ mt: 1 }}>프로필</InputLabel>
              <TextField
                {...register("profile")}
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
                hiddenLabel
                variant="filled"
                size="small"
              />
              <Typography color="text.secondary" variant="caption" height={24}>
                {errors?.profile?.message}
              </Typography>
            </Box> */}
            <Box width="100%">
              <InputLabel sx={{ mt: 1 }}>전화번호</InputLabel>
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
          </Typography> */}
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
