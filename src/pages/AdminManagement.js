import { useState } from 'react';

import AdminManage from '../components/admin/AdminManage';
import AdminManageCard from '../components/admin/AdminManageCard';

export default function AdminManagement() {
  const [card, setCard] = useState(true);
  const VisualType = () => {
    if (card) return <AdminManageCard card={card} setCard={setCard} />;
    else return <AdminManage card={card} setCard={setCard} />;
  };
  return (
    <>
      <VisualType />
    </>
  );
}
