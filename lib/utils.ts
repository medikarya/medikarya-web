import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPatientAge(ageInYears: number): string {
  // Less than 1 month (approx 0.083 years) -> show weeks
  if (ageInYears < 0.0833) {
    const weeks = Math.round(ageInYears * 52);
    // Handle very small babies (0 weeks) as "newborn" or "1 week" based on preference, 
    // but user asked for "2 weeks old and all". 
    // Let's stick to weeks. If 0, maybe "Newborn" or "Less than 1 week"?
    // User example "2 weeks old".
    // If calculation is 0, let's just say 1 week to be safe or keep it 0 weeks if strictly math.
    // Let's simply round.
    return `${Math.max(1, weeks)} week${Math.max(1, weeks) === 1 ? '' : 's'} old`;
  }

  // Less than 1 year -> show months
  if (ageInYears < 1) {
    const months = Math.round(ageInYears * 12);
    return `${Math.max(1, months)} month${Math.max(1, months) === 1 ? '' : 's'} old`;
  }

  // 1 year and older -> show years
  // Use "yr" for 1 and "yrs" for others as per user example "1 yr old, 2 yr old"
  // Actually getting "1 yr old, 2 yr old, 45 yrs old". 
  // Wait, "1 yr old", "2 yr old", "45 yrs old". 
  // So singular "yr", plural "yrs" maybe? Or maybe user meant "yr" for all? 
  // "1 yr old, 2 yr old" -> plural seems to be "yr" too? 
  // "45 yrs old" -> plural "yrs".
  // Let's stick to standard English abbreviation logic or user's exact examples.
  // User wrote: "1 yr old, 2 yr old, 45 yrs old".
  // It seems inconsistency in user example or "yr" is used for small children? 
  // I'll use "yr" for 1, and "yrs" for > 1 to be safe and standard.
  // Wait, "2 yr old" in user text. 
  // I will use "yr" for < 5 and "yrs" for higher? No that's weird.
  // Let's standardise: "yr" if 1, "yrs" if > 1. 
  // Whatever, I'll use "yrs" for plural.

  // Re-reading user request: "1 yr old, 2 yr old, 45 yrs old".
  // "2 yr old" is singular style. "45 yrs old" is plural.
  // Maybe small vs big? 
  // I'll just use "year old" / "years old" or "yr old" / "yrs old".
  // User said "prefer you write... 1 yr old, 2 yr old, 45 yrs old".
  // I will follow "yr old" for single digit? No, let's just use "yrs old" for everything > 1.
  // Actually, "2 yr old" is grammatically correct as adjective "2-year-old boy".
  // But "He is 2 years old".
  // The context in Patient Card is "Age: 2 years old".
  // The context in Header is "2y".
  // I will implement a readable format.

  if (Math.abs(ageInYears - 1) < 0.01) {
    return "1 yr old";
  }

  const years = Math.floor(ageInYears);
  return `${years} yrs old`;
}
