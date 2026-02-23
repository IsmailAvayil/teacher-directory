"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

import {
  Upload,
  FileJson,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { importTeachers } from "../actions";

export default function ImporterPage() {
  const { data: session, status } = useSession();
  const [isImporting, setIsImporting] = useState(false);
  const [result, setResult] = useState<{
    imported: number;
    skipped: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (status === "loading")
    return (
      <div className="p-20 text-center animate-pulse text-slate-400 font-bold">
        Checking authorization...
      </div>
    );
  if (status === "unauthenticated") redirect("/auth/signin");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (!Array.isArray(json))
          throw new Error("JSON must be an array of teachers");

        const res = await importTeachers(json);
        setResult({ imported: res.importedCount, skipped: res.skippedCount });
      } catch (err: any) {
        setError(err.message || "Failed to parse or import data.");
      } finally {
        setIsImporting(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-10 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Bulk Importer
              </h1>
              <p className="text-slate-400 mt-2 font-medium">
                Add multiple teachers via JSON file upload
              </p>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Logged in as
              </p>
              <p className="text-sm font-bold text-white">
                {session?.user?.name}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 animate-shake font-semibold">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {result && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-6 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 font-bold mb-2">
                <CheckCircle size={20} />
                <span>Import completed successfully!</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 p-3 rounded-xl">
                  <p className="text-xs uppercase font-bold text-emerald-600/60">
                    Imported
                  </p>
                  <p className="text-2xl font-black">{result.imported}</p>
                </div>
                <div className="bg-white/50 p-3 rounded-xl">
                  <p className="text-xs uppercase font-bold text-slate-400">
                    Skipped/Duplicate
                  </p>
                  <p className="text-2xl font-black text-slate-600">
                    {result.skipped}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">How to use</h3>
              <ul className="space-y-3 text-slate-500 text-sm font-medium">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    1
                  </div>
                  <span>
                    Prepare a JSON file containing an array of teacher objects.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    2
                  </div>
                  <span>
                    Each object should have <b>firstName</b>, <b>lastName</b>,
                    and <b>email</b>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    3
                  </div>
                  <span>
                    Duplicates based on email will be automatically skipped.
                  </span>
                </li>
              </ul>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <FileJson size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Example JSON Format
                  </span>
                </div>
                <pre className="text-[10px] text-slate-500 font-mono overflow-x-auto">
                  {`[
  {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@school.edu",
    "subjects": ["Math", "Art"]
  }
]`}
                </pre>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-8 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
              <label className="cursor-pointer flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
                  {isImporting ? (
                    <Loader2 size={32} className="animate-spin" />
                  ) : (
                    <Upload size={32} />
                  )}
                </div>
                <div className="space-y-1">
                  <span className="text-base font-bold text-slate-900 block">
                    Click to upload JSON
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Drag and drop also supported
                  </span>
                </div>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isImporting}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
