export interface Skip {
  id: string;
  size: number;
  price_before_vat: number;
  vat: number;
  hire_period_days: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

export interface SkipApiResponse {
  data: Skip[];
  success: boolean;
  message?: string;
}

export interface LocationParams {
  postcode: string;
  area: string;
}
