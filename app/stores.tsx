import { stores } from '@/context/Stores';
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StoresScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Stores near you</Text>

          {stores.map(store => (
            <TouchableOpacity
                key={store.id}
                style={styles.storeRow}
                onPress={() => 
                  router.push({
                    pathname: '/orderInput',
                    params: { selectedStore: store.name } 
                  })
                }
              >
              <View style={styles.logoContainer}>
                <Image 
                  source={{ uri: store.logo }} 
                  style={styles.logo} 
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.storeText}>{store.name} {store.distance}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.requestButton}>
            <Text style={styles.requestButtonText} onPress={()=>{
                router.push('/orderInput')
            }}>Request a custom store</Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/stores')}
          >
          <Text style={styles.tabTextActive}>Order</Text>
        </TouchableOpacity>
      
        <View style={styles.divider} />
      
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/orderHistory')}>
          <Text style={styles.tabText}>History</Text>
        </TouchableOpacity>
      
        <View style={styles.divider} />
      
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => router.push('/account')}>
            <Text style={styles.tabText}>Account</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  card: {
    flex: 0.95,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 30,
    marginTop: 10,
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoContainer: {
    width: 65,
    height: 65,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  logo: {
    width: 45,
    height: 45,
  },
  storeText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#333',
    flex: 1,
  },
  requestButton: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: 25,
  },
  requestButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
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