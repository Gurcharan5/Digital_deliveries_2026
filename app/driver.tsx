import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useOrders } from '../context/OrderContext';

export default function DriverScreen() {
  const { orders, acceptOrder } = useOrders();

  const availableOrders = orders.filter(o => !o.accepted && !o.completed);

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Available Deliveries</Text>

        {availableOrders.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.empty}>No delivery jobs available right now</Text>
            <Text style={styles.subEmpty}>Check back later for new requests</Text>
          </View>
        )}

        {availableOrders.map(order => (
          <View key={order.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.storeTag}>{order.store}</Text>
              <Text style={styles.priceTag}>£{order.totalPrice.toFixed(2)}</Text>
            </View>

            <View style={styles.addressSection}>
              <Text style={styles.heading}>Pickup</Text>
              <Text style={styles.text}>{order.pickupAddress}</Text>

              <View style={styles.lineConnector} />

              <Text style={styles.heading}>Drop-off</Text>
              <Text style={styles.text}>{order.dropoffAddress}</Text>
            </View>

            <Text style={styles.heading}>Order Items ({order.items.length})</Text>
            <View style={styles.itemsList}>
              {order.items.map((item, idx) => (
                <Text key={idx} style={styles.item}>
                  • {item.name}
                </Text>
              ))}
            </View>

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
    backgroundColor: '#000000',
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
    color: 'white',
    paddingTop: 40,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  empty: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '500',
  },
  subEmpty: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  storeTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  priceTag: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
  },
  addressSection: {
    marginBottom: 15,
  },
  heading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginTop: 2,
  },
  lineConnector: {
    width: 2,
    height: 15,
    backgroundColor: '#eee',
    marginLeft: 5,
    marginVertical: 4,
  },
  itemsList: {
    marginTop: 5,
    marginBottom: 10,
  },
  item: {
    fontSize: 14,
    color: '#444',
    marginVertical: 1,
  },
  acceptButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  acceptText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});