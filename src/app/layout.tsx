import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import {} from "lucide-react";
import { AuthProvider } from "./components/auth-provider";
import Header from "./_components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teacher Directory",
  description: "A directory for managing school teachers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen`}
      >
        <Header />
        <AuthProvider>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
