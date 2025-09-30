import IgttpbDesc from '../components/home/welcomeMessage';
import InfoKelompok from '../components/home/infoKelompok';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <IgttpbDesc />
      <InfoKelompok />
      <Footer />
    </div>
  );
}
