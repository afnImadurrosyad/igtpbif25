const profileData = {
  biodata: {
    nama: "Firman Luthfiansyah",
    nim: "125140044",
    programStudi: "Teknik Informatika",
    tpb: "53",
    gender: "Male",
    tanggalLahir: "16 Januari 2006",
  },
};

const DataRow = ({ label, value }) => (
  <div className="flex flex-col space-y-0.5">
    <span className="text-xs text-[#5A5A3D] opacity-70 font-medium">
      {label}
    </span>
    <span className="text-sm font-semibold text-[#5A5A3D]">{value}</span>
  </div>
);

const ProfileCard = ({ title, children, className = "" }) => (
  <div className={`bg-[#F7F1E7] p-6 rounded-xl ${className}`}>
    <h3 className="text-lg font-bold mb-4 text-[#5A5A3D]">{title}</h3>
    {children}
  </div>
);

export default function DashboardProfile() {
  const { biodata, kelompok, pendamping } = profileData;

  return (
    <div className="min-h-screen p-12 bg-[#DCE2B7] flex justify-center items-start">
      <div className="w-full max-w-4xl p-10 bg-[#DCE2B7] rounded-[2rem]">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl lg:text-4xl font-semibold text-[#5A5A3D]">
            Hi Firman Luthfiansyah,
          </h1>
          <p className="text-3xl lg:text-4xl font-semibold text-[#5A5A3D]">
            Have a great day.
          </p>
        </header>

        <div className="space-y-6">
          <ProfileCard title="Biodata Diri">
            <div className="grid grid-cols-2 gap-x-12 gap-y-5">
              <DataRow label="Nama" value={biodata.nama} />
              <DataRow label="Gender" value={biodata.gender} />
              <DataRow label="NIM" value={biodata.nim} />
              <DataRow label="Tanggal Lahir" value={biodata.tanggalLahir} />
              <DataRow label="Program Studi" value={biodata.programStudi} />
            </div>
          </ProfileCard>
        </div>
      </div>
    </div>
  );
}
