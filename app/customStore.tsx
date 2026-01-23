import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useOrders } from "../context/OrderContext";

export default function CustomStore() {
  const { addOrder } = useOrders();

  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [itemInput, setItemInput] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const addItem = () => {
    if (!itemInput.trim()) return;
    setItems(prev => [...prev, itemInput.trim()]);
    setItemInput("");
  };

  const submitOrder = () => {
    if (!storeName || !storeAddress || items.length === 0) return;

    addOrder({
      id: Date.now().toString(),
      store: `${storeName} – ${storeAddress}`,
      items,
      createdAt: Date.now()
    });

    router.push("/orderHistory");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custom Store Order</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Store Details</Text>

        <TextInput
          placeholder="Store name"
          value={storeName}
          onChangeText={setStoreName}
          style={styles.input}
        />

        <TextInput
          placeholder="Store address"
          value={storeAddress}
          onChangeText={setStoreAddress}
          style={styles.input}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Items</Text>

        <View style={styles.row}>
          <TextInput
            placeholder="Item name"
            value={itemInput}
            onChangeText={setItemInput}
            style={[styles.input, { flex: 1 }]}
          />

          <Pressable style={styles.addButton} onPress={addItem}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>

        <FlatList
          data={items}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>• {item}</Text>
          )}
        />
      </View>

      <Pressable style={styles.confirmButton} onPress={submitOrder}>
        <Text style={styles.confirmText}>Confirm Order</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center"
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  addButton: {
    backgroundColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500"
  },
  item: {
    fontSize: 14,
    marginTop: 5
  },
  confirmButton: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: "auto"
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  }
});
