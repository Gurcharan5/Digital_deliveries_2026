import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AccountScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [postcode, setPostcode] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>

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
        style={styles.input}>
        </TextInput>

      <Pressable
        style={styles.primaryButton}
        onPress={() => {
          Alert.alert(
            'Account Updated',
            'Your account details have been updated (locally).'
          );
        }}
      >
        <Text style={styles.primaryText}>Update Account</Text>
      </Pressable>

      <View style={styles.divider} />

      <Pressable
        style={styles.dangerButton}
        onPress={() => {
          Alert.alert(
            'Delete Account',
            'This action cannot be undone.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                  Alert.alert('Account Deleted');
                },
              },
            ]
          );
        }}
      >
        <Text style={styles.dangerText}>Delete Account</Text>
      </Pressable>
      <Text style={styles.title}>Got an issue with your account?</Text>
      
        <Text style={styles.label}>Contact Email</Text>
        <TextInput
          placeholder="Enter contact email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
      
        <Text style={styles.label}>Issue Details</Text>
        <TextInput
          placeholder="Describe the problem..." 
          style={styles.issueInput}
          multiline={true}
          numberOfLines={6} 
          textAlignVertical="top" 
          placeholderTextColor="#999"
        />
        <Pressable
        style={styles.primaryButton}
        onPress={() => {
          Alert.alert(
            'Support request received'
          );
        }}
      >
        <Text style={styles.primaryText}>Submit Ticket</Text>
      </Pressable>
      <View style={styles.tabBar}>
              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => router.push('/stores')}
                >
                <Text style={styles.tabText}>Order</Text>
              </TouchableOpacity>
            
              <View style={styles.navDivider} />
            
              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => router.push('/orderHistory')}>
                <Text style={styles.tabText}>History</Text>
              </TouchableOpacity>
            
              <View style={styles.navDivider} />
            
                <TouchableOpacity
                  style={styles.tabItem}
                  onPress={() => router.push('/account')}>
                  <Text style={styles.tabTextActive}>Account</Text>
                </TouchableOpacity>
            </View>
    </View>
  );
}
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

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#555',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },

  issueInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    height: 100,
    fontSize: 16,
    marginBottom: 16,
  },

  primaryButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  primaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  divider: {
    marginVertical: 10,
    height: 1,
    backgroundColor: '#eee',
  },

  dangerButton: {
    borderWidth: 1,
    borderColor: '#d00',
    backgroundColor: '#d00',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  dangerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
