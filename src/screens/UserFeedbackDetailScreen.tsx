import React,{useState,useEffect} from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import BackButton from '../components/Buttons/BackButton';
import { tamaguiStyles } from './TamaguiStyles';
import { Avatar } from 'tamagui';
import { auth, db } from '../../firebase';
import { Rating } from 'react-native-ratings';

const UserFeedbackDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { feedback } = route.params;
  const [rating, setRating] = useState(feedback.ratings);
  const [content, setContent] = useState(feedback.content);

  const handleUpdate = async () => {
    // Update the feedback in Firebase
    try {
        const updatedTimestamp = new Date();

        await db.collection('feedback').doc(feedback.id).update({
            ratings: rating,
            content: content,
            timestamp: updatedTimestamp,
        });
        
        navigation.goBack();
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

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
    <ScrollView showsVerticalScrollIndicator={false}>
        <tamaguiStyles.Container alignItems='flex-start' justifyContent='flex-start' paddingHorizontal='8%'>
            <BackButton onPress={() => navigation.goBack()} />
            <tamaguiStyles.TextTitle marginBottom='3%'>User Feedback Details</tamaguiStyles.TextTitle>
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
            <tamaguiStyles.RowContainer marginBottom='5%' width='100%' justifyContent='center'>
                <Rating 
                    showRating
                    type="star"
                    fractions={1}
                    startingValue={rating}
                    onFinishRating={(rating) => setRating(rating)}
                />
            </tamaguiStyles.RowContainer>
            
            <tamaguiStyles.TextBody marginBottom='3%' style={{fontSize: 18}}>Feedback:</tamaguiStyles.TextBody>
            <tamaguiStyles.TextArea 
                marginBottom='5%'
                placeholder='Enter your feedback here'
                value={content}
                onChangeText={setContent}/>
            <tamaguiStyles.PrimaryButton width='100%' onPress={handleUpdate}>Update</tamaguiStyles.PrimaryButton>
            <tamaguiStyles.PrimaryButton width='100%' onPress={handleDelete}>Delete</tamaguiStyles.PrimaryButton>
        </tamaguiStyles.Container>
    </ScrollView>
  );
};

export default UserFeedbackDetailScreen;
