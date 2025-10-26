export function saveRoleToLocal(role) {
  if (typeof window !== 'undefined' && role) {
    localStorage.setItem('user_role', role);
  }
}

export function saveNimToLocal(nim) {
  if (typeof window !== 'undefined' && nim) {
    localStorage.setItem('user_nim', nim);
  }
}

export function saveNamaToLocal(nama) {
  if (typeof window !== 'undefined' && nama) {
    localStorage.setItem('user_nama', nama);
  }
}

export function getNamaFromLocal() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('user_nama');
  }
  return null;
}

export function getRoleFromLocal() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('user_role');
  }
  return null;
}

export function getNimFromLocal() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('user_nim');
  }
  return null;
}

export function clearRoleFromLocal() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_nim');
  }
}
