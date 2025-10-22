"use client";

import { supabase } from "@/utils/supabaseClient";
const DEV_NIM_KEY = "igttpb_dev_session_nim";

export function setDevNIM(nim){
    if(typeof window === "undefined") return;
    localStorage.setItem(DEV_NIM_KEY, String(nim));
}
export function clearDevNIM(){
    if(typeof window === "undefined") return;
    localStorage.removeItem(DEV_NIM_KEY);
}
export function getDevNIM(){
    if(typeof window === "undefined") return null;
    const v = localStorage.getItem(DEV_NIM_KEY);
    return v || null;
}
export async function fetchPesertaByNIM(nim){
    if(!nim) return null;
    const {data, error} = await supabase.from("presensi").select("nim, nama, kelompok").eq("nim", nim).limit(1).maybeSingle();
    if(error) throw error;
    return data
}
export async function getCurrentPeserta(){
    try {
        const {data: auth} = await supabase.auth.getUser();
        const user = auth?.user;
        const nimFromAuth = user?.user_metadata?.nim || user?.app_metadata?.nim || null;
        if(nimFromAuth){
            const row = await fetchPesertaByNIM(nimFromAuth);
            if(row?.nim) return {...row, source: "auth"};
        }
    } catch {
        // abaikan
    }
    const devNim = getDevNIM();
    if(devNim){
        const row = await fetchPesertaByNIM(devNim);
        if(row?.nim) return {...row, source: "dev-local"};
    }
    return null;
}