import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image, // Added Image
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useOrders } from '../context/OrderContext';

const RECOMMENDED_ITEMS = [
  { id: '1', name: 'Milk', image: require('../assets/images/milk.png') },
  { id: '2', name: 'Oranges', image: require('../assets/images/orange.jpg') },
  { id: '3', name: 'Cheese', image: require('../assets/images/cheese.jpg') },
];

export default function OrderScreen() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');

  const { addOrder } = useOrders();

  const handleAddItem = (itemName: string) => {
    if (!itemName.trim()) return;
    setItems(prev => [...prev, itemName.trim()]);
    setItem('');
  };

  const canSubmit =
    items.length > 0 &&
    pickupAddress.trim().length > 0 &&
    dropoffAddress.trim().length > 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Order Items</Text>

      <View style={styles.recommendedContainer}>
        <Text style={styles.sectionTitle}>Recommended items</Text>
        <View style={styles.itemRow}>
          {RECOMMENDED_ITEMS.map((recItem) => (
            <Pressable 
              key={recItem.id} 
              style={styles.recItemBox}
              onPress={() => handleAddItem(recItem.name)}
            >
              <Image source={recItem.image} style={styles.recImage} resizeMode="contain" />
            </Pressable>
          ))}
        </View>
      </View>

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
      <View style={styles.addInputRow}>
        <TextInput
          placeholder="Milk, Bread, Eggs…"
          value={item}
          onChangeText={setItem}
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
        />
        <Pressable
          style={styles.inlineAddButton}
          onPress={() => handleAddItem(item)}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      {items.length > 0 && (
        <View style={styles.list}>
          {items.map((i, idx) => (
            <View key={idx} style={styles.listItemRow}>
              <Text style={styles.listItemText}>{i}</Text>
              <View style={styles.dottedLine} />
            </View>
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
        <Text style={styles.confirmButtonText}>Confirm order</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: '#333',
  },
  recommendedContainer: {
    marginBottom: 25,
  },
  itemRow: {
    flexDirection: 'row',
    gap: 15,
  },
  recItemBox: {
    width: 80,
    height: 80,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recImage: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#efefef',
    marginBottom: 15,
  },
  addInputRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  inlineAddButton: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    marginTop: 10,
    marginBottom: 30,
  },
  listItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  dottedLine: {
    flex: 1,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.4,
  },
});