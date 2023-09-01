import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { tamaguiStyles } from './TamaguiStyles';
import { Plus, MoreHorizontal } from '@tamagui/lucide-icons';
import BackButton from '../components/Buttons/BackButton';
import { auth, db } from '../../firebase';
import { Avatar } from 'tamagui';

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const [feedbackList, setFeedbackList] = useState([]);
  const currentUser = auth.currentUser;
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const unsubscribe = db.collection('feedback')
      .where('userId', '==', currentUser?.uid)
      .onSnapshot((snapshot) => {
        const feedbackData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        feedbackData.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
        setFeedbackList(feedbackData);
      });

    // Fetch userType from the user collection
    const userRef = db.collection('users').doc(currentUser?.uid);
    const unsubscribeUser = userRef.onSnapshot((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        setUserType(userData.userType); // Set the userType in state
      }
    });

    return () => {
      unsubscribe();
      unsubscribeUser();
    };
  }, [currentUser]);

  const renderFeedbackItem = ({ item }) => (
    <tamaguiStyles.RowContainer>
      <tamaguiStyles.RowContainer width='100%' borderColor='black' borderWidth='$0.25' borderRadius='$size.1' paddingVertical='3%' paddingHorizontal='3%' marginBottom='3%'>
        <Avatar circular size="$5" width='25%'>
          <Avatar.Image source={require('../../assets/defaultProfile.png')} style={{width: '100%', height: '100%'}}/>
          <Avatar.Fallback bc="grey" />
        </Avatar>
        <tamaguiStyles.ColumnContainer paddingLeft='5%' width='35%'>
            <tamaguiStyles.TextTitle textAlign='left' style={{fontSize:14}}>{item.username.length>12? item.username.substring(0,8)+'...':item.username}</tamaguiStyles.TextTitle>
            <tamaguiStyles.TextBody textAlign='left' style={{fontSize:10}}>
              {item.timestamp.toDate().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </tamaguiStyles.TextBody>
            <tamaguiStyles.TextBody textAlign='left' style={{fontSize:10}}>
              {item.timestamp.toDate().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </tamaguiStyles.TextBody>
        </tamaguiStyles.ColumnContainer>
        <tamaguiStyles.ColumnContainer width='25%' marginRight='3%'>
          <tamaguiStyles.TextTitle fontSize='$2'>Ratings</tamaguiStyles.TextTitle>
          <tamaguiStyles.TextBody>{item.ratings}</tamaguiStyles.TextBody>
        </tamaguiStyles.ColumnContainer>
        <tamaguiStyles.CircularButton icon={MoreHorizontal} 
          onPress={() => {navigation.navigate('UserFeedbackDetail', { feedback: item })}}/>
      </tamaguiStyles.RowContainer>
    </tamaguiStyles.RowContainer>
  );

  return (
    <tamaguiStyles.Container alignItems='flex-start' justifyContent='flex-start' paddingHorizontal='$5'>
      <BackButton onPress={() => navigation.goBack()} />
      <tamaguiStyles.TextTitle>Feedback List</tamaguiStyles.TextTitle>
      <tamaguiStyles.PrimaryButton width='100%' icon={Plus}
        onPress={() => navigation.navigate('AddFeedback')}
      >
        Add Feedback
      </tamaguiStyles.PrimaryButton>

      {feedbackList.length === 0 ? (
        <tamaguiStyles.TextBody alignSelf='center' color='#959595' >No feedback submitted</tamaguiStyles.TextBody>
      ) : (
        <FlatList
          data={feedbackList}
          renderItem={renderFeedbackItem}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 20 }}
        />
      )}
    </tamaguiStyles.Container>
  );
};

const styles = StyleSheet.create({});

export default FeedbackScreen;
