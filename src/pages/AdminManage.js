import { useState } from 'react';

import AdminManage2 from '../components/admin/AdminManage';
import AdminManageCard from '../components/admin/AdminManageCard';

export default function AdminManage() {
  const [card, setCard] = useState(false);
  const VisualType = () => {
    if (card) return <AdminManageCard card={card} setCard={setCard} />;
    else return <AdminManage2 card={card} setCard={setCard} />;
  };
  return (
    <>
      <VisualType />
    </>
  );
}
