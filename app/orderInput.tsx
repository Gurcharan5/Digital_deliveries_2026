import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, } from 'react-native';
import { useOrders } from '../context/OrderContext';

export default function OrderScreen() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const { addOrder } = useOrders();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Order Items</Text>

      <TextInput
        placeholder="Add item"
        value={item}
        onChangeText={setItem}
        style={styles.input}
      />

      <Pressable
        style={styles.addButton}
        onPress={() => {
          if (!item.trim()) return;
          setItems([...items, item]);
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
        style={[
          styles.confirmButton,
          items.length === 0 && styles.disabled,
        ]}
        disabled={items.length === 0}
        onPress={() => {
          addOrder({
            id: Date.now().toString(),
            store: 'ASDA',
            items,
            createdAt: Date.now(),
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
});
