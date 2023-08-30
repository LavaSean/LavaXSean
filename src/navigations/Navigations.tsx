import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import FeedbackScreen from '../screens/FeedbackScreen';

const Stack = createStackNavigator();

const Navigations = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
        initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#FDFDFD'}, // Background color for all screens
          }}
        >
            <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Feedback" component={FeedbackScreen} options={{headerShown: true}}/>
            <Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigations

const styles = StyleSheet.create({})