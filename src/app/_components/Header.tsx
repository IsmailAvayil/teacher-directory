import { Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
