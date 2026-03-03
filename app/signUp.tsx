import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image 
          source={require('../assets/images/Light_logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Register for your account</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Enter your email" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Postcode</Text>
          <TextInput style={styles.input} placeholder="Enter your postcode" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} secureTextEntry placeholder="Enter your password" />
        </View>

        <View style={styles.buttonRow}>
          <Pressable onPress={() => router.push('/')}>
            <Text style={styles.secondaryButtonText}>Log in instead</Text>
          </Pressable>
          
          <Pressable onPress={() => router.push('/driverLogin')}>
            <Text style={styles.driverSwitchText}>Switch to driver</Text>
          </Pressable>
        </View>

        <Pressable 
          style={styles.primaryButton} 
          onPress={() => router.push('/stores')}
        >
          <Text style={styles.primaryButtonText}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logo: {
    width: 300,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 500,
  },
  driverSwitchText: {
    color: '#ff4500', 
    fontSize: 14,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});