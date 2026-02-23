import fs from 'fs/promises';
import path from 'path';
import { Teacher } from '../types';

const DATA_PATH = path.join(process.cwd(), 'data', 'teachers.json');

export async function getTeachers(): Promise<Teacher[]> {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading teachers.json:', error);
        return [];
    }
}

export async function saveTeachers(teachers: Teacher[]): Promise<void> {
    try {
        await fs.writeFile(DATA_PATH, JSON.stringify(teachers, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing teachers.json:', error);
    }
}

export async function addTeacher(teacher: Teacher): Promise<void> {
    const teachers = await getTeachers();
    teachers.push(teacher);
    await saveTeachers(teachers);
}

export async function updateTeacher(updatedTeacher: Teacher): Promise<void> {
    const teachers = await getTeachers();
    const index = teachers.findIndex((t) => t.id === updatedTeacher.id);
    if (index !== -1) {
        teachers[index] = updatedTeacher;
        await saveTeachers(teachers);
    }
}

export async function deleteTeacher(id: string): Promise<void> {
    const teachers = await getTeachers();
    const filtered = teachers.filter((t) => t.id !== id);
    await saveTeachers(filtered);
}
