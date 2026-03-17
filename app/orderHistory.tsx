import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { useOrders } from '../context/OrderContext';

export default function HistoryScreen() {
  const { orders } = useOrders();

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Order History</Text>

        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders yet</Text>
          </View>
        ) : (
          orders.map(order => (
            <View key={order.id} style={styles.card}>
              <View style={styles.headerRow}>
                <Text style={styles.store}>{order.store}</Text>
                <Text
                  style={[
                    styles.status,
                    order.completed ? styles.accepted : styles.pending,
                  ]}
                >
                  {order.completed ? 'Delivered' : order.accepted ? 'In Progress' : 'Pending'}
                </Text>
              </View>

              <Text style={styles.date}>
                {new Date(order.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
              </Text>

              <View style={styles.addressBlock}>
                <Text style={styles.addressLabel}>Pickup</Text>
                <Text style={styles.addressText}>{order.pickupAddress}</Text>

                <Text style={styles.addressLabel}>Drop-off</Text>
                <Text style={styles.addressText}>{order.dropoffAddress}</Text>
              </View>

              <View style={styles.itemsContainer}>
                {order.items.map((item, idx) => (
                  <View key={idx} style={styles.itemRow}>
                    <Text style={styles.itemText}>• {item.name}</Text>
                    <Text style={styles.itemPrice}>£{item.price.toFixed(2)}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Paid</Text>
                <Text style={styles.totalValue}>£{order.totalPrice.toFixed(2)}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/stores')}>
          <Text style={styles.tabText}>Order</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/orderHistory')}>
          <Text style={styles.tabTextActive}>History</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/account')}>
          <Text style={styles.tabText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    padding: 20,
    paddingBottom: 120,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    marginTop: 10,
    color: '#1a1a1a',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  store: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  status: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pending: {
    color: '#f39c12',
  },
  accepted: {
    color: '#27ae60',
  },
  date: {
    fontSize: 13,
    color: '#888',
    marginVertical: 4,
  },
  addressBlock: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  addressLabel: {
    fontSize: 11,
    color: '#aaa',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  addressText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    marginBottom: 8,
  },
  itemsContainer: {
    marginTop: 10,
    backgroundColor: '#fcfcfc',
    padding: 10,
    borderRadius: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  itemText: {
    fontSize: 14,
    color: '#555',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  tabBar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,

    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
  },

  tabText: {
    color: '#aaa',
    fontSize: 18,
  },

  tabTextActive: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#555',
  },
});