import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { tamaguiStyles } from './TamaguiStyles'
import { Avatar, Button } from 'tamagui'
import { Activity, Airplay } from '@tamagui/lucide-icons'
import { auth, db } from '../../firebase';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState('');
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('');
  const [unsubscribeUserSnapshot, setUnsubscribeUserSnapshot] = useState(null);

  useEffect(() => {
    // Set up the listener for authentication state changes
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        const userRef = db.collection('users').doc(user.uid);

        try {
          const doc = await userRef.get();
          if (doc.exists) {
            const data = doc.data();
            setUsername(data.username);
            setUserType(data.userType);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    });

    return () => {
      if (unsubscribeAuth) {
        unsubscribeAuth(); // Unsubscribe from the auth state change listener
      }
      if (unsubscribeUserSnapshot) {
        unsubscribeUserSnapshot();
      }
    };
  }, []);
  

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <tamaguiStyles.Container>
        <tamaguiStyles.RowContainer>
          <tamaguiStyles.ColumnContainer width='70%'>
            <tamaguiStyles.TextTitle alignSelf='flex-start'>Hello, {userType} {username}</tamaguiStyles.TextTitle>
            <tamaguiStyles.TextBody alignSelf='flex-start'>Welcome, we're glad to have you here</tamaguiStyles.TextBody>
          </tamaguiStyles.ColumnContainer>
          <Avatar circular size="$6">
            <Avatar.Image source={require('../../assets/defaultProfile.png')} style={{width: '100%', height: '100%'}}/>
            <Avatar.Fallback bc="grey" />
          </Avatar>
        </tamaguiStyles.RowContainer>
        <tamaguiStyles.RowContainer backgroundColor='white' width='70%' justifyContent='space-between'>
          {userType === 'User' ? (
            <>
              <tamaguiStyles.ColumnContainer alignItems='center'>
                <tamaguiStyles.CircularButton icon={Airplay} onPress={() => navigation.navigate('Overview')} />
                <tamaguiStyles.TextTitle style={{ fontSize: 14 }}>Overview</tamaguiStyles.TextTitle>
              </tamaguiStyles.ColumnContainer>
              <tamaguiStyles.ColumnContainer alignItems='center'>
                <tamaguiStyles.CircularButton icon={Airplay} onPress={() => navigation.navigate('Feedback')} />
                <tamaguiStyles.TextTitle style={{ fontSize: 14 }}>Feedback</tamaguiStyles.TextTitle>
              </tamaguiStyles.ColumnContainer>
              <tamaguiStyles.ColumnContainer alignItems='center'>
                <tamaguiStyles.CircularButton icon={Airplay} onPress={() => navigation.navigate('SignIn')} />
                <tamaguiStyles.TextTitle style={{ fontSize: 14 }}>Logout</tamaguiStyles.TextTitle>
              </tamaguiStyles.ColumnContainer>
            </>
          ) : userType === 'Admin' ? (
            <>
              <tamaguiStyles.ColumnContainer alignItems='center'>
                <tamaguiStyles.CircularButton icon={Airplay} onPress={() => navigation.navigate('Overview')} />
                <tamaguiStyles.TextTitle style={{ fontSize: 14 }}>Overview</tamaguiStyles.TextTitle>
              </tamaguiStyles.ColumnContainer>
              <tamaguiStyles.ColumnContainer alignItems='center'>
                <tamaguiStyles.CircularButton icon={Airplay} onPress={() => navigation.navigate('Dashboard')} />
                <tamaguiStyles.TextTitle style={{ fontSize: 14 }}>Dashboard</tamaguiStyles.TextTitle>
              </tamaguiStyles.ColumnContainer>
              <tamaguiStyles.ColumnContainer alignItems='center'>
                <tamaguiStyles.CircularButton icon={Airplay} onPress={() => navigation.navigate('SignIn')} />
                <tamaguiStyles.TextTitle style={{ fontSize: 14 }}>Logout</tamaguiStyles.TextTitle>
              </tamaguiStyles.ColumnContainer>
            </>
          ) : null}
        </tamaguiStyles.RowContainer>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
        <Text>HomeScreen</Text>
      </tamaguiStyles.Container>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})