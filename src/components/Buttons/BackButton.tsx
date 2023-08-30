import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from '@tamagui/lucide-icons'; // Import the ArrowLeft icon component

interface BackButtonProps {
  onPress: () => void; // Specify the type for the onPress prop
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <ArrowLeft color='black' size='$2' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: '3%',
    width: 50,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default BackButton;
