import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TamaguiProvider } from 'tamagui';
import Navigations from './src/navigations/Navigations';
import { useFonts } from 'expo-font';
import React from 'react';

import config from './tamagui.config';

export default function App() {
  const [loaded] = useFonts({
    PoppinsRegular: require('./assets/fonts/PoppinsRegular.ttf'),
    PoppinsMedium: require('./assets/fonts/PoppinsMedium.ttf'),
    PoppinsBold: require('./assets/fonts/PoppinsBold.ttf'),
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return null; // Render nothing until the fonts are loaded
  }

  return (
    <TamaguiProvider config={config}>
      <Navigations />
      {/* <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View> */}
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
