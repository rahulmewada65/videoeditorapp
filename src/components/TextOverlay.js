/**
 * --------------------------------------------------------------
 * 🖋 Text Overlay Component - TextOverlay.js
 * Author: Rahul Meewada
 * Date: 08th November 2025
 * --------------------------------------------------------------
 * Source References:
 * 🧠 UI Created by AI (ChatGPT)
 * 📦 Libraries: npmjs.com (react-native, react-native-animated)
 * 📰 Tutorials: medium.com (Draggable Text Overlay in React Native)
 * 🌐 Research: google.com (PanResponder, Animated API)
 * --------------------------------------------------------------
 * Description:
 * This component allows users to:
 * 1️⃣ Drag and reposition a text overlay on top of a video.
 * 2️⃣ Edit the text dynamically.
 * 3️⃣ Reflect customizations (font, color, style) in real-time.
 *
 * 🧩 Used in: EditorScreen.js
 * --------------------------------------------------------------
 */

import React, {useRef} from 'react';
import {
  Animated,
  PanResponder,
  TextInput,
  StyleSheet,
  View,
} from 'react-native';

export default function TextOverlay({textOverlay, setTextOverlay}) {
  // 🎯 Animated position values (x, y)
  const pan = useRef(
    new Animated.ValueXY({x: textOverlay.x, y: textOverlay.y}),
  ).current;

  // 🎮 Handle drag gestures using PanResponder
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

    // 👉 While dragging
    onPanResponderMove: (e, gestureState) => {
      pan.setValue({
        x: gestureState.dx,
        y: gestureState.dy,
      });
    },

    // 🏁 On release, save new coordinates to state
    onPanResponderRelease: (e, gestureState) => {
      const newX = textOverlay.x + gestureState.dx;
      const newY = textOverlay.y + gestureState.dy;
      setTextOverlay(prev => ({...prev, x: newX, y: newY}));
      pan.setValue({x: 0, y: 0}); // Reset offset for next drag
    },
  });

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {/* ✏️ Animated draggable text field */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.overlay,
          {
            transform: [
              {
                translateX: Animated.add(
                  pan.x,
                  new Animated.Value(textOverlay.x),
                ),
              },
              {
                translateY: Animated.add(
                  pan.y,
                  new Animated.Value(textOverlay.y),
                ),
              },
            ],
          },
        ]}>
        <TextInput
          style={[
            styles.text,
            {
              color: textOverlay.color,
              fontSize: textOverlay.fontSize,
              fontStyle: textOverlay.fontStyle,
              fontFamily: textOverlay.fontFamily,
            },
          ]}
          value={textOverlay.text}
          onChangeText={text => setTextOverlay(prev => ({...prev, text}))}
          multiline
        />
      </Animated.View>
    </View>
  );
}

/**
 * 💅 Styles
 */
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
  },
  text: {
    borderBottomWidth: 1,
    borderColor: '#666',
    padding: 4,
    backgroundColor: 'transparent',
  },
});


