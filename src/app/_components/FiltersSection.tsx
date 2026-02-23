import { Filter } from "lucide-react";

const FiltersSection = ({
  selectedLetter,
  setSelectedLetter,
  selectedSubject,
  setSelectedSubject,
  allSubjects,
  resetFilters,
}: any) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <div className="flex-1 space-y-3">
          <span className="text-sm font-semibold text-slate-500 block uppercase tracking-wider">
            Filter by Last Name
          </span>
          <div className="flex flex-wrap gap-2">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() =>
                  setSelectedLetter(selectedLetter === letter ? null : letter)
                }
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all border ${
                  selectedLetter === letter
                    ? "bg-indigo-600 text-white border-indigo-600 scale-110 shadow-md"
                    : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 items-center shrink-0">
          <div className="flex items-center gap-2 text-slate-500">
            <Filter size={18} />
            <span className="text-sm font-medium">Subject:</span>
          </div>
          <select
            className="bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm font-medium pr-10"
            value={selectedSubject || ""}
            onChange={(e) => setSelectedSubject(e.target.value || null)}
          >
            <option value="">All Subjects</option>
            {allSubjects.map((s: any) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {(selectedLetter || selectedSubject) && (
          <button
            onClick={resetFilters}
            className="text-indigo-600 text-sm font-semibold hover:text-indigo-700 transition-colors whitespace-nowrap"
          >
            Clear filters
          </button>
        )}
      </div>
    </section>
  );
};

export default FiltersSection;
