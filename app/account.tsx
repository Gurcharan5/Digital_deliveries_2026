import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AccountScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    marginVertical: 30,
    height: 1,
    backgroundColor: '#eee',
  },

  dangerButton: {
    borderWidth: 1,
    borderColor: '#d00',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  dangerText: {
    color: '#d00',
    fontSize: 16,
    fontWeight: '600',
  },
});
