import { Skip, LocationParams } from "@/types/skip.types";

export class SkipApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "SkipApiError";
  }
}

class SkipApiClient {
  private cache = new Map<string, { data: Skip[]; timestamp: number }>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  private getCacheKey(params: LocationParams): string {
    return `skips_${params.postcode}_${params.area}`.toLowerCase();
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_TTL;
  }

  private getFromCache(cacheKey: string): Skip[] | null {
    const cached = this.cache.get(cacheKey);
    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.data;
    }
    return null;
  }

  private setCache(cacheKey: string, data: Skip[]): void {
    this.cache.set(cacheKey, { data, timestamp: Date.now() });
  }

  async getSkipsByLocation(params: LocationParams): Promise<Skip[]> {
    const cacheKey = this.getCacheKey(params);

    // Check cache first
    const cachedData = this.getFromCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      // Use the exact URL from the assignment
      const url = `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${params.postcode}&area=${params.area}`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new SkipApiError(
          `API request failed: ${response.status} ${response.statusText}`,
          response.status
        );
      }

      const data: Skip[] = await response.json();

      // Filter common skip sizes for better UX
      const filteredSkips = data.filter(
        (skip) => skip.size >= 4 && skip.size <= 14
      );

      // Cache the result
      this.setCache(cacheKey, filteredSkips);

      return filteredSkips;
    } catch (error) {
      if (error instanceof SkipApiError) {
        throw error;
      }

      throw new SkipApiError(
        "Failed to fetch skip data. Please check your connection and try again.",
        undefined,
        error
      );
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const skipApiClient = new SkipApiClient();
