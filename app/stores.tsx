import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { LOGO_DATABASE } from '../constants/Logos';

export default function StoresScreen() {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // LOGIC: Added logo matcher to connect names to icons
  const getStoreLogo = (name: string) => {
    if (!name) return LOGO_DATABASE.default;
    const lowerName = name.toLowerCase();
    const brandKey = Object.keys(LOGO_DATABASE).find(key => 
      lowerName.includes(key.toLowerCase())
    );
    return brandKey ? LOGO_DATABASE[brandKey] : LOGO_DATABASE.default;
  };

  useEffect(() => {
    async function getInitialData() {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLoading(false);
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        fetchNearbyStores(loc.coords.latitude, loc.coords.longitude);
      } catch (error) {
        setLoading(false);
      }
    }
    getInitialData();
  }, []);

  const fetchNearbyStores = async (latitude: number, longitude: number) => {
    const query = `[out:json];(node["shop"="supermarket"](around:5000,${latitude},${longitude});way["shop"="supermarket"](around:5000,${latitude},${longitude}););out center;`;
    
    try {
      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: 'POST',
        body: query,
      });

      // LOGIC: The fix for the JSON Parse error
      const contentType = response.headers.get("content-type");
      if (!response.ok || !contentType || !contentType.includes("application/json")) {
        throw new Error("HTML response received"); 
      }

      const data = await response.json();

      const formatted = data.elements.map((el: any) => {
        const name = el.tags.name || "Local Store";
        return {
          id: el.id.toString(),
          name: name,
          logo: getStoreLogo(name),
          distance: 'Nearby',
        };
      });

      setStores(formatted);
    } catch (error) {
      // LOGIC: Fallback so you can still work when the API is down
      setStores([
        { id: '1', name: 'Tesco Extra', distance: '0.0 miles', logo: LOGO_DATABASE.tesco },
        { id: '2', name: 'Asda', distance: '0.2 miles', logo: LOGO_DATABASE.asda },
        { id: '3', name: 'Aldi', distance: '0.2 miles', logo: LOGO_DATABASE.aldi },
        { id: '4', name: 'Abu Bakr', distance: '0.5 miles', logo: LOGO_DATABASE['abu bakr'] || LOGO_DATABASE.default },
        { id: '5', name: 'Co-op Food', distance: '1.2 miles', logo: LOGO_DATABASE['co-op'] || LOGO_DATABASE.default },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Store</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {stores.map((store) => (
          <TouchableOpacity
            key={store.id}
            style={styles.card}
            onPress={() => router.push({ pathname: '/orderInput', params: { selectedStore: store.name } })}
          >
            {/* LOGIC: source changed to handle local required images correctly */}
            <Image source={store.logo} style={styles.logo} />
            
            <View style={styles.info}>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.distance}>{store.distance}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.card} onPress={() => router.push('/orderInput')}>
          <View style={styles.info}>
            <Text style={styles.storeName}>Store not listed?</Text>
            <Text style={styles.distance}>Tap to enter manually</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Your Original Navigation Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/stores')}>
          <Text style={styles.tabTextActive}>Order</Text>
        </TouchableOpacity>
        <View style={styles.navDivider} />
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/orderHistory')}>
          <Text style={styles.tabText}>History</Text>
        </TouchableOpacity>
        <View style={styles.navDivider} />
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/account')}>
          <Text style={styles.tabText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Your Original Styles (Re-applied)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  info: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  distance: {
    fontSize: 14,
    color: '#666',
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
  navDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#555',
  },
});