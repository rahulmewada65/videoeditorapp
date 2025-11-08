/**
 * --------------------------------------------------------------
 * 🎞 Video Editor Screen
 * Author: Rahul Meewada
 * Date: 08th November 2025
 * --------------------------------------------------------------
 * Source References:
 * 🧠 UI Created by AI (ChatGPT)
 * 📦 Libraries: npmjs.com (react-native-video, react-native-linear-gradient, react-native-vector-icons)
 * 📰 Tutorials: medium.com (React Native Video Editor, UI Design Concepts)
 * 🌐 Research: google.com (Animations, Permissions, Modal, Gradients)
 * ⚙️ Native Module: Custom "VideoEditor" (used for trimming & text overlay)
 * --------------------------------------------------------------
 * Description:
 * This screen allows users to:
 * 1️⃣ Trim a selected video clip.
 * 2️⃣ Add custom text overlays with position, font, and color.
 * 3️⃣ Export the edited video using a native module (VideoEditor).
 * --------------------------------------------------------------
 */

import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from '../components/VideoPlayer';
import TrimEditor from '../components/TrimEditor';
import TextOverlay from '../components/TextOverlay';
import {NativeModules, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {VideoEditor} = NativeModules; // ⚙️ Native Module for Video Processing (Trim + Text)

export default function EditorScreen({route}) {
  const {videoUri} = route.params;

  // 🎬 States
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [showTextModal, setShowTextModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // 📝 Text overlay customization state
  const [textOverlay, setTextOverlay] = useState({
    text: 'My Text',
    x: 50,
    y: 50,
    fontSize: 20,
    color: '#ffffff',
    fontStyle: 'normal',
    fontFamily: 'System',
  });

  // 🧩 Update overlay field
  const updateOverlay = (key, value) => {
    setTextOverlay({...textOverlay, [key]: value});
  };

  // 🎨 Color palette for text
  const colors = [
    '#ffffff',
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
    '#ffa500',
  ];

  /**
   * 💾 Export video using Native Module
   * Combines trimming and text overlay features
   */
  const exportVideo = async (startTime, endTime) => {
    if (loading) return;
    setLoading(true);
    try {
      console.log('Starting export with:', {
        videoUri,
        startTime,
        endTime,
        textOverlay,
      });

      // ⚙️ Call native module method
      const result = await VideoEditor.trimAndAddTextToVideo(
        videoUri,
        startTime,
        endTime,
        textOverlay.text,
        textOverlay.x,
        textOverlay.y,
      );

      console.log('Export Result:', result);
      Alert.alert('✅ Success', `Video saved at: ${result}`);
    } catch (err) {
      Alert.alert('❌ Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Button press animation
  const scaleAnim = useRef(new Animated.Value(1)).current;
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
   * 🧭 UI Layout
   */
  return (
    <View style={styles.container}>
      {/* 🎥 Video Player Section */}
      <View style={styles.videoContainer}>
        <VideoPlayer videoUri={videoUri} />
      </View>

      {/* ✂️ Trim Editor Section */}
      <TrimEditor
        duration={end}
        onChange={({start, end}) => {
          setStart(start);
          setEnd(end);
        }}
        onDownload={({start, end}) => {
          exportVideo(start, end);
        }}
      />

      {/* 🎨 Customize Text Button */}
      <Animated.View style={{transform: [{scale: scaleAnim}]}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setShowTextModal(true);
            animatePress();
          }}>
          <LinearGradient
            colors={['#00e5ff', '#7b61ff']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.openPopupButton}>
            <Icon name="edit" size={22} color="#fff" style={{marginRight: 8}} />
            <Text style={styles.openPopupText}>Customize Text</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* 🧾 Text Customization Modal */}
      <Modal
        visible={showTextModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowTextModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🎨 Text Customization</Text>
              <TouchableOpacity onPress={() => setShowTextModal(false)}>
                <Icon name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Modal Body */}
            <ScrollView
              style={{maxHeight: 450}}
              showsVerticalScrollIndicator={false}>
              {/* FONT SIZE */}
              <View style={styles.card}>
                <Text style={styles.label}>Font Size</Text>
                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() =>
                      updateOverlay(
                        'fontSize',
                        Math.max(10, textOverlay.fontSize - 2),
                      )
                    }>
                    <Text style={styles.buttonText}>A−</Text>
                  </TouchableOpacity>
                  <Text style={styles.valueText}>{textOverlay.fontSize}</Text>
                  <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() =>
                      updateOverlay('fontSize', textOverlay.fontSize + 2)
                    }>
                    <Text style={styles.buttonText}>A+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* FONT COLOR */}
              <View style={styles.card}>
                <Text style={styles.label}>Font Color</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.row}>
                    {colors.map((clr, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.colorBox,
                          {backgroundColor: clr},
                          textOverlay.color === clr && styles.selectedColorBox,
                        ]}
                        onPress={() => updateOverlay('color', clr)}
                      />
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* FONT STYLE */}
              <View style={styles.card}>
                <Text style={styles.label}>Font Style</Text>
                <View style={styles.row}>
                  {['normal', 'italic'].map(style => (
                    <TouchableOpacity
                      key={style}
                      style={[
                        styles.controlButton,
                        textOverlay.fontStyle === style && styles.activeButton,
                      ]}
                      onPress={() => updateOverlay('fontStyle', style)}>
                      <Text
                        style={[
                          styles.buttonText,
                          textOverlay.fontStyle === style && styles.activeText,
                        ]}>
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* FONT FAMILY */}
              <View style={styles.card}>
                <Text style={styles.label}>Font Family</Text>
                <View style={styles.row}>
                  {['System', 'monospace', 'serif', 'sans-serif'].map(
                    family => (
                      <TouchableOpacity
                        key={family}
                        style={[
                          styles.controlButton,
                          textOverlay.fontFamily === family &&
                            styles.activeButton,
                        ]}
                        onPress={() => updateOverlay('fontFamily', family)}>
                        <Text
                          style={[
                            styles.buttonText,
                            textOverlay.fontFamily === family &&
                              styles.activeText,
                          ]}>
                          {family}
                        </Text>
                      </TouchableOpacity>
                    ),
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ✏️ Text Overlay on Video */}
      <TextOverlay textOverlay={textOverlay} setTextOverlay={setTextOverlay} />

      {/* 📘 Footer with credits */}
      <Text style={styles.footer}>👨‍💻 Designed by Rahul Meewada</Text>
    </View>
  );
}

/**
 * 💅 Styles
 */
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0b0b0b'},
  videoContainer: {position: 'relative'},

  openPopupButton: {
    flexDirection: 'row',
    alignItems: 'end',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 15,
    shadowColor: '#00e5ff',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 8,
  },

  openPopupText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContainer: {
    backgroundColor: '#151515',
    borderRadius: 15,
    width: '95%',
    padding: 15,
    elevation: 8,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: '#333',
    paddingBottom: 6,
  },

  modalTitle: {color: '#fff', fontSize: 16, fontWeight: '600'},

  card: {
    backgroundColor: '#202020',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    elevation: 3,
  },

  label: {color: '#ccc', fontSize: 15, marginBottom: 6, fontWeight: '500'},
  row: {flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'},
  controlButton: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginVertical: 4,
  },
  activeButton: {backgroundColor: '#00bcd4'},
  buttonText: {color: '#fff', fontSize: 14},
  activeText: {color: '#000', fontWeight: '600'},
  valueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  colorBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    marginRight: 10,
  },
  selectedColorBox: {borderColor: '#00bcd4', borderWidth: 2},

  footer: {
    position: 'absolute',
    bottom: 30,
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    width: '100%',
    fontStyle: 'italic',
  },
  sourceFooter: {
    position: 'absolute',
    bottom: 10,
    color: '#777',
    fontSize: 11,
    textAlign: 'center',
    width: '100%',
    fontStyle: 'italic',
  },
});
