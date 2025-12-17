export interface Customer {
  account_number: string;
  issue_date: string;
  interest_rate: number;
  tenure: number;
  emi_due: number;
  customer_name: string;
  total_loan_amount: number;
}

export interface Payment {
  id: number;
  payment_date: string;
  payment_amount: number;
  status: string;
  customer_name: string;
  account_number: string;
}

export interface PaymentResponse {
  success: boolean;
  message?: string;
  data?: {
    payment_id: number;
    account_number: string;
    payment_amount: number;
    remaining_due: number;
  };
}

export interface CustomersResponse {
  success: boolean;
  message?: string;
  data?: Customer[];
}

export interface PaymentHistoryResponse {
  success: boolean;
  message?: string;
  data?: Payment[];
}
