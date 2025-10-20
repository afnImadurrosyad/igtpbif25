import NavbarDash from '@/components/dashboard/dashNavbar';
import DashboardKehadiran from '@/components/dashboard/dashKehadiran';
import DashPeserta from '@/components/dashboard/dashPeserta';

export default function Page() {
  return (
    <div className='m-0'>
      <div>
        <div>
          <NavbarDash />
        </div>
        <div>
          <DashboardKehadiran />
          <DashPeserta />
        </div>
      </div>
    </div>
  );
}
