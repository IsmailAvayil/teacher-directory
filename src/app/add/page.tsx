"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Camera,
} from "lucide-react";
import { useState } from "react";
import { createTeacher } from "../actions";

export default function AddTeacherPage() {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [subjectInput, setSubjectInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSubject = () => {
    if (subjectInput.trim()) {
      if (subjects.length >= 5) {
        setError("Maximum 5 subjects allowed.");
        return;
      }
      if (subjects.includes(subjectInput.trim())) {
        setError("Subject already added.");
        return;
      }
      setSubjects([...subjects, subjectInput.trim()]);
      setSubjectInput("");
      setError(null);
    }
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
    if (subjects.length <= 5) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("subjects", subjects.join(","));

    try {
      await createTeacher(formData);
    } catch (err: any) {
      setError(err.message || "Failed to create teacher.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span>Back to Directory</span>
      </Link>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-8 py-10 text-white">
          <h1 className="text-3xl font-bold tracking-tight">Add New Teacher</h1>
          <p className="text-indigo-100 mt-2 font-medium opacity-90">
            Register a new educator into the directory
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 animate-shake">
              <X size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <User size={16} className="text-indigo-500" />
                First Name
              </label>
              <input
                name="firstName"
                required
                placeholder="e.g. John"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <User size={16} className="text-indigo-500" />
                Last Name
              </label>
              <input
                name="lastName"
                required
                placeholder="e.g. Smith"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Mail size={16} className="text-indigo-500" />
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="john.smith@school.edu"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Phone size={16} className="text-indigo-500" />
                Phone Number
              </label>
              <input
                name="phone"
                required
                placeholder="555-0101"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin size={16} className="text-indigo-500" />
                Room Number
              </label>
              <input
                name="roomNumber"
                required
                placeholder="101"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Camera size={16} className="text-indigo-500" />
                Profile Picture URL
              </label>
              <input
                name="profilePicture"
                placeholder="https://..."
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
              <p className="text-[10px] text-slate-400 italic">
                Leave empty for an auto-generated avatar
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <BookOpen size={16} className="text-indigo-500" />
              Subjects (Max 5)
            </label>
            <div className="flex gap-2">
              <input
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSubject();
                  }
                }}
                placeholder="Add a subject..."
                className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
              <button
                type="button"
                onClick={addSubject}
                className="bg-indigo-100 text-indigo-600 px-4 py-3 rounded-xl hover:bg-indigo-200 transition-colors"
                disabled={!subjectInput.trim() || subjects.length >= 5}
              >
                <Plus size={24} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {subjects.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm border border-indigo-100"
                >
                  <span>{s}</span>
                  <button
                    onClick={() => removeSubject(idx)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {subjects.length === 0 && (
                <p className="text-sm text-slate-400 italic py-2">
                  No subjects added yet
                </p>
              )}
            </div>
          </div>

          <div className="pt-8 border-t border-slate-50">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 active:scale-[0.98]"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save size={20} />
                  <span>Register Teacher</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
