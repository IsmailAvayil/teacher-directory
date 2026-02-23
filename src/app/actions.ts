"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/options";
import { getTeachers, saveTeachers } from "../lib/data-service";
import { Teacher } from "../types";
import { v4 as uuidv4 } from "uuid";

export async function createTeacher(formData: FormData) {
  const teachers = await getTeachers();
  const email = formData.get("email") as string;

  // Unique email check
  if (teachers.some((t) => t.email === email)) {
    throw new Error("A teacher with this email already exists.");
  }

  const subjects = (formData.get("subjects") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Subject limit check
  if (subjects.length > 5) {
    throw new Error("A teacher can teach no more than 5 subjects.");
  }

  const newTeacher: Teacher = {
    id: uuidv4(),
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: email,
    phone: formData.get("phone") as string,
    roomNumber: formData.get("roomNumber") as string,
    profilePicture:
      (formData.get("profilePicture") as string) ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    subjects: subjects,
  };

  teachers.push(newTeacher);
  await saveTeachers(teachers);

  revalidatePath("/");
  redirect("/");
}

export async function updateTeacherAction(id: string, formData: FormData) {
  const teachers = await getTeachers();
  const index = teachers.findIndex((t) => t.id === id);

  if (index === -1) throw new Error("Teacher not found");

  const email = formData.get("email") as string;

  // Unique email check (excluding current teacher)
  if (teachers.some((t) => t.email === email && t.id !== id)) {
    throw new Error("A teacher with this email already exists.");
  }

  const subjects = (formData.get("subjects") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (subjects.length > 5) {
    throw new Error("A teacher can teach no more than 5 subjects.");
  }

  teachers[index] = {
    ...teachers[index],
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: email,
    phone: formData.get("phone") as string,
    roomNumber: formData.get("roomNumber") as string,
    profilePicture:
      (formData.get("profilePicture") as string) ||
      teachers[index].profilePicture,
    subjects: subjects,
  };

  await saveTeachers(teachers);

  revalidatePath("/");
  revalidatePath(`/teachers/${id}`);
}

export async function deleteTeacherAction(id: string) {
  const teachers = await getTeachers();
  const filtered = teachers.filter((t) => t.id !== id);
  await saveTeachers(filtered);

  revalidatePath("/");
  redirect("/");
}

export async function importTeachers(teachersToImport: any[]) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const existingTeachers = await getTeachers();
  const newTeachers = [...existingTeachers];
  let importedCount = 0;
  let skippedCount = 0;

  for (const t of teachersToImport) {
    // Basic validation
    if (!t.firstName || !t.lastName || !t.email) {
      skippedCount++;
      continue;
    }

    // Unique email check
    if (newTeachers.some((existing) => existing.email === t.email)) {
      skippedCount++;
      continue;
    }

    // Subject limit check
    const subjects = Array.isArray(t.subjects) ? t.subjects.slice(0, 5) : [];

    newTeachers.push({
      id: uuidv4(),
      firstName: t.firstName,
      lastName: t.lastName,
      email: t.email,
      phone: t.phone || "N/A",
      roomNumber: t.roomNumber || "N/A",
      profilePicture:
        t.profilePicture ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.email}`,
      subjects: subjects,
    });
    importedCount++;
  }

  await saveTeachers(newTeachers);
  revalidatePath("/");
  return { importedCount, skippedCount };
}
