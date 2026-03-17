import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useOrders } from '../../context/OrderContext';

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { orders, completeOrder } = useOrders();

  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <View style={styles.screen}>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>
          Order not found
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Delivery Job</Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>In Progress</Text>
          </View>

          <Text style={styles.heading}>Pickup Location</Text>
          <Text style={styles.text}>{order.pickupAddress}</Text>

          <View style={styles.divider} />

          <Text style={styles.heading}>Drop-off Location</Text>
          <Text style={styles.text}>{order.dropoffAddress}</Text>

          <View style={styles.divider} />

          <Text style={styles.heading}>Items to Collect</Text>
          <View style={styles.itemsBox}>
            {order.items.map((item, i) => (
              <View key={i} style={styles.itemRow}>
                <Text style={styles.itemBullet}>• {item.name}</Text>
                <Text style={styles.itemPrice}>£{item.price.toFixed(2)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total Value</Text>
            <Text style={styles.totalValue}>£{order.totalPrice.toFixed(2)}</Text>
          </View>

          <Pressable
            style={styles.completeButton}
            onPress={() => {
              completeOrder(order.id);
              router.replace('/driver'); 
            }}
          >
            <Text style={styles.completeText}>Mark as Delivered</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    paddingTop: 40,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 40,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  statusText: {
    color: '#FBC02D',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  heading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  itemsBox: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  itemBullet: {
    fontSize: 15,
    color: '#333',
  },
  itemPrice: {
    fontSize: 15,
    color: '#888',
  },
  totalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 5,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
  },
  completeButton: {
    backgroundColor: '#000',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 30,
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  completeText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
});