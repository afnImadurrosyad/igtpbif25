export default function Navbar() {
  return (
    <nav className="p-4 bg-blue-600 text-white flex items-center justify-between">
      {/* Kiri */}
      <div className="flex-1">
        <h1 className="font-bold"><a href="#">IGTTPB</a></h1>
      </div>

      {/* Tengah */}
      <div className="flex-1 flex justify-center">
        <ul className="flex gap-6">
          <li><a href="/">atur</a></li>
          <li><a href="/">lah</a></li>
          <li><a href="/">abang</a></li>
          <li><a href="/">kan</a></li>
          <li><a href="/">kating</a></li>
        </ul>
      </div>

      {/* Kanan */}
      <div className="flex-1 flex justify-end">
        <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition">
          P Login
        </button>
      </div>
    </nav>
  );
}
