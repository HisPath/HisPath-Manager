import { Box, Chip, Card, Divider, Typography } from '@mui/material';
import UserImg from '../../assets/user.png';
import Image from '../image';

function AdminCard({ manager, setCurrentId, handleClickOpenSuper, handleClickOpenNormal }) {
  const Chips = ({ id, power }) => {
    return (
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', pl: 1.3 }}>
        <Chip
          color="success"
          onClick={() => {
            setCurrentId(+id);
            handleClickOpenSuper();
          }}
          variant={power === 2 ? 'filled' : 'outlined'}
          size="lg"
          label="슈퍼"
        />
        <Chip
          color="warning"
          onClick={() => {
            setCurrentId(+id);
            handleClickOpenNormal();
          }}
          size="lg"
          variant={power === 1 ? 'filled' : 'outlined'}
          label="일반"
        />
        <Chip
          color="error"
          onClick={function () {}}
          size="lg"
          variant={power === 0 ? 'filled' : 'outlined'}
          label="미승인"
        />
      </Box>
    );
  };
  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Image src={UserImg} ratio="16/9" />
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" sx={{ py: 1, mb: 4.5 }}>
        <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5, color: 'black' }}>
          {manager.department} | {manager.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'bolder' }}>
          {manager.email}
        </Typography>
      </Box>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" sx={{ py: 2 }}>
        <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
          권한
        </Typography>
        <Chips id={manager.id} power={manager.power} />
      </Box>
    </Card>
  );
}

export default AdminCard;
