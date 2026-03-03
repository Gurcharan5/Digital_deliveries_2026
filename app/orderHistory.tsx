import { router } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useOrders } from '../context/OrderContext';

export default function HistoryScreen() {
  const { orders } = useOrders();

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Order History</Text>

        {orders.map(order => (
          <View key={order.id} style={styles.card}>
            <View style={styles.headerRow}>
              <Text style={styles.store}>{order.store}</Text>
              <Text
                style={[
                  styles.status,
                  order.accepted ? styles.accepted : styles.pending,
                ]}
              >
                {order.accepted ? 'Accepted' : 'Pending'}
              </Text>
              <Text
                style={[
                  styles.status,
                  order.completed ? styles.accepted : styles.pending,
                ]}
              >
                {order.completed ? 'Delivered' : 'Pending Delivery'}
              </Text>
            </View>

            <Text style={styles.date}>
              {new Date(order.createdAt).toLocaleString()}
            </Text>

            <View style={styles.addressBlock}>
              <Text style={styles.addressLabel}>Pickup</Text>
              <Text style={styles.addressText}>
                {order.pickupAddress}
              </Text>

              <Text style={styles.addressLabel}>Drop-off</Text>
              <Text style={styles.addressText}>
                {order.dropoffAddress}
              </Text>
            </View>

            <View style={styles.items}>
              {order.items.map((item, idx) => (
                <Text key={idx} style={styles.item}>
                  • {item}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/stores')}
        >
          <Text style={styles.tabText}>Order</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/orderHistory')}
        >
          <Text style={styles.tabTextActive}>History</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/account')}
        >
          <Text style={styles.tabText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },

  container: {
    padding: 20,
    paddingBottom: 120,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 10,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  store: {
    fontSize: 16,
    fontWeight: '600',
  },

  status: {
    fontSize: 12,
    fontWeight: '600',
  },

  pending: {
    color: '#cc8400',
  },

  accepted: {
    color: '#1e8e3e',
  },

  date: {
    fontSize: 12,
    color: '#666',
    marginVertical: 6,
  },

  addressBlock: {
    marginTop: 6,
  },

  addressLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
  },

  addressText: {
    fontSize: 14,
    fontWeight: '500',
  },

  items: {
    marginTop: 10,
  },

  item: {
    fontSize: 14,
    marginVertical: 2,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: '#777',
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
