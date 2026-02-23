"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Filter, Mail, MapPin, Users, Loader2 } from "lucide-react";
import { Teacher } from "../types";

export default function DirectoryPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [allSubjects, setAllSubjects] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Initial fetch for all unique subjects to populate the filter
  useEffect(() => {
    async function fetchAllSubjects() {
      const response = await fetch("/api/teachers");
      const data: Teacher[] = await response.json();
      const subjects = Array.from(
        new Set(data.flatMap((t) => t.subjects)),
      ).sort();
      setAllSubjects(subjects);
    }
    fetchAllSubjects();
  }, []);

  // AJAX Fetching based on filters
  useEffect(() => {
    async function fetchFilteredTeachers() {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (selectedLetter) query.append("letter", selectedLetter);
        if (selectedSubject) query.append("subject", selectedSubject);

        const response = await fetch(`/api/teachers?${query.toString()}`);
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error("AJAX Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFilteredTeachers();
  }, [selectedLetter, selectedSubject]);

  const resetFilters = () => {
    setSelectedLetter(null);
    setSelectedSubject(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
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

      {/* Filters Section */}
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
              {allSubjects.map((s) => (
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

      {/* Directory Content */}
      <div className="relative min-h-[400px]">
        {loading && (
          <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-3xl">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
              <span className="text-slate-500 font-bold text-sm tracking-widest uppercase">
                Fetching...
              </span>
            </div>
          </div>
        )}

        {teachers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teachers.map((teacher) => (
              <Link
                href={`/teachers/${teacher.id}`}
                key={teacher.id}
                className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 -mr-12 -mt-12 rounded-full group-hover:bg-indigo-100 transition-colors"></div>

                <div className="relative">
                  <div className="w-20 h-20 bg-indigo-100 rounded-2xl mb-4 overflow-hidden shadow-inner">
                    {teacher.profilePicture ? (
                      <img
                        src={teacher.profilePicture}
                        alt={`${teacher.firstName} ${teacher.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-indigo-400 text-2xl font-bold capitalize">
                        {teacher.firstName[0]}
                        {teacher.lastName[0]}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {teacher.firstName} {teacher.lastName}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <MapPin size={14} className="text-indigo-400" />
                      <span>Room {teacher.roomNumber}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-50 space-y-2">
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <Mail size={14} className="shrink-0" />
                      <span className="truncate">{teacher.email}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {teacher.subjects.slice(0, 3).map((subject) => (
                        <span
                          key={subject}
                          className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-tight"
                        >
                          {subject}
                        </span>
                      ))}
                      {teacher.subjects.length > 3 && (
                        <span className="text-[10px] font-bold text-slate-400 flex items-center h-6 px-1">
                          +{teacher.subjects.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
              <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-500">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                No teachers found
              </h3>
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
          )
        )}
      </div>
    </div>
  );
}
