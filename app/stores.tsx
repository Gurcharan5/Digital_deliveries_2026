import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Store = {
  id: number;
  name: string;
  distance: string;
  logo: string;
};

const stores: Store[] = [
  { id: 1, name: 'Asda Huddersfield', distance: '0.4 miles', logo: 'data:image/png;base64,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' },
  { id: 2, name: 'Tesco Huddersfield', distance: '0.8 miles', logo: 'https://1000logos.net/wp-content/uploads/2023/04/Tesco-logo.png' },
  { id: 3, name: 'Aldi Huddersfield', distance: '1.2 miles', logo: 'https://1000logos.net/wp-content/uploads/2017/12/Aldi-logo.png' },
  { id: 4, name: 'Lidl Huddersfield', distance: '2.3 miles', logo: 'https://banner2.cleanpng.com/20180723/vbg/013740c28dd18c2a3d6c94b0ec4c8d9d.webp' },
];

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
              onPress={() => router.push('/orderInput')}
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