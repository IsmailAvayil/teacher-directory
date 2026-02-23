import { NextRequest, NextResponse } from "next/server";
import { getTeachers } from "@/src/lib/data-service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const letter = searchParams.get("letter");
  const subject = searchParams.get("subject");

  let teachers = await getTeachers();

  if (letter) {
    teachers = teachers.filter((t) =>
      t.lastName.toUpperCase().startsWith(letter.toUpperCase()),
    );
  }

  if (subject) {
    teachers = teachers.filter((t) => t.subjects.includes(subject));
  }

  return NextResponse.json(teachers);
}
