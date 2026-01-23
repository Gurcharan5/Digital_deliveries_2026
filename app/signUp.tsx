import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>

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
          onPress={() => router.push('/stores')}
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
    backgroundColor: '#f0f0f0',
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    height: '80%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1a1a1a',
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
    color: '#1a1a1a',
  },
  input: {
    backgroundColor: '#eeeeee',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#1a1a1a',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});