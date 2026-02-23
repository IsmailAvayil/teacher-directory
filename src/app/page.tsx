"use client";

import { useEffect, useState } from "react";
import { Teacher } from "../types";
import TitleWithAdd from "./_components/TitleWithAdd";
import FiltersSection from "./_components/FiltersSection";
import DirectoryContent from "./_components/DirectoryContent";

export default function DirectoryPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [allSubjects, setAllSubjects] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
      <TitleWithAdd />

      <FiltersSection
        selectedLetter={selectedLetter}
        setSelectedLetter={setSelectedLetter}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        allSubjects={allSubjects}
        resetFilters={resetFilters}
      />

      <DirectoryContent
        loading={loading}
        teachers={teachers}
        resetFilters={resetFilters}
      />
    </div>
  );
}
