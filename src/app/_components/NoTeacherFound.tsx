import { Users } from "lucide-react";
import React from "react";

export const NoTeacherFound = ({ resetFilters }: any) => {
  return (
    <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
      <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-500">
        <Users size={32} />
      </div>
      <h3 className="text-2xl font-bold text-slate-900">No teachers found</h3>
      <p className="text-slate-500 mt-2 max-w-sm mx-auto">
        Try adjusting your filters.
      </p>
      <button
        onClick={resetFilters}
        className="mt-6 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition-all"
      >
        Clear Filters
      </button>
    </div>
  );
};
