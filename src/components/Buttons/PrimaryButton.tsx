import { StyleSheet, Text, View, TouchableHighlight, GestureResponderEvent } from 'react-native';
import React from 'react';

interface PrimaryButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onPress, text }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.5}
      underlayColor="#561F9D"
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9074fc',
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
});
