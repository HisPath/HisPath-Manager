import { useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select as MUISelect,
  styled,
  InputBase,
  ButtonBase,
  Button as MUIButton,
  Paper,
  Modal as MUIModal,
  Box,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchWrapper = styled(Paper)(({ theme }) => ({
  position: "relative",
  borderRadius: 8,
  backgroundColor: theme.palette.grey[200],
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  height: 40,
  boxShadow: "none",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: 150,
  },
}));

const InputWrapper = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.grey[200],
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
  height: 40,
  borderRadius: 8,
  boxShadow: "none",
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: "0 16px",
  },
}));

export function Select({ title, items }) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <InputLabel sx={{ m: 0.5 }}>{title}</InputLabel>
      <FormControl sx={{ minWidth: 120 }} hiddenLabel size="small">
        <MUISelect
          value={value}
          onChange={handleChange}
          variant="filled"
          sx={{ borderRadius: 2 }}
          disableUnderline
        >
          <MenuItem value="">
            <em>없음</em>
          </MenuItem>
          {items.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </MUISelect>
      </FormControl>
    </div>
  );
}

export function Search() {
  return (
    <div>
      <InputLabel sx={{ m: 0.5 }}>검색</InputLabel>
      <SearchWrapper>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Search…" />
      </SearchWrapper>
    </div>
  );
}

export function Button({ title, onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        fontSize: 16,
        height: 40,
        borderRadius: 2,
        backgroundColor: "action.selected",
        "&:hover": {
          backgroundColor: "action.focus",
        },
        boxShadow: (theme) => theme.shadows[1],
        color: "secondary.main",
        fontWeight: 500,
        padding: "0 16px",
      }}
    >
      {title}
    </ButtonBase>
  );
}

export function EmButton({ title, onClick }) {
  return (
    <MUIButton
      onClick={onClick}
      variant="contained"
      color="secondary"
      sx={{
        fontSize: 16,
        height: 40,
        borderRadius: 2,
        boxShadow: (theme) => theme.shadows[1],
        fontWeight: 500,
        padding: "0 16px",
      }}
    >
      {title}
    </MUIButton>
  );
}

export function DatePicker({ title }) {
  return (
    <div>
      <InputLabel sx={{ m: 0.5 }}>{title}</InputLabel>
      <InputWrapper>
        <StyledInput type="date" />
      </InputWrapper>
    </div>
  );
}

export function InputText({ title, placeholder }) {
  return (
    <div>
      <InputLabel sx={{ m: 0.5 }}>{title}</InputLabel>
      <InputWrapper>
        <StyledInput placeholder={placeholder} />
      </InputWrapper>
    </div>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 3,
  borderRadius: 4,
  width: 500,
  minHeight: 500,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export function Modal({ open, handleClose }) {
  return (
    <MUIModal open={open} onClose={handleClose}>
      <Box component={Paper} sx={modalStyle}>
        <div>
          <Typography mb={3}>모달</Typography>
        </div>
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <MUIButton color="secondary" onClick={handleClose}>
            취소
          </MUIButton>
          <MUIButton color="secondary" type="submit" variant="contained">
            저장
          </MUIButton>
        </Box>
      </Box>
    </MUIModal>
  );
}
