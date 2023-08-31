import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { tamaguiStyles } from './TamaguiStyles'
import { Rating } from 'react-native-ratings';
import BackButton from '../components/Buttons/BackButton';
import { auth, db } from '../../firebase';

const AddFeedbackScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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
            setEmail(data.email);
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

  const submitFeedback = async () => {
    if (!content) {
      Alert.alert(
        'Error',
        'Feedback content is empty.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }

    const currentUser = auth.currentUser;

    if (currentUser) {
      const feedbackData = {
        userId: currentUser.uid,
        username: username,
        email: email,
        ratings: rating,
        content: content,
        timestamp: new Date(),
      };

      try {
        await db.collection('feedback').add(feedbackData);
        console.log('Feedback submitted successfully.');
        Alert.alert(
          'Feedback',
          'Feedback submitted successfully',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
        navigation.navigate('Feedback');
        // You can add a navigation action here to navigate to a success screen or home screen
      } catch (error) {
        console.error('Error submitting feedback:', error);
        Alert.alert('Error', (error as Error).message, [{ text: 'OK' }], {
          cancelable: false,
        });
      }
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <tamaguiStyles.Container alignItems='flex-start' justifyContent='flex-start' paddingHorizontal='$5'>
          <BackButton onPress={()=>navigation.goBack()}/>
          <tamaguiStyles.TextTitle style={{fontSize: 30}}>Leave a feedback</tamaguiStyles.TextTitle>
          <tamaguiStyles.TextBody textAlign='left' color='#959595'>Every feedback you share is a stepping stone on our path to excellence.</tamaguiStyles.TextBody>
          <tamaguiStyles.EmptyContainerY height='3%'/>
          <tamaguiStyles.TextBody style={{fontSize: 18}}>Ratings</tamaguiStyles.TextBody>
          <tamaguiStyles.TextBody textAlign='left' color='#959595'>Would you recommend our apps?</tamaguiStyles.TextBody>
          <tamaguiStyles.EmptyContainerY height='3%'/>
          <tamaguiStyles.RowContainer width='100%' justifyContent='center'>
            <Rating
              showRating
              type="star"
              fractions={1}
              startingValue={0}
              imageSize={40}
              onFinishRating={(rating) => setRating(rating)}
            />
          </tamaguiStyles.RowContainer>
          <tamaguiStyles.EmptyContainerY height='5%'/>
          <tamaguiStyles.TextBody style={{fontSize: 18}}>Feedback</tamaguiStyles.TextBody>
          <tamaguiStyles.TextBody textAlign='left' color='#959595'>How was your overall experience? Tell us more!</tamaguiStyles.TextBody>
          <tamaguiStyles.EmptyContainerY height='3%'/>
          <tamaguiStyles.TextArea 
            placeholder='Enter your feedback here'
            value={content}
            onChangeText={setContent}/>
          <tamaguiStyles.EmptyContainerY height='3%'/>
          <tamaguiStyles.PrimaryButton width='100%' onPress={submitFeedback}>Submit</tamaguiStyles.PrimaryButton>
         
        </tamaguiStyles.Container>
    </ScrollView>
  )
}

export default AddFeedbackScreen

const styles = StyleSheet.create({})