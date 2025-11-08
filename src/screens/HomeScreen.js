/**
 * --------------------------------------------------------------
 * 🎬 Lightweight Video Editor - Home Screen
 * Author: Rahul Meewada
 * Date: 08th November 2025
 * --------------------------------------------------------------
 * Source References:
 * 🧠 UI Created by AI (ChatGPT)
 * 📦 Libraries: npmjs.com (react-native-image-picker, react-native-linear-gradient, react-native-vector-icons)
 * 📰 Tutorials: medium.com (React Native Video Editing Guides)
 * 🌐 Research: google.com (React Native animation and permission handling)
 * --------------------------------------------------------------
 * Description:
 * This screen allows users to:
 * 1️⃣ Pick a video from their gallery.
 * 2️⃣ Record a new video using their device camera.
 *
 * Once a video is selected or recorded, the app navigates
 * to the "Editor" screen for editing operations.
 * --------------------------------------------------------------
 */

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {requestVideoPermissions} from '../utils/permissions'; // Utility to handle permissions

export default function HomeScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  /**
   * 🔹 Press animation effect for button touch feedback
   */
  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /**
   * 🎥 Pick a video from gallery
   */
  const selectVideo = async () => {
    const permission = await requestVideoPermissions();
    if (!permission) return;

    setLoading(true);
    const result = await launchImageLibrary({mediaType: 'video', quality: 1});
    setLoading(false);

    if (!result.didCancel && result.assets?.length) {
      navigation.navigate('Editor', {videoUri: result.assets[0].uri});
    } else {
      Alert.alert('No Video Selected', 'Please choose a valid video.');
    }
  };

  /**
   * 📸 Record a new video using the device camera
   */
  const recordVideo = async () => {
    const permission = await requestVideoPermissions();
    if (!permission) return;

    setLoading(true);
    const result = await launchCamera({
      mediaType: 'video',
      videoQuality: 'high',
      durationLimit: 60, // Limit to 1 minute recording
    });
    setLoading(false);

    if (!result.didCancel && result.assets?.length) {
      navigation.navigate('Editor', {videoUri: result.assets[0].uri});
    } else {
      Alert.alert('No Video Recorded', 'Try recording again.');
    }
  };

  /**
   * 🧭 UI Section - Screen Layout
   */
  return (
    <LinearGradient
      colors={['#0f2027', '#203a43', '#2c5364']}
      style={styles.container}>
      {/* Header Title */}
      <Text style={styles.title}>🎬 Lightweight Video Editor</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Create • Edit • Trim • Export — Instantly
      </Text>

      {/* Buttons Container */}
      <View style={styles.buttonContainer}>
        {/* 📁 Pick Video Button */}
        <Animated.View style={{transform: [{scale: scaleAnim}]}}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.actionButton}
            onPress={() => {
              animatePress();
              selectVideo();
            }}>
            <LinearGradient
              colors={['#00e5ff', '#0078ff']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.gradientButton}>
              <Icon name="video-library" size={26} color="#fff" />
              <Text style={styles.buttonText}>Pick a Video</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* 🎥 Record Video Button */}
        <Animated.View style={{transform: [{scale: scaleAnim}]}}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.actionButton}
            onPress={() => {
              animatePress();
              recordVideo();
            }}>
            <LinearGradient
              colors={['#ff4081', '#ff6f61']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.gradientButton}>
              <Icon name="videocam" size={26} color="#fff" />
              <Text style={styles.buttonText}>Record Video</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
      {/* Signature / Credit Line */}
      <Text style={styles.signature}>👨‍💻 Designed by Rahul Meewada</Text>
    </LinearGradient>
  );
}

/**
 * 💅 Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: '#00e5ff',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 8,
  },

  subtitle: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 40,
    letterSpacing: 0.5,
  },

  buttonContainer: {
    width: '90%',
  },

  actionButton: {
    marginVertical: 10,
    borderRadius: 40,
    overflow: 'hidden',
    shadowColor: '#00e5ff',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },

  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 40,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
    textTransform: 'uppercase',
  },

  footer: {
    color: '#888',
    fontSize: 12,
    position: 'absolute',
    bottom: 70,
  },

  signature: {
    color: '#aaa',
    fontSize: 12,
    position: 'absolute',
    bottom: 40,
    fontStyle: 'italic',
  },

  sourceFooter: {
    color: '#777',
    fontSize: 11,
    position: 'absolute',
    bottom: 20,
    fontStyle: 'italic',
  },
});
