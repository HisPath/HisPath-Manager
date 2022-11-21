import {
  Box,
  IconButton,
  Paper,
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
import { CheckBox } from "@mui/icons-material";

const dummyData = [
  {
    id: "1",
    semester: "2022-1",
    name: "박성진",
    studentNum: "21000393",
    title: "해커톤 참여",
    remark: "해커톤 우수상",
  },
  {
    id: "2",
    semester: "2022-1",
    name: "홍성헌",
    studentNum: "21000773",
    title: "네이버 부트캠프",
    remark: "우수 수료",
  },
  {
    id: "3",
    semester: "2022-1",
    name: "안병웅",
    studentNum: "21000113",
    title: "애플아카데미 참여",
    remark: "우수 수료",
  },
  {
    id: "4",
    semester: "2022-1",
    name: "정석민",
    studentNum: "21000443",
    title: "네이버 인턴 참여",
    remark: "",
  },
  {
    id: "5",
    semester: "2022-1",
    name: "송다빈",
    studentNum: "21000333",
    title: "카카오 인턴 참여",
    remark: "",
  },
  {
    id: "6",
    semester: "2022-1",
    name: "이인혁",
    studentNum: "21000223",
    title: "해커톤 참여",
    remark: "해커톤 우수상",
  },
];

const DummyTable = ({ columns, data, handleOpenView }) => {
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

  return (
    <TableContainer
      component={Paper}
      sx={{
        height: "100%",
        borderRadius: 1,
      }}
    >
      <Table {...getTableProps()} stickyHeader>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow
              {...headerGroup.getHeaderGroupProps()}
              sx={{ "th, td": { backgroundColor: "background.paper" } }}
            >
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
              <TableCell align="center">허가</TableCell>
            </TableRow>
          ))}
        </TableHead>
        {/* <TableBody {...getTableBodyProps()}> */}
        <TableBody>
          {/* {rows.map((row, index) => {
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
          })} */}
          {dummyData.map((row) => {
            // prepareRow(row);
            return (
              <TableRow
                // {...row.getRowProps()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.semester}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.studentNum}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.remark}</TableCell>
                <TableCell>
                  <CheckBox></CheckBox>
                </TableCell>
                {/* {row.cells.map((cell) => {
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
                </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DummyTable;
