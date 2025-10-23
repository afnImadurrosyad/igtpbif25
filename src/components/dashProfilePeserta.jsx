"use client";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabaseClient";
import { useState, useEffect } from "react";

const DataRow = ({ label, value }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-xs text-[#5A5A3D] opacity-70 font-medium">
      {label}
    </span>
    <span className="text-sm font-semibold text-[#5A5A3D]">{value}</span>
  </div>
);

const ProfileCard = ({ title, children, className = "" }) => (
  <div className={`bg-[#F7F1E7] p-4 sm:p-6 rounded-xl ${className}`}>
    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-[#5A5A3D]">
      {title}
    </h3>
    {children}
  </div>
);

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function DashboardProfile() {
  const { user, isLogin, role } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLogin || !user) {
      setLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      try {
        const match = user.email.match(/\.(\d{9})@student\.itera\.ac\.id$/);
        if (!match) {
          console.log("Format email tidak sesuai pola NIM");
          setLoading(false);
          return;
        }

        const nim = match[1];

        let data = null;
        let error = null;

        if (role === "user") {
          const { data: fetchedData, error: fetchError } = await supabase
            .from("dataif25")
            .select("*")
            .eq("nim", nim)
            .single();

          data = fetchedData;
          error = fetchError;
        } else if (role === "admin") {
          const { data: fetchedData, error: fetchError } = await supabase
            .from("users")
            .select("*")
            .eq("nim", nim)
            .single();

          data = fetchedData;
          error = fetchError;
        }

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching profile data:", error);
          setLoading(false);
          return;
        }

        if (!data) {
          console.log("No data found for the user");
          setLoading(false);
          return;
        }

        console.log("Fetched data:", data); // For debugging field names

        setProfileData({
          biodata: {
            nama: data.nama || "",
            nim: data.nim || "",
            programStudi: data.program_studi || data.programStudi || "",
            tpb: data.tpb || "",
            gender: data.gender || data.jenis_kelamin || "",
          },
          kelompok: {
            nama: data.kelompok || data.nama_kelompok || "",
          },
          pendamping: {
            nama: data.daplok || data.pendamping_nama || "",
            mentor:
              data.mentor || data.dpl_mentor || data.pendamping_mentor || "",
          },
        });
      } catch (err) {
        console.error("Error in fetchProfileData:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, isLogin, role]);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 pb-4 px-4 sm:pt-20 sm:pb-8 sm:px-8 lg:p-12 bg-[#DCE2B7] flex justify-center items-start">
        <div className="w-full max-w-4xl p-5 sm:p-8 lg:p-10 bg-[#DCE2B7] rounded-2xl sm:rounded-[2rem]">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen pt-16 pb-4 px-4 sm:pt-20 sm:pb-8 sm:px-8 lg:p-12 bg-[#DCE2B7] flex justify-center items-start">
        <div className="w-full max-w-4xl p-5 sm:p-8 lg:p-10 bg-[#DCE2B7] rounded-2xl sm:rounded-[2rem]">
          <div className="text-center">No profile data available.</div>
        </div>
      </div>
    );
  }

  const { biodata, kelompok, pendamping } = profileData;

  return (
    <div className="min-h-screen pt-16 pb-4 px-4 sm:pt-20 sm:pb-8 sm:px-8 lg:p-12 bg-[#DCE2B7] flex justify-center items-start">
      <div className="w-full max-w-4xl p-5 sm:p-8 lg:p-10 bg-[#DCE2B7] rounded-2xl sm:rounded-[2rem]">
        <header className="mb-6 sm:mb-10 text-center md:text-left">
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-semibold text-[#5A5A3D]">
            Hi {biodata.nama},
          </h1>
          <p className="text-xl sm:text-2xl lg:text-4xl font-semibold text-[#5A5A3D]">
            Have a great day.
          </p>
        </header>

        <div className="space-y-4 sm:space-y-6">
          <ProfileCard title="Biodata Diri">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:text-start md:text-start gap-4 sm:gap-x-12 sm:gap-y-5 sm:text-center text-center">
              <DataRow label="Nama" value={biodata.nama} />
              <DataRow label="TPB" value={biodata.tpb} />
              <DataRow label="NIM" value={biodata.nim} />
              <DataRow label="Gender" value={biodata.gender} />
              <DataRow label="Program Studi" value={biodata.programStudi} />
            </div>
          </ProfileCard>

          <ProfileCard title="Data Kelompok">
            <div className="grid grid-cols-1 xl:text-start md:text-start md:grid-cols-2 gap-4 sm:gap-6 sm:text-center text-center">
              <div className="grid grid-cols-1 gap-y-4 sm:gap-y-5">
                <DataRow label="Daplok" value={pendamping.nama} />
                <DataRow label="Mentor" value={pendamping.mentor} />
              </div>
              <div className="grid grid-cols-1 gap-y-4 sm:gap-y-5">
                <DataRow label="Nama" value={kelompok.nama} />
              </div>
            </div>
          </ProfileCard>
        </div>
      </div>
    </div>
  );
}
