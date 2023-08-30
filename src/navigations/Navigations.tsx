import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import AddFeedbackScreen from '../screens/AddFeedbackScreen';
import OverviewScreen from '../screens/OverviewScreen';
import FeedbackDetailScreen from '../screens/FeedbackDetailScreen';

const Stack = createStackNavigator();

const Navigations = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
        initialRouteName="SignIn"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#FDFDFD'}, // Background color for all screens
          }}
        >
            <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Feedback" component={FeedbackScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Overview" component={OverviewScreen} options={{headerShown: true}}/>
            <Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: true}}/>
            <Stack.Screen name="AddFeedback" component={AddFeedbackScreen}/>
            <Stack.Screen name="FeedbackDetail" component={FeedbackDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigations

const styles = StyleSheet.create({})