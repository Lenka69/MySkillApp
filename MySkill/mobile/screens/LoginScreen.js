import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      await AsyncStorage.setItem('token', res.data.token);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', 'Login gagal');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Login Mobile</Text>
      <TextInput placeholder="Email" style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, padding: 10, marginBottom: 20 }} onChangeText={setPassword} />
      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: 'blue', padding: 15, borderRadius: 5 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

