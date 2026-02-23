"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  BookOpen,
  ArrowLeft,
  Edit2,
  Save,
  X,
  Plus,
  Loader2,
} from "lucide-react";
import { Teacher } from "@/src/types";
import { updateTeacherAction } from "../../actions";

export default function TeacherProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const teacherId = resolvedParams.id;

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // For Editing state
  const [subjects, setSubjects] = useState<string[]>([]);
  const [subjectInput, setSubjectInput] = useState("");

  useEffect(() => {
    async function fetchTeacher() {
      try {
        const response = await fetch("/api/teachers");
        const data: Teacher[] = await response.json();
        const t = data.find((item) => item.id === teacherId);
        if (t) {
          setTeacher(t);
          setSubjects(t.subjects);
        } else {
          router.replace("/");
        }
      } catch (err) {
        console.error("Failed to fetch teacher:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTeacher();
  }, [teacherId, router]);

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
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("subjects", subjects.join(","));

    try {
      await updateTeacherAction(teacherId, formData);
      const response = await fetch("/api/teachers");
      const data: Teacher[] = await response.json();
      const updated = data.find((item) => item.id === teacherId);
      if (updated) setTeacher(updated);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || "Failed to update teacher.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">
          Loading Profile...
        </span>
      </div>
    );

  if (!teacher) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex justify-between items-center">
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
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-100 active:scale-95"
          >
            <Edit2 size={18} />
            <span>Edit Information</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div
          className={`h-40 transition-all duration-700 ${isEditing ? "bg-slate-800" : "bg-indigo-600"} relative`}
        >
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/5 text-white/50 font-bold tracking-widest uppercase text-xs">
              Editing Session
            </div>
          )}
        </div>

        <div className="px-8 py-6 relative">
          <div className="flex justify-between items-center">
            <div className="w-32 h-32 bg-white rounded-3xl p-1.5 shadow-2xl">
              <div className="w-full h-full bg-slate-100 rounded-2xl overflow-hidden">
                {teacher.profilePicture ? (
                  <img
                    src={teacher.profilePicture}
                    alt={`${teacher.firstName} ${teacher.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-3xl font-bold bg-slate-100 uppercase">
                    {teacher.firstName[0]}
                    {teacher.lastName[0]}
                  </div>
                )}
              </div>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="mt-20 space-y-8">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
                  <X size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    defaultValue={teacher.firstName}
                    required
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    defaultValue={teacher.lastName}
                    required
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Email (Unique)
                  </label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={teacher.email}
                    required
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Phone
                  </label>
                  <input
                    name="phone"
                    defaultValue={teacher.phone}
                    required
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Room Number
                  </label>
                  <input
                    name="roomNumber"
                    defaultValue={teacher.roomNumber}
                    required
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Profile URL
                  </label>
                  <input
                    name="profilePicture"
                    defaultValue={teacher.profilePicture}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Subjects (Max 5)
                </label>
                <div className="flex gap-2">
                  <input
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    placeholder="Add subject..."
                    className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={addSubject}
                    className="bg-indigo-100 text-indigo-600 px-4 py-3 rounded-xl hover:bg-indigo-200 transition-colors"
                  >
                    <Plus size={24} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((s, idx) => (
                    <div
                      key={idx}
                      className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg flex items-center gap-2 font-bold text-sm border border-indigo-100"
                    >
                      <span>{s}</span>
                      <button
                        type="button"
                        onClick={() => removeSubject(idx)}
                        className="hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-8 border-t border-slate-50">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-[0.98] transition-all"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Save size={20} />
                  )}
                  <span>Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-8 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="mt-20">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  {teacher.firstName} {teacher.lastName}
                </h1>
                <p className="text-indigo-600 font-bold mt-2 uppercase tracking-widest text-xs">
                  Full Teacher Profile
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">
                      Contact & Location
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 shrink-0">
                          <Mail size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Email Address
                          </p>
                          <p className="text-slate-900 font-bold mt-0.5">
                            {teacher.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 shrink-0">
                          <Phone size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Phone Number
                          </p>
                          <p className="text-slate-900 font-bold mt-0.5">
                            {teacher.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 shrink-0">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Room / Office
                          </p>
                          <p className="text-slate-900 font-bold mt-0.5">
                            Room {teacher.roomNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">
                    Academic Subjects
                  </h3>
                  <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                      <BookOpen size={24} className="text-indigo-500" />
                      <span className="text-lg font-bold text-slate-900">
                        Education Areas
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {teacher.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="bg-white text-indigo-600 border border-indigo-100 px-4 py-2 rounded-xl text-sm font-bold shadow-sm"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                    {teacher.subjects.length === 0 && (
                      <p className="text-slate-400 italic text-sm">
                        No subjects listed.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
