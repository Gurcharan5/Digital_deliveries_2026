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
  View,
} from 'react-native';
import { LOGO_DATABASE } from '../constants/Logos';


const getStoreLogo = (name: string) => {
  if (!name || typeof name !== 'string') return LOGO_DATABASE.default;

  const lowerName = name.toLowerCase();
  const brandKey = Object.keys(LOGO_DATABASE).find((key) =>
    lowerName.includes(key.toLowerCase())
  );

  if (brandKey && LOGO_DATABASE[brandKey]) {
    return LOGO_DATABASE[brandKey];
  }

  return LOGO_DATABASE.default;
};

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1*(Math.PI/180)) * Math.cos(lat2*(Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function StoresScreen() {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const query = `[out:json];(node["shop"="supermarket"](around:5000,${latitude},${longitude});way["shop"="supermarket"](around:5000,${latitude},${longitude}););out center;`;
        const response = await fetch("https://overpass-api.de/api/interpreter", { method: 'POST', body: query });
        const data = await response.json();

        const formatted = data.elements.map((el: any) => {
          const sLat = el.lat || el.center.lat;
          const sLon = el.lon || el.center.lon;
          const dist = calculateDistance(latitude, longitude, sLat, sLon);
          return {
            id: el.id.toString(),
            name: el.tags.name || "Supermarket",
            distance: `${dist.toFixed(1)} miles`,
            distValue: dist,
            logo: getStoreLogo(el.tags.name || "")
          };
        })
        .sort((a: any, b: any) => a.distValue - b.distValue)
        .slice(0, 5);

        setStores(formatted);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Select Store</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
        ) : (
          <>
            {stores.map((store) => (
              <TouchableOpacity
                key={store.id}
                style={styles.card}
                onPress={() => router.push({ pathname: '/orderInput', params: { selectedStore: store.name } })}
              >
                <Image source={{ uri: store.logo }} style={styles.logo} />
                <View style={styles.info}>
                  <Text style={styles.storeName}>{store.name}</Text>
                  <Text style={styles.distance}>{store.distance}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('/orderInput')}
            >
              <View style={styles.info}>
                <Text style={styles.storeName}>Store not listed?</Text>
                <Text style={styles.distance}>Tap to enter manually</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/stores')}>
          <Text style={styles.tabTextActive}>Order</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/orderHistory')}>
          <Text style={styles.tabText}>History</Text>
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
  screen: { flex: 1, backgroundColor: '#f0f0f0' },
  container: { padding: 20, paddingBottom: 120 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 16, marginTop: 10 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  logo: { width: 50, height: 50, borderRadius: 8, marginRight: 15 },
  info: { flex: 1 },
  storeName: { fontSize: 16, fontWeight: '600' },
  distance: { fontSize: 14, color: '#666', marginTop: 2 },
  tabBar: {
    position: 'absolute',
    bottom: 16, left: 16, right: 16,
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  tabItem: { flex: 1, alignItems: 'center' },
  tabText: { color: '#aaa', fontSize: 18 },
  tabTextActive: { color: 'white', fontSize: 18, fontWeight: '600' },
  divider: { width: 1, height: '100%', backgroundColor: '#555' },
});