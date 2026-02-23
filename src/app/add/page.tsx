"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useState } from "react";
import { createTeacher } from "../actions";

interface TeacherForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roomNumber: string;
  profilePicture: string;
}

export default function AddTeacherPage() {
  const router = useRouter();

  const [form, setForm] = useState<TeacherForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    roomNumber: "",
    profilePicture: "",
  });

  const [subjects, setSubjects] = useState<string[]>([]);
  const [subjectInput, setSubjectInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSubject = () => {
    const trimmed = subjectInput.trim();
    if (!trimmed) return;

    if (subjects.length >= 5) {
      setError("Maximum 5 subjects allowed.");
      return;
    }

    if (subjects.includes(trimmed)) {
      setError("Subject already added.");
      return;
    }

    setSubjects((prev) => [...prev, trimmed]);
    setSubjectInput("");
    setError(null);
  };

  const removeSubject = (index: number) => {
    setSubjects((prev) => prev.filter((_, i) => i !== index));
  };

  const isFormValid =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.roomNumber.trim() &&
    subjects.length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      setError("Please fill all required fields and add at least one subject.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("roomNumber", form.roomNumber);
    formData.append("profilePicture", form.profilePicture);
    formData.append("subjects", subjects.join(","));

    try {
      await createTeacher(formData);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to create teacher.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600"
      >
        <ArrowLeft size={20} />
        Back to Directory
      </Link>

      <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-8 py-10 text-white">
          <h1 className="text-3xl font-bold">Add New Teacher</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-semibold">
              {error}
            </div>
          )}

          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full bg-slate-50 rounded-xl px-4 py-3 outline-none"
          />

          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full bg-slate-50 rounded-xl px-4 py-3 outline-none"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full bg-slate-50 rounded-xl px-4 py-3 outline-none"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full bg-slate-50 rounded-xl px-4 py-3 outline-none"
          />

          <input
            name="roomNumber"
            value={form.roomNumber}
            onChange={handleChange}
            placeholder="Room Number"
            className="w-full bg-slate-50 rounded-xl px-4 py-3 outline-none"
          />

          <input
            name="profilePicture"
            value={form.profilePicture}
            onChange={handleChange}
            placeholder="Profile Picture URL"
            className="w-full bg-slate-50 rounded-xl px-4 py-3 outline-none"
          />

          <div className="space-y-3">
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
                placeholder="Add subject"
                className="flex-1 bg-slate-50 rounded-xl px-4 py-3 outline-none"
              />
              <button
                type="button"
                onClick={addSubject}
                disabled={!subjectInput.trim() || subjects.length >= 5}
                className="bg-indigo-600 text-white px-4 rounded-xl disabled:opacity-50"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {subjects.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-indigo-100 px-3 py-1 rounded-lg flex items-center gap-2"
                >
                  {s}
                  <button type="button" onClick={() => removeSubject(idx)}>
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold disabled:opacity-50"
          >
            {isSubmitting ? "Registering..." : "Register Teacher"}
          </button>
        </form>
      </div>
    </div>
  );
}
