import NavbarDash from '@/components/dashboard/dashNavbar';
import DashboardKehadiran from '@/components/dashboard/admin/dashKehadiran';
import DashPeserta from '@/components/dashboard/admin/dashPeserta';
import DashTugasAdmin from '@/components/dashboard/admin/dashTugasAdmin';

export default function Page() {
  return (
    <div className='m-0 '>
      <div className='flex'>
        <div>
          <NavbarDash />
        </div>
        <div className='w-full'>
          <DashboardKehadiran />
          <DashPeserta />
          <DashTugasAdmin />
        </div>
      </div>
    </div>
  );
}
