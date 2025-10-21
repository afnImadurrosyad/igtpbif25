import NavbarDash from '@/components/dashboard/dashNavbar';
import DashboardKehadiran from '@/components/dashboard/dashKehadiran';
import DashPeserta from '@/components/dashboard/dashPeserta';

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
        </div>
      </div>
    </div>
  );
}
