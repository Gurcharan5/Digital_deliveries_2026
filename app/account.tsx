import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AccountScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [postcode, setPostcode] = useState('');

  const TIER_DATA = [
    { id: '1', name: 'Bronze', price: '0', color: '#9c635c', perks: ['Standard Delivery', 'Basic Support', 'Standard Fees'] },
    { id: '2', name: 'Silver', price: '9.99', color: '#818181', perks: ['Priority Delivery', 'Priority Support', 'Lower Service Fees'] },
    { id: '3', name: 'Gold', price: '19.99', color: '#FFD700', perks: ['Instant Delivery', 'Priority Support', 'Personal Shopping Assistant'] },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.title}>Account Settings</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter new email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter new password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <Text style={styles.label}>Postcode</Text>
        <TextInput 
          placeholder='Enter new postcode'
          value={postcode}
          onChangeText={setPostcode}
          style={styles.input}
        />

        <Pressable
          style={styles.primaryButton}
          onPress={() => Alert.alert('Account Updated', 'Your details have been saved.')}
        >
          <Text style={styles.primaryText}>Update Account</Text>
        </Pressable>

        <View style={styles.divider} />

        <Text style={styles.title}>Subscription Tiers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tierScroll}>
          {TIER_DATA.map((tier) => (
            <View key={tier.id} style={[styles.tierCard, { borderColor: tier.color }]}>
              <Text style={[styles.tierName, { color: tier.color }]}>{tier.name}</Text>
              <Text style={styles.tierPrice}>£{tier.price}<Text style={{ fontSize: 14, color: '#666' }}>/mo</Text></Text>
              
              <View style={styles.perkList}>
                {tier.perks.map((perk, index) => (
                  <Text key={index} style={styles.perkText}>• {perk}</Text>
                ))}
              </View>

              <TouchableOpacity 
          style={[styles.upgradeButton, { backgroundColor: tier.color }]}
          onPress={() => {
            if (tier.price === '0') {
              Alert.alert("Current Plan", "You are already on the Free tier.");
            } else {
              router.push({
          pathname: '/paymentScreen',
          params: { 
            total: tier.price, 
            items: JSON.stringify([{ 
              name: `${tier.name} Subscription`, 
              price: parseFloat(tier.price) 
            }]),
            store: 'Digital Subscription',
            pickup: 'In-App',
            dropoff: 'Account Update',
            isSubscription: 'true' // <--- Add this flag
          }
        });
    }
  }}
>
  <Text style={styles.upgradeText}>{tier.price === '0' ? 'Current' : 'Upgrade'}</Text>
</TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.divider} />

        <Text style={styles.title}>Support</Text>
        <Text style={styles.label}>Describe the problem...</Text>
        <TextInput
          placeholder="Enter details here..." 
          style={styles.issueInput}
          multiline={true}
          numberOfLines={6} 
          textAlignVertical="top" 
          placeholderTextColor="#999"
        />
        <Pressable
          style={styles.primaryButton}
          onPress={() => Alert.alert('Support request received')}
        >
          <Text style={styles.primaryText}>Submit Ticket</Text>
        </Pressable>

        <Pressable
          style={styles.dangerButton}
          onPress={() => Alert.alert('Delete Account', 'This action cannot be undone.')}
        >
          <Text style={styles.dangerText}>Delete Account</Text>
        </Pressable>
      </ScrollView>

      {/* FIXED TAB BAR */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/stores')}>
          <Text style={styles.tabText}>Order</Text>
        </TouchableOpacity>
        <View style={styles.navDivider} />
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/orderHistory')}>
          <Text style={styles.tabText}>History</Text>
        </TouchableOpacity>
        <View style={styles.navDivider} />
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/account')}>
          <Text style={styles.tabTextActive}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20, marginTop: 10, color: '#1a1a1a' },
  label: { fontSize: 14, marginBottom: 6, color: '#666', fontWeight: '500' },
  input: { borderWidth: 1, borderColor: '#eee', borderRadius: 10, padding: 12, fontSize: 16, marginBottom: 16, backgroundColor: '#f9f9f9' },
  issueInput: { borderWidth: 1, borderColor: '#eee', borderRadius: 10, padding: 12, height: 150, fontSize: 16, marginBottom: 16, backgroundColor: '#f9f9f9' },
  primaryButton: { backgroundColor: '#000', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  divider: { marginVertical: 20, height: 1, backgroundColor: '#eee' },
  dangerButton: { backgroundColor: '#fff', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 30, borderWidth: 1, borderColor: '#ff4444' },
  dangerText: { color: '#ff4444', fontSize: 16, fontWeight: '600' },
  
  // Tier Styles
  tierScroll: { marginBottom: 10 },
  tierCard: { width: 220, backgroundColor: '#fff', borderRadius: 16, padding: 20, marginRight: 15, borderWidth: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  tierName: { fontSize: 18, fontWeight: '800', marginBottom: 5 },
  tierPrice: { fontSize: 28, fontWeight: '700', marginBottom: 15 },
  perkList: { marginBottom: 20 },
  perkText: { fontSize: 13, color: '#444', marginBottom: 5 },
  upgradeButton: { paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  upgradeText: { color: '#fff', fontWeight: '700' },

  // Navbar
  tabBar: { position: 'absolute', bottom: 16, left: 16, right: 16, flexDirection: 'row', backgroundColor: '#222', borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
  tabItem: { flex: 1, alignItems: 'center' },
  tabText: { color: '#aaa', fontSize: 18 },
  tabTextActive: { color: 'white', fontSize: 18, fontWeight: '600' },
  navDivider: { width: 1, height: '100%', backgroundColor: '#555' },
});