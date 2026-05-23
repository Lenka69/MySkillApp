import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api, { shouldRetryRequest, wakeServer } from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [serverReady, setServerReady] = useState(false);
  const [serverStatus, setServerStatus] = useState('Menyiapkan server Render...');

  useEffect(() => {
    const prepareServer = async () => {
      setServerReady(false);
      setServerStatus('Menyiapkan server Render... Login pertama mungkin membutuhkan beberapa detik.');

      const isReady = await wakeServer();

      if (isReady) {
        setServerReady(true);
        setServerStatus('Server siap digunakan.');
      } else {
        setServerReady(true);
        setServerStatus('Server sedang bangun. Silakan coba login, proses pertama mungkin sedikit lebih lama.');
      }
    };

    prepareServer();
  }, []);

  const loginWithRetry = async () => {
    try {
      return await api.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password
      });
    } catch (firstError) {
      if (!shouldRetryRequest(firstError)) {
        throw firstError;
      }

      setServerStatus('Server Render sedang bangun. Mencoba ulang login...');
      await wakeServer();

      await new Promise((resolve) => setTimeout(resolve, 2500));

      return await api.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password
      });
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Validasi', 'Email dan password wajib diisi.');
      return;
    }

    try {
      setLoading(true);

      const response = await loginWithRetry();

      const user = response.data.user;

      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      if (user?.role === 'admin') {
        navigation.replace('AdminDashboard');
      } else {
        navigation.replace('Home');
      }
    } catch (error) {
      console.log('LOGIN ERROR:', error.response?.data || error.message);

      if (error.response) {
        Alert.alert(
          'Login gagal',
          error.response.data?.message || 'Email atau password salah.'
        );
      } else {
        Alert.alert(
          'Koneksi gagal',
          'Tidak bisa terhubung ke server. Server Render mungkin sedang bangun, silakan coba lagi beberapa detik.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={Platform.OS === 'android' ? 120 : 80}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop'
          }}
          style={styles.heroCard}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.brandRowLight}>
              <View style={styles.logoLight}>
                <Text style={styles.logoTextLight}>M</Text>
              </View>
              <Text style={styles.brandTextLight}>My Skill</Text>
            </View>

            <Text style={styles.heroTitle}>
              Access your practical learning content.
            </Text>

            <Text style={styles.heroSubtitle}>
              Masuk untuk melihat konten praktik teknik SMK seperti otomotif,
              kelistrikan, elektronika, bangunan, dan perbaikan rumah.
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.card}>
          <View style={styles.brandRow}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>M</Text>
            </View>
            <Text style={styles.brandText}>My Skill</Text>
          </View>

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Masuk untuk mengakses konten praktik My Skill.
          </Text>

          <View
            style={[
              styles.serverStatusBox,
              serverReady ? styles.serverReadyBox : styles.serverPreparingBox
            ]}
          >
            <Text
              style={[
                styles.serverStatusText,
                serverReady ? styles.serverReadyText : styles.serverPreparingText
              ]}
            >
              {serverStatus}
            </Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Masukkan email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              style={styles.input}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Masukkan password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            style={[styles.primaryButton, loading && styles.disabledButton]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.primaryButtonText}>
                {serverReady ? 'Login' : 'Menyiapkan server...'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.switchButton}
          >
            <Text style={styles.switchText}>
              Belum punya akun?{' '}
              <Text style={styles.switchTextStrong}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  scrollContent: {
    padding: 20,
    paddingTop: 28,
    paddingBottom: 90
  },
  heroCard: {
    minHeight: 210,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 18
  },
  heroImage: {
    borderRadius: 28
  },
  heroOverlay: {
    flex: 1,
    padding: 22,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.66)'
  },
  brandRowLight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14
  },
  logoLight: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  logoTextLight: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 17
  },
  brandTextLight: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 20
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 27,
    fontWeight: '900',
    lineHeight: 33,
    marginBottom: 9
  },
  heroSubtitle: {
    color: '#dbeafe',
    fontSize: 14,
    lineHeight: 21
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  logoText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 18
  },
  brandText: {
    color: '#0f172a',
    fontWeight: '900',
    fontSize: 22
  },
  title: {
    color: '#0f172a',
    fontSize: 31,
    fontWeight: '900',
    marginBottom: 8
  },
  subtitle: {
    color: '#64748b',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18
  },
  serverStatusBox: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 16
  },
  serverPreparingBox: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe'
  },
  serverReadyBox: {
    backgroundColor: '#ecfdf5',
    borderColor: '#bbf7d0'
  },
  serverStatusText: {
    fontWeight: '800',
    lineHeight: 20
  },
  serverPreparingText: {
    color: '#1d4ed8'
  },
  serverReadyText: {
    color: '#047857'
  },
  formGroup: {
    marginBottom: 14
  },
  label: {
    color: '#334155',
    fontWeight: '800',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: '#0f172a'
  },
  primaryButton: {
    backgroundColor: '#10b981',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8
  },
  disabledButton: {
    opacity: 0.7
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 16
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center'
  },
  switchText: {
    color: '#64748b',
    fontSize: 15,
    fontWeight: '600'
  },
  switchTextStrong: {
    color: '#059669',
    fontWeight: '900'
  }
};