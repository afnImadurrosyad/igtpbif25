import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import ErrorBoundary from "../components/ErrorBoundary";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "IGTTPB 2025",
  description: "Informatics Goes To TPB 2025 - Institut Teknologi Sumatera",
  icons: {
    icon: "https://res.cloudinary.com/ddzjskfyn/image/upload/v1759423035/igttpb2025logo_lfcrjn.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <AuthProvider>{children}</AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
