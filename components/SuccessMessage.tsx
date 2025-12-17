import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SuccessMessageProps {
  message: string;
  onDismiss: () => void;
}

export default function SuccessMessage({ message, onDismiss }: SuccessMessageProps) {
  return (
    <View style={styles.successBanner}>
      <Text style={styles.successText}>{message}</Text>
      <TouchableOpacity onPress={onDismiss}>
        <Text style={styles.closeButton}>×</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  successBanner: {
    backgroundColor: '#4caf50',
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  successText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  closeButton: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
});
