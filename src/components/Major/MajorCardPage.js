import MajorCard from './MajorCard';
import { Box, Container } from '@mui/material';
export default function MajorCardPage({ majors, setCurrentId, handleOpenEdit, handleDeleteClick }) {
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
          {majors.map((major) => (
            <MajorCard
              key={major.id}
              major={major}
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
