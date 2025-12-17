import React, { useEffect, useState } from 'react';
import { Alert, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomerList from '../components/CustomerList';
import PaymentForm from '../components/PaymentForm';
import SuccessMessage from '../components/SuccessMessage';
import { fetchCustomers as fetchCustomersAPI, submitPayment } from '../services/api';
import { Customer } from '../types/customer';

export default function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    loadCustomers(controller.signal);
    return () => controller.abort();
  }, []);

  const loadCustomers = async (signal?: AbortSignal) => {
    setLoadingCustomers(true);
    try {
      const data = await fetchCustomersAPI(signal);
      if (data.success && data.data) {
        setCustomers(data.data);
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch customers');
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to connect to server');
      }
    } finally {
      setLoadingCustomers(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCustomers();
    setRefreshing(false);
  };

  const handleAccountNumberChange = (text: string) => {
    setAccountNumber(text);
    const customer = customers.find((c) => c.account_number === text);
    setSelectedCustomer(customer || null);
  };

  const handlePaymentSubmit = async () => {
    if (!accountNumber.trim()) {
      Alert.alert('Error', 'Please enter account number');
      return;
    }

    const amount = parseFloat(paymentAmount);
    if (!paymentAmount.trim() || isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid payment amount');
      return;
    }

    setProcessingPayment(true);
    try {
      const data = await submitPayment(accountNumber, amount);

      if (data.success && data.data) {
        const updatedEmiDue = data.data.remaining_due;

        // Optimistic UI update
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.account_number === accountNumber
              ? { ...customer, emi_due: updatedEmiDue }
              : customer
          )
        );

        if (selectedCustomer && selectedCustomer.account_number === accountNumber) {
          setSelectedCustomer({ ...selectedCustomer, emi_due: updatedEmiDue });
        }

        setSuccessMessage(
          `Payment of ₹${paymentAmount} processed successfully! Remaining Due: ₹${Number(
            updatedEmiDue
          ).toFixed(2)}`
        );

        setAccountNumber('');
        setPaymentAmount('');
        setSelectedCustomer(null);

        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        Alert.alert('Error', data.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to process payment');
    } finally {
      setProcessingPayment(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      <PaymentForm
        accountNumber={accountNumber}
        paymentAmount={paymentAmount}
        selectedCustomer={selectedCustomer}
        isProcessing={processingPayment}
        onAccountNumberChange={handleAccountNumberChange}
        onPaymentAmountChange={setPaymentAmount}
        onSubmit={handlePaymentSubmit}
      />

      {successMessage && (
        <SuccessMessage message={successMessage} onDismiss={() => setSuccessMessage(null)} />
      )}

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>All Customers</Text>
        <CustomerList customers={customers} isLoading={loadingCustomers} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
});