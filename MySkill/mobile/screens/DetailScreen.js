import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import api from '../services/api';

export default function DetailScreen({ route }) {
  const { id } = route.params;
  const [content, setContent] = useState(null);

  useEffect(() => {
    api.get(`/contents/${id}`).then(res => setContent(res.data));
  }, [id]);

  if (!content) return <View style={{flex:1, justifyContent:'center'}}><Text style={{textAlign:'center'}}>Loading...</Text></View>;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <Image source={{ uri: content.imageUrl }} style={{ width: '100%', height: 250 }} />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{content.title}</Text>
        <Text style={{ color: 'gray', marginBottom: 20 }}>Kategori: {content.category} | Durasi: {content.duration}</Text>
        
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#059669' }}>Langkah-langkah:</Text>
        {content.steps.map((step, index) => (
          <Text key={index} style={{ marginBottom: 8, fontSize: 16 }}>{index + 1}. {step}</Text>
        ))}

        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#dc2626' }}>Safety Tips:</Text>
        {content.safetyTips.map((tip, index) => (
          <Text key={index} style={{ marginBottom: 5, color: '#dc2626' }}>• {tip}</Text>
        ))}
      </View>
    </ScrollView>
  );
}
