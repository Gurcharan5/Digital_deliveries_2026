import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useOrders } from '../context/OrderContext';

export default function PaymentScreen() {
  const params = useLocalSearchParams();
  const { addOrder } = useOrders();
  const [isProcessing, setIsProcessing] = useState(false);

  // Safely parse items and total
  // We use a fallback empty array string '[]' to prevent JSON.parse(undefined) crashes
  const items = JSON.parse((params.items as string) || '[]');
  const total = parseFloat((params.total as string) || (params.amount as string) || '0');

  const handlePay = () => {
    setIsProcessing(true);

    // Check if this is a subscription upgrade from the Account page
    const isSub = params.isSubscription === 'true';

    setTimeout(() => {
      addOrder({
        id: Date.now().toString(),
        store: (params.store as string) || 'Digital Store',
        items: items,
        totalPrice: total,
        createdAt: Date.now(),
        // Logic: Subscriptions autocomplete, grocery orders stay pending
        accepted: isSub ? true : false,
        completed: isSub ? true : false,
        pickupAddress: (params.pickup as string) || 'N/A',
        dropoffAddress: (params.dropoff as string) || 'N/A',
      });

      setIsProcessing(false);
      
      // Navigate to history to see the completed transaction
      router.push('/orderHistory');
    }, 2000);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.screen}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Payment</Text>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>£{total.toFixed(2)}</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput 
            style={styles.input} 
            placeholder="1234 5678 1234 5678" 
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Expiry</Text>
            <TextInput 
              style={styles.input} 
              placeholder="MM/YY" 
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 15 }]}>
            <Text style={styles.label}>CVV</Text>
            <TextInput 
              style={styles.input} 
              placeholder="123" 
              keyboardType="numeric"
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <Pressable 
          style={[styles.payButton, isProcessing && styles.disabled]} 
          onPress={handlePay}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payButtonText}>
              Pay £{total.toFixed(2)}
            </Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.back()} disabled={isProcessing}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 25, flex: 1, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 30 },
  summaryCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  summaryLabel: { fontSize: 14, color: '#666', marginBottom: 5 },
  totalAmount: { fontSize: 32, fontWeight: '800', color: '#000' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  row: { flexDirection: 'row' },
  payButton: {
    backgroundColor: '#000',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    minHeight: 60,
    justifyContent: 'center'
  },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  disabled: { opacity: 0.6 },
  cancelText: { textAlign: 'center', marginTop: 20, color: '#666', fontSize: 16 },
});