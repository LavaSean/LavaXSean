import React, {useEffect, useState} from 'react';
import { View, Text, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import BackButton from '../components/Buttons/BackButton';
import { tamaguiStyles } from './TamaguiStyles';
import { Avatar } from 'tamagui';
import { auth, db } from '../../firebase';

const FeedbackDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { feedback } = route.params;
  const [userType, setUserType] = useState('');

  useEffect(() => {
    // Set up the listener for authentication state changes
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        // Fetch userType from Firestore
        const userRef = db.collection('users').doc(user.uid);
        const unsubscribeUser = userRef.onSnapshot((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setUserType(userData.userType);
          }
        });
  
        return () => {
          unsubscribeUser();
        };
      } else {
        // User is not authenticated, handle accordingly
        setUserType('');
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const handleDelete = () => {
    // Show confirmation alert
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this feedback?',
      [
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: async () => {
            // Delete the feedback from Firebase
            try {
              await db.collection('feedback').doc(feedback.id).delete();
              navigation.navigate('Feedback'); // Navigate back to the feedback list
            } catch (error) {
              console.error('Error deleting feedback:', error);
            }
          },
        },
        {
            text: 'No',
            style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  // Use the feedback object to display the details
  return (
    <tamaguiStyles.Container alignItems='flex-start' justifyContent='flex-start' paddingHorizontal='$5'>
        <BackButton onPress={() => navigation.goBack()} />
        <tamaguiStyles.TextTitle marginBottom='3%'>Feedback Details</tamaguiStyles.TextTitle>
        <tamaguiStyles.RowContainer marginBottom='5%'>
            <Avatar circular size="$10">
                <Avatar.Image source={require('../../assets/defaultProfile.png')} style={{width: '100%', height: '100%'}}/>
                <Avatar.Fallback bc="grey" />
            </Avatar>
            <tamaguiStyles.RowContainer width='10%'/>
            <tamaguiStyles.ColumnContainer>
                <tamaguiStyles.TextBody textAlign='left' style={{fontSize: 18}}>{feedback.username}</tamaguiStyles.TextBody>
                <tamaguiStyles.TextBody textAlign='left' style={{fontSize: 12, color:'#9e9e9e'}}>
                    Created on{'\n'}{feedback.timestamp.toDate().toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}
                </tamaguiStyles.TextBody>
            </tamaguiStyles.ColumnContainer>
        </tamaguiStyles.RowContainer>
        <tamaguiStyles.TextBody style={{fontSize: 18}}>User email:</tamaguiStyles.TextBody>
        <tamaguiStyles.TextBody marginBottom='5%' color='#959595'>{feedback.email}</tamaguiStyles.TextBody>
        <tamaguiStyles.TextBody style={{fontSize: 18}}>Ratings:</tamaguiStyles.TextBody>
        <tamaguiStyles.TextBody marginBottom='5%' color='#959595'>{feedback.ratings}</tamaguiStyles.TextBody>
        <tamaguiStyles.TextBody style={{fontSize: 18}}>Feedback:</tamaguiStyles.TextBody>
        <tamaguiStyles.TextBody textAlign='left' marginBottom='5%' color='#959595'>{feedback.content}</tamaguiStyles.TextBody>
        {userType === 'Admin' && (
          <tamaguiStyles.PrimaryButton width='100%' onPress={handleDelete}>Delete</tamaguiStyles.PrimaryButton>
        )}
    </tamaguiStyles.Container>
  );
};

export default FeedbackDetailScreen;
