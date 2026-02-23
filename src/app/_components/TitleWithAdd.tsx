import { Plus } from "lucide-react";
import Link from "next/link";

const TitleWithAdd = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Teacher Directory
        </h1>
        <p className="text-slate-500 mt-1">School Staff List</p>
      </div>
      <Link
        href="/add"
        className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 font-semibold"
      >
        <Plus size={20} />
        <span>Add Teacher</span>
      </Link>
    </header>
  );
};

export default TitleWithAdd;
