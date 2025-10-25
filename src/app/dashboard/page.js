'use client';
import DashAdmin from '@/components/dashboard/dashAdmin';
import DashPeserta from '@/components/dashboard/dashPeserta';
import { getRoleFromLocal } from '@/utils/localRole';
import { useState } from 'react';

export default function Page() {
  const [role, setRole] = useState();
  setRole(getRoleFromLocal());
  if (role == 'user') {
    return <DashPeserta />;
  } else if (role == 'admin') {
    return <DashAdmin />;
  }
}
