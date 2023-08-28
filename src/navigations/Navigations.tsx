import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const Navigations = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            {/* <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/> */}
            <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigations

const styles = StyleSheet.create({})