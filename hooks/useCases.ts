import { useState, useEffect } from 'react';
import { CaseMetadata } from '@/data/cases';

interface UseCasesReturn {
  cases: CaseMetadata[];
  loading: boolean;
  error: string | null;
}

export function useCases(): UseCasesReturn {
  const [cases, setCases] = useState<CaseMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch('/api/cases');
        if (!response.ok) {
          throw new Error('Failed to fetch cases');
        }
        const data = await response.json();
        setCases(data);
      } catch (err) {
        console.error('Error fetching cases:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  return { cases, loading, error };
}
