import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import StudentPage from '../components/Student/StudentPage';
import StudentCardPage from '../components/Student/StudentCardPage';
import ModeSwitch from '../components/Student/ModeSwitch';

export default function Student() {
  const [card, setCard] = useState(false);
  const VisualType = () => {
    if (card) return <StudentCardPage />;
    else return <StudentPage />;
  };
  return (
    <>
      <Box container display="flex" justifyContent={'right'}>
        <ModeSwitch card={card} setCard={setCard} />
      </Box>
      <VisualType />
    </>
  );
}
