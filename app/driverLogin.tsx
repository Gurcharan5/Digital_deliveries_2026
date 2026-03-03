import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function DriverLoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
  
        <Image 
          source={require('../assets/images/Dark_logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Login to your account</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter your email" 
            placeholderTextColor="#999" 
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            secureTextEntry 
            placeholder="Enter your password" 
            placeholderTextColor="#999" 
          />
        </View>

        <View style={styles.buttonRow}>
          <Pressable onPress={() => router.push('/driverSignUp')}>
            <Text style={styles.secondaryButtonText}>Sign up instead</Text>
          </Pressable>
          
          <Pressable onPress={() => router.push('/')}>
            <Text style={styles.switchOrderText}>Switch to order</Text>
          </Pressable>
        </View>

        <Pressable 
          style={styles.primaryButton} 
          onPress={() => router.push('/driver')}
        >
          <Text style={styles.primaryButtonText}>Log in</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: '#000000',
    borderRadius: 15,
    padding: 25,
    borderWidth: 1,
    borderColor: '#333',
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
    color: '#ffffff',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#ffffff',
  },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 25,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  switchOrderText: {
    color: '#ff4500',
    fontSize: 14,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
});