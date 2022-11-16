export interface PlanRequestDTO {
  id: string;
  name: string;
  amountPerMonth: number;
  discountPerYear: number;
  apiCallCount: number;
  isTrial?: boolean;
  features: Feature[];
}

export interface InitializePaymentDTO {
  planId: string;
  durationInMonths: number;
}

export interface Feature {
  name: string;
}
export interface LandingCount {
  brandCount: number;
  drugCount: number;
  genericCount: number;
  companyCount: number;
}

export const  InitialLandingCount= {
  brandCount: 0,
  drugCount: 0,
  genericCount: 0,
  companyCount: 0,
}

