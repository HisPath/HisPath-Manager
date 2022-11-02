import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useFilters, useSortBy, useTable } from "react-table";
import { DefaultColumnFilter, Filter } from "./filters";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";

const ScholarshipRegisteredTable = ({ columns, data, handleOpenView }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn: { Filter: DefaultColumnFilter },
      },
      useFilters,
      useSortBy
    );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (
      column.isSortedDesc ? (
        <KeyboardArrowDownIcon fontSize="small" />
      ) : (
        <KeyboardArrowUpIcon fontSize="small" />
      )
    ) : (
      <MoreVertIcon fontSize="small" />
    );
  };

  const [age, setAge] = React.useState("");

  const handleChanged = (event) => {
    setAge(event.target.value);
  };

  return (
    <TableContainer
      sx={{
        height: "100%",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "divider",
        borderRadius: 1,
        backgroundColor: "background.paper",
      }}
    >
      <Table {...getTableProps()} stickyHeader>
        <TableHead>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="semester_id">학기</InputLabel>
            <Select
              labelId="semester_id"
              id="semester_id"
              value={age}
              label="학기"
              onChange={handleChanged}
            >
              <MenuItem value={10}>2021-1</MenuItem>
              <MenuItem value={20}>2021-2</MenuItem>
              <MenuItem value={30}>2022-1</MenuItem>
              <MenuItem value={40}>2022-2</MenuItem>
            </Select>
          </FormControl>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              <TableCell>순번</TableCell>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  <Box
                    {...column.getSortByToggleProps()}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 1,
                      minWidth: 120,
                    }}
                  >
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                  </Box>
                  <Filter column={column} />
                </TableCell>
              ))}
              <TableCell align="center">학생 목록 보기</TableCell>
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <TableRow
                {...row.getRowProps()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
                <TableCell align="center" sx={{ padding: 0 }}>
                  <IconButton
                    onClick={() => handleOpenView(row.original.id)}
                    size="small"
                  >
                    <OpenInFullIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScholarshipRegisteredTable;
