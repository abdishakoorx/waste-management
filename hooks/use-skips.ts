import { useState, useEffect, useCallback } from "react";
import { Skip, LocationParams } from "@/types/skip.types";
import { skipApiClient, SkipApiError } from "@/lib/api/skip-api";

interface UseSkipsReturn {
  skips: Skip[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useSkips(params: LocationParams): UseSkipsReturn {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkips = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await skipApiClient.getSkipsByLocation(params);
      setSkips(data);
    } catch (err) {
      const errorMessage =
        err instanceof SkipApiError
          ? err.message
          : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Error fetching skips:", err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchSkips();
  }, [fetchSkips]);

  return {
    skips,
    loading,
    error,
    refetch: fetchSkips,
  };
}
