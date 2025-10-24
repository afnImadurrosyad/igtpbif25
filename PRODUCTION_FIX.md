# 🚨 CRITICAL FIX REQUIRED - Production Auth Issue

## Problem Diagnosis (Based on /debug/auth output)

```
isLogin: true
session present: no
localStorage sb-* keys: (none)
```

**Root Cause**: Supabase session tidak ter-persist di production karena salah satu dari:

1. **Environment variables tidak terset di Vercel Production** ⚠️ PALING UMUM
2. **Redirect URLs tidak dikonfigurasi untuk domain production di Supabase**

---

## 🔧 IMMEDIATE FIXES REQUIRED

### Fix 1: Vercel Environment Variables ⚡ DO THIS FIRST

1. Buka **Vercel Dashboard** → pilih project `igtpbif25`
2. Klik **Settings** → **Environment Variables**
3. Pastikan ada 2 variables berikut untuk **Production**:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://pzipuuirlnkasnofmdpg.supabase.co

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [your anon key dari Supabase dashboard]
```

4. **PENTING**:
   - Pastikan kedua variable di-check untuk **Production** environment
   - Jangan lupa prefix `NEXT_PUBLIC_` (harus persis seperti ini)
   - Setelah save, **REDEPLOY** aplikasi (Vercel → Deployments → pilih latest → "Redeploy")

**Cara dapat Supabase keys**:

- Login ke Supabase Dashboard
- Pilih project: `pzipuuirlnkasnofmdpg`
- Settings → API
- Copy:
  - Project URL = NEXT_PUBLIC_SUPABASE_URL
  - anon/public key = NEXT_PUBLIC_SUPABASE_ANON_KEY

---

### Fix 2: Supabase Redirect URLs ⚡ ALSO REQUIRED

1. Buka **Supabase Dashboard** → project `pzipuuirlnkasnofmdpg`
2. **Authentication** → **URL Configuration**
3. Tambahkan domain production Anda:

```
Site URL: https://your-production-domain.vercel.app

Redirect URLs (tambahkan semua):
https://your-production-domain.vercel.app
https://your-production-domain.vercel.app/
https://your-production-domain.vercel.app/dashboard
https://your-production-domain.vercel.app/**
```

4. **Save**

---

## 🧪 Verification Steps

### After fixing env vars dan redirect URLs:

1. **Redeploy** di Vercel (wajib agar env vars baru ter-apply)
2. Buka production site di **incognito/private window**
3. Buka `/debug/auth`
4. Check:
   ```
   ✅ NEXT_PUBLIC_SUPABASE_URL: Set
   ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: Set
   ```
5. Klik **Refresh session** button
6. Login via Google
7. Setelah login, buka `/debug/auth` lagi
8. Harus terlihat:
   ```
   session present: yes
   localStorage sb-* keys: sb-pzipuuirlnkasnofmdpg-auth-token
   role: user atau admin
   ```

---

## 📊 Updated Files (Auto-fixes applied)

### What I changed:

1. **src/utils/supabaseClient.js**

   - Added console.log untuk debug env vars di browser
   - Menampilkan error jelas jika env vars missing
   - Added debug flag untuk development

2. **src/app/debug/auth/page.js**
   - Menampilkan status env vars secara visual
   - Warning merah jika variables missing
   - Lebih mudah diagnose production issues

---

## ⚠️ Common Mistakes to Avoid

❌ **WRONG**: Variable name tanpa prefix

```
SUPABASE_URL=... (missing NEXT_PUBLIC_)
```

✅ **CORRECT**:

```
NEXT_PUBLIC_SUPABASE_URL=...
```

❌ **WRONG**: Set only for Preview, not Production

✅ **CORRECT**: Check "Production" checkbox saat set variable

❌ **WRONG**: Tidak redeploy setelah set env vars

✅ **CORRECT**: Always redeploy after changing env vars

---

## 🎯 Expected Result After Fixes

### Login Flow (Production):

1. User klik Login → OAuth Google
2. Redirect kembali ke production domain
3. Supabase detect hash di URL → create session
4. Session tersimpan di localStorage dengan key `sb-pzipuuirlnkasnofmdpg-auth-token`
5. AuthContext detect session → call checkRole
6. Role terdeteksi → redirect ke dashboard
7. ✅ Login berhasil!

### /debug/auth Output:

```
Environment Variables:
✅ NEXT_PUBLIC_SUPABASE_URL: Set
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: Set

isLoading: false
isLogin: true
role: user (atau admin)
nim: 124140031
user email: febrian.124140031@student.itera.ac.id

session present: yes
access_token: eyJ... (long token)

localStorage sb-* keys:
- sb-pzipuuirlnkasnofmdpg-auth-token
```

---

## 🆘 If Still Not Working After Fixes

Check browser console (F12) pada production:

1. Cari log: `[Supabase] Initializing with:`
2. Jika muncul `url: MISSING` → env vars belum terset di Vercel
3. Jika muncul error `invalid_grant` atau `redirect_uri_mismatch` → redirect URL belum diset di Supabase

**Share with me**:

- Screenshot dari Vercel env vars settings (blur sensitive values)
- Screenshot dari `/debug/auth` setelah login attempt
- Browser console errors

---

## 📝 Deployment Checklist

Sebelum deploy:

- [ ] Environment variables set di Vercel Production
- [ ] Redirect URLs configured di Supabase
- [ ] Redeploy triggered di Vercel
- [ ] Test di incognito window
- [ ] Check `/debug/auth` shows env vars present
- [ ] Login flow completes successfully
- [ ] Session persists in localStorage
- [ ] Role detection works
- [ ] Dashboard accessible

---

**Setelah commit changes ini dan set env vars, please redeploy dan test lagi!**
