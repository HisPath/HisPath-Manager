import DeptCard from './DeptCard';
import { Box, Container } from '@mui/material';

function DeptCardPage({ departments, setCurrentId, handleOpenEdit, handleDeleteClick }) {
  return (
    <>
      <Container maxWidth={'lg'}>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {departments.map((dept) => (
            <DeptCard
              key={dept.id}
              dept={dept}
              setCurrentId={setCurrentId}
              handleOpenEdit={handleOpenEdit}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
        </Box>
      </Container>
    </>
  );
}
export default DeptCardPage;
