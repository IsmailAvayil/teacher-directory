import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { User, Users, Upload } from "lucide-react";
import {} from "lucide-react";
import { AuthProvider } from "./components/auth-provider";

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
        <AuthProvider>
          <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="flex items-center">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-indigo-600 font-bold text-xl transition-colors hover:text-indigo-700"
                  >
                    <Users size={28} />
                    <span>TeacherDir</span>
                  </Link>
                </div>
                <div className="flex items-center gap-6">
                  <Link
                    href="/"
                    className="text-slate-600 hover:text-indigo-600 transition-colors font-medium"
                  >
                    Directory
                  </Link>
                  {/* <Link
                    href="/importer"
                    className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
                  >
                    <Upload size={18} />
                    <span>Bulk Import</span>
                  </Link> */}
                </div>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
