// utils/localRole.js

// Simpan role ke localStorage
export function saveRoleToLocal(role) {
  if (typeof window !== 'undefined' && role) {
    localStorage.setItem('user_role', role);
  }
}

// Ambil role dari localStorage
export function getRoleFromLocal() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('user_role');
  }
  return null;
}

// Hapus role dari localStorage (misal saat logout)
export function clearRoleFromLocal() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_role');
  }
}
