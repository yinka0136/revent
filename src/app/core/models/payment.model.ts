export interface PlanRequestDTO {
  id: string;
  name: string;
  amountPerMonth: number;
  discountPerYear: number;
  apiCallCount: number;
  isTrial: boolean;
  features: Feature[];
}

export interface InitializePaymentDTO {
  planId: string;
  durationInMonths: number;
}

export interface PaystackResponseDTO {
  message: string;
  redirecturl: string;
  reference: string;
  response: string;
  status: string;
  trans: string;
  trxref: string;
}

export interface Feature {
  name: string;
}
