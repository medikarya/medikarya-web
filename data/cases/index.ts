import { promises as fs } from 'fs';
import path from 'path';

export interface CaseMetadata {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: number;
  tags: string[];
  description: string;
  xpReward: number;
  completionRate?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CaseCardProps extends Omit<CaseMetadata, 'createdAt' | 'updatedAt'> {
  // Additional UI-specific properties can be added here
}

export interface CaseData extends CaseMetadata {
  patient: any;
  patient_text_brief: string;
  patient_facts: any; // Structured object with variable keys
  questions: any[];
  discussion: any;
  ai_role?: {
    speaker: string;
    first_person_description: string;
    age_group: string;
    can_speak_for_self: boolean;
    language_style: string;
    emotional_tone: string;
    key_constraints: string[];
  };
  ai_examples?: {
    doctor: string;
    patient: string;
  }[];
}

const CASES_DIR = path.join(process.cwd(), 'data/cases');

export async function getCases(): Promise<CaseMetadata[]> {
  const files = await fs.readdir(CASES_DIR);
  const caseFiles = files.filter(file => file.endsWith('.json'));

  const cases = await Promise.all(
    caseFiles.map(async (file) => {
      const filePath = path.join(CASES_DIR, file);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const caseData: CaseData = JSON.parse(fileContent);

      // Return only the metadata
      const { patient, questions, discussion, ...metadata } = caseData;
      return metadata;
    })
  );

  return cases.sort((a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export async function getCaseById(id: string): Promise<CaseData | null> {
  try {
    const filePath = path.join(CASES_DIR, `${id}.json`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading case ${id}:`, error);
    return null;
  }
}

export async function updateCase(id: string, data: Partial<CaseData>): Promise<CaseData | null> {
  try {
    const filePath = path.join(CASES_DIR, `${id}.json`);

    // Get existing data
    const existingData = await getCaseById(id);
    if (!existingData) return null;

    // Merge with new data
    const updatedData = { ...existingData, ...data, updatedAt: new Date().toISOString() };

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), 'utf8');

    return updatedData;
  } catch (error) {
    console.error(`Error updating case ${id}:`, error);
    return null;
  }
}
