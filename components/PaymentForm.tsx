import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Customer } from '../types/customer';

interface PaymentFormProps {
  accountNumber: string;
  paymentAmount: string;
  selectedCustomer: Customer | null;
  isProcessing: boolean;
  onAccountNumberChange: (text: string) => void;
  onPaymentAmountChange: (text: string) => void;
  onSubmit: () => void;
}

export default function PaymentForm({
  accountNumber,
  paymentAmount,
  selectedCustomer,
  isProcessing,
  onAccountNumberChange,
  onPaymentAmountChange,
  onSubmit,
}: PaymentFormProps) {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Make a Payment</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter account number"
          value={accountNumber}
          onChangeText={onAccountNumberChange}
          autoCapitalize="characters"
        />
      </View>

      {selectedCustomer && (
        <View style={styles.customerInfo}>
          <Text style={styles.customerInfoText}>
            Customer: {selectedCustomer.customer_name}
          </Text>
          <Text style={styles.customerInfoText}>
            EMI Due: ₹{Number(selectedCustomer.emi_due).toFixed(2)}
          </Text>
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Payment Amount (₹)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          value={paymentAmount}
          onChangeText={onPaymentAmountChange}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, isProcessing && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit Payment</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  customerInfo: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  customerInfoText: {
    fontSize: 14,
    color: '#1976d2',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
