import { useState } from 'react';
import StudentPage from '../components/Student/StudentPage';
import StudentCardPage from '../components/Student/StudentCardPage';

export default function Student() {
  const [card, setCard] = useState(true);
  const VisualType = () => {
    if (card) return <StudentCardPage card={card} setcard={setCard} />;
    else return <StudentPage card={card} setcard={setCard} />;
  };
  return (
    <>
      <VisualType />
    </>
  );
}
