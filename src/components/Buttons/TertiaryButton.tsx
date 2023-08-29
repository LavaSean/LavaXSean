import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ViewStyle, TextStyle } from 'react-native';

interface TertiaryButtonProps {
  onPress: () => void;
  text: string;
  alignItems: 'flex-start' | 'center' | 'flex-end';
  textColor: string;
  textPressedColor: string;
}

interface CustomTextStyle extends TextStyle {
  fontWeight?: 'normal' | 'bold';
}

const TertiaryButton: React.FC<TertiaryButtonProps> = ({ onPress, text, alignItems, textColor, textPressedColor }) => {

  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handlePress = () => {
    onPress();
  };

  const containerStyle: ViewStyle = {
    width: '100%',
    marginVertical: 5,
    marginLeft: 5,
    alignItems,
  };

  const textStyle: CustomTextStyle = {
    fontWeight: isPressed ? "bold" : "500",
    fontSize: 14,
    color: isPressed ? textPressedColor : textColor,
  };

  return (
    <Pressable onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut} style={({ pressed }) => pressed ? { opacity: 0.6 } : {}}>
      <View style={containerStyle}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default TertiaryButton;

const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 5,
    },
    text: {
      fontWeight: 'bold',
    },
  });
