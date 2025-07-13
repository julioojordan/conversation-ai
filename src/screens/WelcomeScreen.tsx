// Import necessary components and libraries
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/WelcomeStyle';
const WelcomeScreen = () => {

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const handleNext = () => {
    navigation.navigate('ConversationScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Multilingual Conversation Assistant</Text>
          <Text style={styles.subtitle}>With Voice Command powered by OpenAI & ElevenLabs</Text>
        </View>
        <MaterialCommunityIcons name="account-tie-voice" size={200}
          style={{ marginBottom: 10, marginRight: 10, color: '#10a37f' }}
        />

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Start Conversation</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default WelcomeScreen;