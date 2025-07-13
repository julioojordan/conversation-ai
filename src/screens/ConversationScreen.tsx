// Import necessary components and libraries
import Voice, { } from '@react-native-voice/voice';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Platform, PermissionsAndroid, Rationale, TouchableHighlight, SafeAreaView, TouchableOpacityBase, TouchableOpacity } from 'react-native';
import { getAnswerFromGpt } from '../services/OpenAiService';
import { startStreaming } from '../services/StreamingService';
import {
  Bubble,
  GiftedChat,
  IMessage,
  Send,
} from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/WelcomeStyle';
import { useSelector } from 'react-redux';



const ConversationScreen = () => {
  const [recording, setRecording] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [answering, setAnswering] = useState(false);
  const [result, setResult] = useState('');
  const [speaking, setSpeaking] = useState(false);
  

//   const voice = useSelector((state: any) => state.voice.value);

  useEffect(() => {
    Voice.onSpeechStart = (e) => {
      setErrorMsg('');
      setRecording(true);
    };
    
    Voice.onSpeechEnd = (e) => {
      setRecording(false);
    };

    Voice.onSpeechError = (e: any) => {
      const errMsg: string = e.error?.message;

      if (errMsg.includes('No match')) {
        setErrorMsg("You are not speaking!");
      } else {
        setErrorMsg(errMsg);
      }
      console.log('masuk onSpeechError', {e})
      setRecording(false);
    }

    Voice.onSpeechResults = (e: any) => {
      const prompt = e.value[0];
      console.log('masuk onSpeechResults', {prompt})
      if (!prompt) {
        return;
      }
        
        setResult(prompt);
        processTranscription(prompt);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [Voice]);

  const streamVoice = async (prompt: string) => {
    if (prompt.trim().length > 0) {
      startStreaming(prompt.trim()).then((res: any) => {
          if (res.success) {
            streamVoice(res.data)
            setAnswering(false);
          } else {
            setAnswering(false);
            setErrorMsg(res.msg);
          }
  
        })
      }
  }

  const processTranscription = async (prompt: string) => {
    if (prompt.trim().length > 0) {
      setAnswering(true);
      getAnswerFromGpt(prompt.trim()).then((res: any) => {

        if (res.success) {
          streamVoice(res.data)
          setAnswering(false);
        } else {
          setAnswering(false);
          setErrorMsg(res.msg);
        }

      })
    }
  }
  const stopRecording = async () => {

    console.log("== stopRecording ");

    try {
      await Voice.stop();
      setRecording(false);

    } catch (error: any) {
      console.log("== eror when stop: ", error);
      setErrorMsg(error.message)
    }

  }

  const startRecording = async () => {

    console.log("== startRecording ");
    setRecording(true);

    try {
      await Voice.start('ja-JP');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
        <View>
            <Text style={styles.title}>Click Button bellow To Start a Conversation</Text>
        </View>
        
        <TouchableOpacity style={recording ? styles.buttonStop : styles.button} onPress={recording ? stopRecording : startRecording}>
        {recording ?
            <Text style={styles.buttonText}>Stop</Text> :
            <Text style={styles.buttonText}>Talk</Text>}
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};


export default ConversationScreen;