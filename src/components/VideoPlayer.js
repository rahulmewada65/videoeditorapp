/**
 * --------------------------------------------------------------
 * 🎥 Video Player Component - VideoPlayer.js
 * Author: Rahul Meewada
 * Date: 08th November 2025
 * --------------------------------------------------------------
 * Source References:
 * 🧠 UI Created by AI (ChatGPT)
 * 📦 Libraries: npmjs.com (react-native-video, @react-native-community/slider, react-native-linear-gradient)
 * 📰 Tutorials: medium.com (React Native Video Player UI & Controls)
 * 🌐 Research: google.com (Video playback, pause/play animation & slider sync)
 * --------------------------------------------------------------
 * Description:
 * A lightweight video player with:
 * 1️⃣ Play / Pause controls
 * 2️⃣ Real-time slider tracking
 * 3️⃣ Loading spinner during buffering
 * 4️⃣ Smooth gradient overlay for aesthetics
 *
 * 🧩 Used in: EditorScreen.js
 * --------------------------------------------------------------
 */

import React, {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

export default function VideoPlayer({videoUri}) {
  const ref = useRef(null);

  // 🎬 Player States
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);

  // 💫 Animation for play/pause button
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // 🕒 Format seconds to mm:ss
  const formatTime = t => {
    const minutes = Math.floor(t / 60);
    const seconds = Math.floor(t % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  // 🔁 Play/Pause button pulse animation
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
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

  // ▶️ Toggle playback
  const handlePlayPause = () => {
    animateButton();
    setPaused(!paused);
  };

  return (
    <View style={styles.container}>
      {/* 🎞 Video Display Section */}
      <View style={styles.videoWrapper}>
        {/* Loader while video loads */}
        {loading && (
          <ActivityIndicator
            size="large"
            color="#00bcd4"
            style={styles.loading}
          />
        )}

        {/* Video Component */}
        <Video
          ref={ref}
          source={{uri: videoUri}}
          paused={paused}
          resizeMode="contain"
          style={styles.video}
          onLoad={data => {
            setDuration(data.duration);
            setLoading(false);
          }}
          onProgress={progress => setCurrentTime(progress.currentTime)}
        />

        {/* Center Play / Pause Button with Animated Scale */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.overlayButton}
          onPress={handlePlayPause}>
          <Animated.View style={{transform: [{scale: scaleAnim}]}}>
            <Icon
              name={paused ? 'play-circle-filled' : 'pause-circle-filled'}
              size={68}
              color={paused ? '#00bcd4ee' : '#ffffffcc'}
            />
          </Animated.View>
        </TouchableOpacity>

        {/* Gradient Overlay at Bottom for Depth */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradientBottom}
        />
      </View>

      {/* 🎛 Playback Controls */}
      <View style={styles.controls}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Slider
          style={styles.slider}
          value={currentTime}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="#00bcd4"
          maximumTrackTintColor="#444"
          thumbTintColor="#00bcd4"
          onValueChange={time => ref.current.seek(time)}
        />
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

/**
 * 💅 Styles
 */
const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 10,
    backgroundColor: '#111',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#00bcd4',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },

  videoWrapper: {
    width: '100%',
    height: 220,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  video: {
    width: '100%',
    height: '100%',
  },

  loading: {
    position: 'absolute',
    zIndex: 2,
  },

  overlayButton: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 3,
  },

  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151515',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  slider: {
    flex: 1,
    marginHorizontal: 10,
  },

  timeText: {
    color: '#fff',
    fontSize: 13,
    width: 45,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
});
