import {
  Box,
  Divider,
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

const ParticipantTable = ({ columns, data, handleOpenView }) => {
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
    <>
      <TableContainer
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
                sx={{
                  "th:first-child": {
                    borderLeft: "1px solid rgb(241, 242, 246)",
                    borderRadius: "16px 0px 0px 16px",
                  },
                  "th:last-child": {
                    borderRight: "1px solid rgb(241, 242, 246)",
                    borderRadius: "0px 16px 16px 0px",
                  },
                  th: {
                    borderTop: "1px solid rgb(241, 242, 246)",
                    borderBottom: "1px solid rgb(241, 242, 246)",
                  },
                }}
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
                  sx={{ "td, th": { borderBottom: 1, borderColor: "divider" } }}
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
      <Divider />
    </>
  );
};

export default ParticipantTable;
