import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOrders } from '../../context/OrderContext';

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { orders, completeOrder } = useOrders();

  const order = orders.find(o => o.id === id);

  if (!order) {
    return <Text style={{ color: 'white' }}>Order not found</Text>;
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Delivery Job</Text>
      <View style={styles.card}>
        <Text style={styles.heading}>Pickup</Text>
        <Text style={styles.text}>{order.pickupAddress}</Text>

        <Text style={styles.heading}>Drop-off</Text>
        <Text style={styles.text}>{order.dropoffAddress}</Text>

        <Text style={styles.heading}>Items</Text>
        {order.items.map((item, i) => (
            <Text key={i} style={styles.item}>• {item}</Text>
        ))}

        <Pressable
            style={styles.completeButton}
            onPress={() => {
            completeOrder(order.id);
            router.back();
            }}
        >
            <Text style={styles.completeText}>Complete Order</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  card:  {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    paddingTop: 30,
    marginBottom: 10,
  },
  heading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  item: {
    color: 'black',
    marginVertical: 2,
  },
  completeButton: {
    backgroundColor: 'black',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 30,
  },
  completeText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
});
