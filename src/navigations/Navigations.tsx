import React from 'react';
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
import UserFeedbackDetailScreen from '../screens/UserFeedbackDetailScreen';

const Stack = createStackNavigator();

const Navigations = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
        initialRouteName="SignIn"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardStyle: { backgroundColor: '#FDFDFD'}, // Background color for all screens
          }}
        >
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Feedback" component={FeedbackScreen} />
            <Stack.Screen name="Overview" component={OverviewScreen}/>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="AddFeedback" component={AddFeedbackScreen}/>
            <Stack.Screen name="FeedbackDetail" component={FeedbackDetailScreen} />
            <Stack.Screen name="UserFeedbackDetail" component={UserFeedbackDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigations
