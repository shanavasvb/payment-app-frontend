import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Payment {
  id: number;
  payment_date: string;
  payment_amount: number;
  status: string;
  customer_name: string;
  account_number: string;
}

interface PaymentHistoryProps {
  payments: Payment[];
  isLoading: boolean;
}

export default function PaymentHistory({ payments, isLoading }: PaymentHistoryProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number): string => {
    return `₹${Number(amount).toFixed(2)}`;
  };

  if (isLoading && payments.length === 0) {
    return <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />;
  }

  if (payments.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>No payment history found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {payments.map((payment) => (
        <View key={payment.id} style={styles.paymentCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.customerName}>{payment.customer_name}</Text>
              <Text style={styles.accountNumber}>{payment.account_number}</Text>
            </View>
            <View style={[styles.statusBadge, payment.status === 'completed' && styles.statusCompleted]}>
              <Text style={styles.statusText}>{payment.status.toUpperCase()}</Text>
            </View>
          </View>

          <View style={styles.cardBody}>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Amount Paid:</Text>
              <Text style={styles.amount}>{formatCurrency(payment.payment_amount)}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Payment Date:</Text>
              <Text style={styles.value}>{formatDate(payment.payment_date)}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Transaction ID:</Text>
              <Text style={styles.value}>#{payment.id}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    marginTop: 40,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    marginHorizontal: 15,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  accountNumber: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  statusCompleted: {
    backgroundColor: '#e8f5e9',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2e7d32',
  },
  cardBody: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
});
