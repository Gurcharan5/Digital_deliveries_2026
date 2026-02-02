import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useOrders } from '../context/OrderContext';

export default function DriverScreen() {
  const { orders, acceptOrder } = useOrders();

  const availableOrders = orders.filter(o => !o.accepted);

  return (
    <View style={styles.background}>
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Available Deliveries</Text>

        {availableOrders.length === 0 && (
            <Text style={styles.empty}>No delivery jobs available</Text>
        )}

        {availableOrders.map(order => (
            <View key={order.id} style={styles.card}>
            <Text style={styles.heading}>Pickup</Text>
            <Text style={styles.text}>{order.pickupAddress}</Text>

            <Text style={styles.heading}>Drop-off</Text>
            <Text style={styles.text}>{order.dropoffAddress}</Text>

            <Text style={styles.heading}>Items</Text>
            {order.items.map((item, idx) => (
                <Text key={idx} style={styles.item}>• {item}</Text>
            ))}

            <Pressable
                style={styles.acceptButton}
                onPress={() => {
                    acceptOrder(order.id);
                    router.push({
                        pathname: '/driver/[id]',
                        params: { id: order.id },
                    });
                }}
                >
                <Text style={styles.acceptText}>Accept Job</Text>
                </Pressable>
            </View>
        ))}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#333333',
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#333333'
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 16,
    color: 'white',
    paddingTop: 30,
  },
  empty: {
    fontSize: 16,
    color: '#9b9999',
  },
  card: {
    backgroundColor: '#000000',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  heading: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    color: 'white',
  },
  text: {
    fontSize: 14,
    color: '#ffffff',
  },
  item: {
    fontSize: 14,
    marginVertical: 2,
    color: 'white',
  },
  acceptButton: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  acceptText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});
