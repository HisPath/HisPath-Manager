import { Box, Card, Divider, Typography, IconButton } from '@mui/material';
import UserImg from '../../assets/user.png';
import Image from '../image';
import Iconify from '../iconify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
// ----------------------------------------------------------------------
function MajorCard({ major, setCurrentId, handleOpenEdit, handleDeleteClick }) {
  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Image src={UserImg} ratio="16/9" />
      </Box>
      <Typography variant="subtitle1" sx={{ mt: 5, mb: 5, color: 'black' }}>
        {major.name}
      </Typography>
      {/* <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5, color: 'black' }}>
        {major.department}
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5, color: 'black' }}>
        {major.totalcredits}
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5, color: 'black' }}>
        {major.studentCnt}
      </Typography> */}

      <Divider sx={{ borderStyle: 'dashed' }} />
      <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" sx={{ py: 2 }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            기능
          </Typography>
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ py: 1 }}>
            <IconButton
              label="Edit"
              icon={<EditIcon />}
              color="success"
              onClick={() => {
                setCurrentId(+major.id);
                handleOpenEdit();
              }}
            >
              <Iconify icon={'material-symbols:edit-outline'} />
            </IconButton>

            <IconButton
              icon={<DeleteIcon />}
              label="Delete"
              color="error"
              onClick={() => handleDeleteClick(+major.id)}
            >
              <Iconify icon={'material-symbols:delete-outline'} />
            </IconButton>
          </Box>
        </div>
      </Box>
    </Card>
  );
}
export default MajorCard;
