import { FRUIT_ITEMS } from '@/context/FruitItems';
import { VEG_ITEMS } from '@/context/VegItems';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View, } from 'react-native';
import { HOUSEHOLD_ITEMS } from '../context/HouseholdItems';
import { useOrders } from '../context/OrderContext';
import { RECOMMENDED_ITEMS } from '../context/RecommendedItems';

export default function OrderScreen() {
  const { selectedStore } = useLocalSearchParams<{ selectedStore: string }>();
  
  const [item, setItem] = useState('');
  const [items, setItems] = useState<{ name: string; price: number }[]>([]);
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');

  const { addOrder } = useOrders();

  useEffect(() => {
    if (selectedStore) {
      setPickupAddress(selectedStore);
    }
  }, [selectedStore]);

  const handleAddItem = (itemName: string, itemPrice: number = 2.00) => {
    if (!itemName.trim()) return;
    setItems(prev => [...prev, { name: itemName.trim(), price: itemPrice }]);
    setItem('');
  };

  const totalCost = items.reduce((sum, current) => sum + current.price, 0);

  const canSubmit =
    items.length > 0 &&
    pickupAddress.trim().length > 0 &&
    dropoffAddress.trim().length > 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Order Items</Text>

      <View style={styles.recommendedContainer}>
        <Text style={styles.sectionTitle}>Recommended items</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.itemRow}>
            {RECOMMENDED_ITEMS.map((recItem) => (
              <Pressable 
                key={recItem.id} 
                style={styles.recItemBox}
                onPress={() => handleAddItem(recItem.name, recItem.price)}
              >
                <Image source={recItem.image} style={styles.recImage} resizeMode="contain" />
                <Text style={styles.recPriceLabel}>£{recItem.price.toFixed(2)}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.recommendedContainer}>
        <Text style={styles.sectionTitle}>Household items</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.itemRow}>
            {HOUSEHOLD_ITEMS.map((recItem) => (
              <Pressable 
                key={recItem.id} 
                style={styles.recItemBox}
                onPress={() => handleAddItem(recItem.name, recItem.price)}
              >
                <Image source={recItem.image} style={styles.recImage} resizeMode="contain" />
                <Text style={styles.recPriceLabel}>£{recItem.price.toFixed(2)}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.recommendedContainer}>
        <Text style={styles.sectionTitle}>Fruit items</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.itemRow}>
            {FRUIT_ITEMS.map((recItem) => (
              <Pressable 
                key={recItem.id} 
                style={styles.recItemBox}
                onPress={() => handleAddItem(recItem.name, recItem.price)}
              >
                <Image source={recItem.image} style={styles.recImage} resizeMode="contain" />
                <Text style={styles.recPriceLabel}>£{recItem.price.toFixed(2)}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.recommendedContainer}>
        <Text style={styles.sectionTitle}>Veg items</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.itemRow}>
            {VEG_ITEMS.map((recItem) => (
              <Pressable 
                key={recItem.id} 
                style={styles.recItemBox}
                onPress={() => handleAddItem(recItem.name, recItem.price)}
              >
                <Image source={recItem.image} style={styles.recImage} resizeMode="contain" />
                <Text style={styles.recPriceLabel}>£{recItem.price.toFixed(2)}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
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
              <Text style={styles.listItemText}>{i.name}</Text>
              <View style={styles.dottedLine} />
              <Text style={styles.itemPriceText}>£{i.price.toFixed(2)}</Text>
            </View>
          ))}
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Estimate</Text>
            <Text style={styles.totalAmount}>£{totalCost.toFixed(2)}</Text>
          </View>
        </View>
      )}

      <View style={styles.footerContainer}>
        <Pressable>
          <Text style={styles.recipeFinderText}>
            Need recipe ideas? Use Recipe Finder now!
          </Text>
        </Pressable>
      </View>

      <Pressable
  style={[styles.confirmButton, !canSubmit && styles.disabled]}
  disabled={!canSubmit}
  onPress={() => {
    router.push({
      pathname: '/paymentScreen',
      params: {
        store: pickupAddress,
        pickup: pickupAddress,
        dropoff: dropoffAddress,
        total: totalCost.toString(),
        items: JSON.stringify(items), 
      },
    });
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
    width: 85,
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  recImage: {
    width: '100%',
    height: '60%',
  },
  recPriceLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontWeight: '600'
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
  itemPriceText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  dottedLine: {
    flex: 1,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
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
  footerContainer: {
    paddingVertical: 20,
  },
  recipeFinderText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#666',
  },
});