import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import CustomNoRowsOverlay from '../Student/CustomNoRowsOverlay';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

const columns = [
  {
    field: 'id',
    headerName: '번호',
    width: 80,
  },
  {
    field: 'name',
    headerName: '전공',
    width: 300,
  },
  {
    field: 'department',
    headerName: '소속 학부',
    width: 250,
  },
  {
    field: 'credit',
    headerName: '총 학점',
    width: 150,
  },
  {
    field: 'total',
    headerName: '총 인원',
    width: 180,
  },
];

function MajorPage({ majors, setCurrentId, handleOpenEdit, handleDeleteClick }) {
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
      rows={majors}
      columns={[
        ...columns,
        {
          field: 'actions',
          type: 'actions',
          headerName: '기능',
          width: 128,
          cellClassName: 'actions',
          getActions: ({ id }) => {
            return [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={() => {
                  setCurrentId(+id);
                  handleOpenEdit();
                }}
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleDeleteClick(+id)}
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

export default MajorPage;
