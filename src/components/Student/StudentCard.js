import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Divider, Typography, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import userImg from '../../assets/user.png';
import SDB from '../../assets/user.png';
import Image from '../image';
import Iconify from '../iconify';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

StudentCard.propTypes = {
  student: PropTypes.object,
};

function StudentCard({ student, setCurrentId, handleOpenView, handleOpenEdit, handleDeleteClick }) {
  const {
    blog,
    departmentId,
    departmentName,
    email,
    githubId,
    loginCnt,
    major1Id,
    major1Name,
    major2Id,
    major2Name,
    name,
    phone,
    profile,
    readme,
    semester,
    studentId,
    studentNum,
  } = student;

  const github = {
    value: 'github',
    name: 'github',
    icon: 'carbon:logo-github',
    color: '#000000',
    path: `https://www.github.com/${githubId}`,
  };

  const _blog = 'uil:blogger';

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Image src={SDB} ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5, color: 'black' }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'bolder' }}>
        {semester}학기
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'bolder' }}>
        {studentNum}
      </Typography>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 1, mb: 3 }}>
        <IconButton
          sx={{
            '&:hover': {
              bgcolor: alpha('#000000', 0.08),
            },
          }}
          onClick={(event) => {
            window.open(`${github.path}`);
          }}
        >
          <Iconify icon={github.icon} />
        </IconButton>
        <IconButton
          sx={{
            '&:hover': {
              bgcolor: alpha('#2DB400', 0.08),
            },
          }}
          onClick={(event) => {
            window.open(`${blog}`);
          }}
        >
          <Iconify icon={_blog} />
        </IconButton>
      </Stack>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ py: 2 }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            학부
          </Typography>
          <Typography variant="subtitle1">{departmentName}</Typography>
        </div>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            1전공
          </Typography>

          <Typography variant="subtitle1">{major1Name}</Typography>
        </div>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 1 }}>
        <IconButton
          label="View"
          onClick={() => {
            setCurrentId(+studentId);
            handleOpenView();
          }}
        >
          <Iconify icon={'material-symbols:open-in-full'} />
        </IconButton>

        <IconButton
          label="Edit"
          onClick={() => {
            setCurrentId(+studentId);
            handleOpenEdit();
          }}
        >
          <Iconify icon={'material-symbols:edit-outline'} />
        </IconButton>

        <IconButton
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(+studentId)}
        >
          <Iconify icon={'material-symbols:delete-outline'} />
        </IconButton>
      </Box>
    </Card>
  );
}
export default StudentCard;
