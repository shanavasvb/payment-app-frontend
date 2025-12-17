import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Customer } from '../types/customer';

interface CustomerListProps {
  customers: Customer[];
  isLoading: boolean;
}

export default function CustomerList({ customers, isLoading }: CustomerListProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
  };

  if (isLoading && customers.length === 0) {
    return <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />;
  }

  return (
    <>
      {customers.map((customer, index) => (
        <View key={index} style={styles.customerCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.customerName}>{customer.customer_name}</Text>
            <Text style={styles.accountNumber}>{customer.account_number}</Text>
          </View>

          <View style={styles.cardBody}>
            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Issue Date:</Text>
              <Text style={styles.cardValue}>{formatDate(customer.issue_date)}</Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Interest Rate:</Text>
              <Text style={styles.cardValue}>{customer.interest_rate}%</Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Tenure:</Text>
              <Text style={styles.cardValue}>{customer.tenure} months</Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Loan Amount:</Text>
              <Text style={styles.cardValue}>
                ₹{Number(customer.total_loan_amount).toFixed(2)}
              </Text>
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>EMI Due:</Text>
              <Text style={[styles.cardValue, styles.emiDue]}>
                ₹{Number(customer.emi_due).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginTop: 20,
  },
  customerCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  accountNumber: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  cardBody: {
    gap: 8,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: '#666',
  },
  cardValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  emiDue: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
