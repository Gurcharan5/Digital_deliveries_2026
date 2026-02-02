import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up To{"\n"}Be A Driver</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} secureTextEntry />
        </View>

        <Pressable 
          style={styles.primaryButton} 
          onPress={() => router.push('/driver')}
        >
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 30,
    height: '80%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 20,
    lineHeight: 40,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
    color: '#ffffff',
  },
  input: {
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  secondaryButton: {
    alignItems: 'center',
    marginVertical: 10,
    color: 'white',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#f6f6f6',
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  primaryButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
});