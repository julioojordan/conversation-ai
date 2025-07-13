import axios from "axios";
import TrackPlayer from 'react-native-track-player';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';


const voiceId = "zapDw3Kqt4yTBwEAkuyj";
// const text = "もちろん、愚か者でも私が真の王だと知っている";
const apiKey = "9814720a3571610e541db050919b4726";
const voiceSettings = {
  stability: 0.7,
  similarity_boost: 0.5,
  style: 0.2,
  use_speaker_boost: true
};

export const startStreaming = async (text) => {
  console.log('masuk start streaming', {text})

    const baseUrl = "https://api.elevenlabs.io/v1/text-to-speech";
    const headers = {
      "Content-Type": "application/json",
      "Accept": "audio/mpeg",
      "xi-api-key": apiKey,
    };

    const requestBody = {
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: voiceSettings,
    };

    try {
      const response = await axios.post(`${baseUrl}/${voiceId}`, requestBody, {
        headers,
        responseType: "arraybuffer",
      });
      if (response.status === 200) {
        // cara 1
        // const audioUrl = URL.createObjectURL(response.data);
        // await TrackPlayer.setupPlayer();
        // await TrackPlayer.add({
        //   id: 'trackId',
        //   url: audioUrl,
        //   title: 'Audio Title',
        //   artist: 'Artist Name',
        // });
        // await TrackPlayer.play();
        // cara 2
        const buffer = Buffer.from(response.data); // Konversi arraybuffer menjadi buffer
        const filePath = `${RNFS.DocumentDirectoryPath}/audiofile.mp3`;

        // Hapus file jika sudah ada
        await RNFS.exists(filePath).then(async (exists) => {
          if (exists) {
            await RNFS.unlink(filePath);
          }
        });

        // Simpan buffer ke file
        await RNFS.writeFile(filePath, buffer.toString('base64'), 'base64');

        // Mainkan audio
        const audio = new Sound(filePath, '', (error) => {
          if (error) {
            console.error('Error playing audio:', error);
            setError('Error: Unable to play audio.');
            return;
          }
          audio.play();
        });
        // cara web
        // const audio = new Audio(URL.createObjectURL(response.data));
        // audio.play();
      } else {
        setError("Error: Unable to stream audio.");
      }
    } catch (error) {
      console.log('error', {error})
      return Promise.resolve({ success: false, msg: error.message });
    }
  };