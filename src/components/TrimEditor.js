/**
 * --------------------------------------------------------------
 * ✂️ Video Trim Editor - TrimEditor.js
 * Author: Rahul Meewada
 * Date: 08th November 2025
 * --------------------------------------------------------------
 * Source References:
 * 🧠 UI Created by AI (ChatGPT)
 * 📦 Libraries: npmjs.com (@react-native-community/slider, react-native-linear-gradient, react-native-vector-icons)
 * 📰 Tutorials: medium.com (React Native Video Trimmer UI)
 * 🌐 Research: google.com (Animated API, Slider Customization)
 * --------------------------------------------------------------
 * Description:
 * A reusable video trimming component that allows users to:
 * 1️⃣ Select the start and end time of a video.
 * 2️⃣ Preview the selected duration dynamically.
 * 3️⃣ Export the trimmed clip using a callback.
 *
 * 🧩 Used in: EditorScreen.js
 * --------------------------------------------------------------
 */

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

export default function TrimEditor({duration = 10, onChange, onDownload}) {
  // 🎬 State Management
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(duration);
  const [loading, setLoading] = useState(false);

  // 💡 Animated scaling for download icon pulse effect
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // ⏱ Update trim range values and notify parent
  const update = (s, e) => {
    if (e - s >= 1) {
      onChange({start: s, end: e});
    }
  };

  // 📥 Handle video export action
  const handleDownload = async () => {
    if (!onDownload) return;
    setLoading(true);

    // Animate button pulse while processing
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    try {
      await onDownload({start, end});
    } catch (e) {
      console.error('Download Error:', e);
    } finally {
      setLoading(false);
      pulseAnim.setValue(1); // Reset animation scale
    }
  };

  return (
    <LinearGradient
      colors={['#121212', '#1c1c1c', '#111']}
      style={styles.container}>
      {/* 🧩 Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.titleGlow} />
        <Text style={styles.title}> ✂️ Trim Video</Text>

        {/* Download / Export Button with Pulse Animation */}
        <Animated.View style={{transform: [{scale: pulseAnim}]}}>
          <TouchableOpacity
            style={[styles.downloadButton, loading && {opacity: 0.6}]}
            onPress={handleDownload}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#00e5ff" />
            ) : (
              <Icon name="download" size={22} color="#00e5ff" />
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* 🕐 Start Time Control */}
      <View style={styles.row}>
        <Text style={styles.label}>Start</Text>
        <Text style={styles.timeText}>{start.toFixed(1)}s</Text>
      </View>

      <Slider
        style={styles.slider}
        value={start}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="#00e5ff"
        maximumTrackTintColor="#333"
        thumbTintColor="#00e5ff"
        onValueChange={v => {
          setStart(v);
          update(v, end);
        }}
      />

      {/* 🕒 End Time Control */}
      <View style={styles.row}>
        <Text style={styles.label}>End</Text>
        <Text style={styles.timeText}>{end.toFixed(1)}s</Text>
      </View>

      <Slider
        style={styles.slider}
        value={end}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="#ff4081"
        maximumTrackTintColor="#333"
        thumbTintColor="#ff4081"
        onValueChange={v => {
          setEnd(v);
          update(start, v);
        }}
      />

      {/* 🕓 Duration Display */}
      <View style={styles.durationBox}>
        <Icon name="access-time" size={14} color="#00e5ff" />
        <Text style={styles.durationText}>
          {(end - start).toFixed(1)}s Selected
        </Text>
      </View>
    </LinearGradient>
  );
}

/**
 * 💅 Styles
 */
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#00e5ff',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    borderWidth: 0.5,
    borderColor: '#1f1f1f',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  titleGlow: {
    position: 'absolute',
    left: 0,
    top: 9,
    width: 5,
    height: 20,
    backgroundColor: '#00e5ff',
    borderRadius: 3,
    shadowColor: '#00e5ff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.7,
    shadowRadius: 5,
  },

  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.8,
    paddingLeft: 10,
  },

  downloadButton: {
    backgroundColor: '#1a1a1a',
    padding: 7,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00e5ff55',
    elevation: 6,
    shadowColor: '#00e5ff',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },

  label: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: '500',
  },

  timeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  slider: {
    height: 30,
    marginBottom: 8,
  },

  durationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginTop: 10,
    shadowColor: '#00e5ff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  durationText: {
    color: '#00e5ff',
    fontWeight: '700',
    fontSize: 13,
    marginLeft: 6,
  },
});

