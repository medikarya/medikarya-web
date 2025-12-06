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
  questions: any[];
  discussion: any;
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
