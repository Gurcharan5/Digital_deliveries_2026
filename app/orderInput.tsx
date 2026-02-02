import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useOrders } from '../context/OrderContext';

export default function OrderScreen() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');

  const { addOrder } = useOrders();

  const canSubmit =
    items.length > 0 &&
    pickupAddress.trim().length > 0 &&
    dropoffAddress.trim().length > 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Order</Text>

      <Text style={styles.label}>Pickup address</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. ASDA, High Street"
        value={pickupAddress}
        onChangeText={setPickupAddress}
      />

      <Text style={styles.label}>Drop-off address</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 21 Baker Street"
        value={dropoffAddress}
        onChangeText={setDropoffAddress}
      />

      <Text style={styles.label}>Add item</Text>
      <TextInput
        placeholder="Milk, Bread, Eggs…"
        value={item}
        onChangeText={setItem}
        style={styles.input}
      />

      <Pressable
        style={styles.addButton}
        onPress={() => {
          if (!item.trim()) return;
          setItems(prev => [...prev, item.trim()]);
          setItem('');
        }}
      >
        <Text style={styles.addButtonText}>Add Item</Text>
      </Pressable>

      {items.length > 0 && (
        <View style={styles.list}>
          {items.map((i, idx) => (
            <Text key={idx} style={styles.listItem}>
              • {i}
            </Text>
          ))}
        </View>
      )}

      <Pressable
        style={[styles.confirmButton, !canSubmit && styles.disabled]}
        disabled={!canSubmit}
        onPress={() => {
          addOrder({
            id: Date.now().toString(),
            store: 'ASDA',
            items,
            createdAt: Date.now(),
            accepted: false,
            completed: false,
            pickupAddress,
            dropoffAddress,
          });

          router.push('/orderHistory');
        }}
      >
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </Pressable>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#eee',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  list: {
    marginBottom: 20,
  },
  listItem: {
    fontSize: 15,
    marginVertical: 4,
  },
  confirmButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
  }
});
