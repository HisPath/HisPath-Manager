import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../Department/CustomNoRowsOverlay";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

const columns = [
  {
    field: "id",
    headerName: "번호",
    width: 80,
  },
  {
    field: "name",
    headerName: "학부",
    width: 900,
  },
  // {
  //   field: 'professor',
  //   headerName: '지도교수',
  //   width: 150,
  // },
  // {
  //   field: 'phone',
  //   headerName: '사무실 번호',
  //   width: 250,
  // },
  // {
  //   field: 'location',
  //   headerName: '학부 위치',
  //   width: 150,
  // },
  // {
  //   field: 'total',
  //   headerName: '총 인원',
  //   width: 150,
  // },
];

function DeptPage({
  departments,
  setCurrentId,
  handleOpenEdit,
  handleDeleteClick,
}) {
  return (
    <DataGrid
      components={{
        Toolbar: GridToolbar,
        NoRowsOverlay: CustomNoRowsOverlay,
      }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
          printOptions: { disableToolbarButton: true },
        },
      }}
      rows={departments}
      columns={[
        ...columns,
        {
          field: "actions",
          type: "actions",
          headerName: "기능",
          width: 128,
          cellClassName: "actions",
          getActions: ({ departmentId }) => {
            return [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={() => {
                  setCurrentId(+departmentId);
                  handleOpenEdit();
                }}
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleDeleteClick(+departmentId)}
              />,
            ];
          },
        },
      ]}
      pageSize={20}
      rowsPerPageOptions={[20]}
      disableColumnMenu
      disableDensitySelector
      hideFooterSelectedRowCount
    />
  );
}
export default DeptPage;
