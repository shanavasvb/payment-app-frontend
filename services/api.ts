import { API_URL } from '../config.js';
import { CustomersResponse, PaymentResponse, PaymentHistoryResponse } from '../types/customer';

export const fetchCustomers = async (signal?: AbortSignal): Promise<CustomersResponse> => {
  const response = await fetch(`${API_URL}/customers`, signal ? { signal } : {});
  return await response.json();
};

export const submitPayment = async (
  accountNumber: string,
  paymentAmount: number
): Promise<PaymentResponse> => {
  const response = await fetch(`${API_URL}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      account_number: accountNumber,
      payment_amount: paymentAmount,
    }),
  });
  return await response.json();
};

export const getAllPayments = async (signal?: AbortSignal): Promise<PaymentHistoryResponse> => {
  const response = await fetch(`${API_URL}/payments`, signal ? { signal } : {});
  return await response.json();
};
