import IgttpbDesc from '../components/home/welcomeMessage';
import InfoKelompok from '../components/home/infoKelompok';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import FAQComponent from '../components/faq';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next";

export default function HomePage() {
  return (
    <div>
      <Analytics />
      <SpeedInsights />
      <Navbar />
      <IgttpbDesc />
      <InfoKelompok />
      <FAQComponent />
      <Footer />
    </div>
  );
}
