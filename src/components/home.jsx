"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import IgttpbDesc from "../components/home/welcomeMessage";
import InfoKelompok from "../components/home/infoKelompok";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FAQComponent from "../components/faq";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const { isLogin, isLoading } = useAuth();
  const router = useRouter();

  // Auto-redirect to dashboard if logged in
  useEffect(() => {
    if (!isLoading && isLogin) {
      router.push("/dashboard");
    }
  }, [isLogin, isLoading, router]);

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
