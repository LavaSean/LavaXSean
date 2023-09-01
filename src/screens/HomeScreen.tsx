import { ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { tamaguiStyles } from './TamaguiStyles'
import { Avatar } from 'tamagui'
import { ClipboardList, Edit3, BarChart3, LogOut } from '@tamagui/lucide-icons'
import { auth, db, firebase } from '../../firebase';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo>({userType: '', username: ''});
  const [recentFeedback, setRecentFeedback] = useState<any>([]); 

  interface UserInfo {
    userType: string;
    username: string;
  }

  interface Feedback {
    username: string;
    timestamp: firebase.firestore.Timestamp;
    ratings: number;
    content: string;
  }

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user.uid); // Set the user's UID as the current user
        const userRef = db.collection('users').doc(user.uid);
        try {
          const doc = await userRef.get();
          if (doc.exists) {
            const data = doc.data() as UserInfo | undefined;
            if (data) {
              setUserInfo(data);
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    });

    const feedbackRef = db.collection('feedback').orderBy('timestamp', 'desc').limit(3);
    const unsubscribeFeedbackSnapshot = feedbackRef.onSnapshot((snapshot) => {
      const feedbackData = snapshot.docs.map((doc) => doc.data());
      setRecentFeedback(feedbackData);
    });

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeFeedbackSnapshot) unsubscribeFeedbackSnapshot();
    };
  }, []);

  useEffect(() => {
    // Fetch the 3 most recent feedback from the database
    const fetchRecentFeedback = async () => {
      try {
        const feedbackRef = db.collection('feedback').orderBy('timestamp', 'desc').limit(3);
        const snapshot = await feedbackRef.get();
        const recentFeedbackData = snapshot.docs.map((doc) => doc.data());
        setRecentFeedback(recentFeedbackData);
      } catch (error) {
        console.error('Error fetching recent feedback:', error);
      }
    };

    fetchRecentFeedback();
  }, []);
  
  const RecentFeedbackItem = ({ feedback }: { feedback: Feedback }) => {
    return (
      <tamaguiStyles.XRecContainer padding='7%' marginBottom='3%'>
        <tamaguiStyles.ColumnContainer width='100%'>
          <tamaguiStyles.RowContainer alignItems='flex-start' marginBottom='3%'>
            <Avatar circular size="$6">
              <Avatar.Image source={require('../../assets/defaultProfile.png')} style={{width: '100%', height: '100%'}}/>
              <Avatar.Fallback bc="grey" />
            </Avatar>
            <tamaguiStyles.ColumnContainer alignItems='flex-start' paddingHorizontal='8%' width='50%'>
              <tamaguiStyles.TextTitle textAlign='left' numberOfLines={2} style={{fontSize: 14}}>{feedback.username}</tamaguiStyles.TextTitle>
              <tamaguiStyles.TextBody textAlign='left' style={{fontSize:10}}>Created on{'\n'}{feedback.timestamp.toDate().toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                  })}</tamaguiStyles.TextBody>
                  <tamaguiStyles.TextBody textAlign='left' style={{fontSize:10}}>
                  {feedback.timestamp.toDate().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
              </tamaguiStyles.TextBody>
            </tamaguiStyles.ColumnContainer>
            <tamaguiStyles.ColumnContainer alignItems='flex-start'>
              <tamaguiStyles.TextBody>Ratings</tamaguiStyles.TextBody>
              <tamaguiStyles.TextBody style={{fontSize: 35}}>{feedback.ratings}</tamaguiStyles.TextBody>
            </tamaguiStyles.ColumnContainer>
          </tamaguiStyles.RowContainer>
            <tamaguiStyles.TextBody numberOfLines={1} textAlign='left' color='#959595' style={{fontSize:12}}>{feedback.content}</tamaguiStyles.TextBody>
          
        </tamaguiStyles.ColumnContainer>
      </tamaguiStyles.XRecContainer>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <tamaguiStyles.Container justifyContent='flex-start' marginTop='20%'>
        <tamaguiStyles.RowContainer marginBottom='8%'>
          <tamaguiStyles.ColumnContainer width='65%'>
            <tamaguiStyles.TextTitle textAlign='left'>Hello, {userInfo.userType} {userInfo.username}</tamaguiStyles.TextTitle>
            <tamaguiStyles.TextBody width='90%' textAlign='left' color='#959595'>Welcome, we're glad to have you here! Your insights drive our improvements!</tamaguiStyles.TextBody>
          </tamaguiStyles.ColumnContainer>
          <Avatar circular size="$8">
            <Avatar.Image source={require('../../assets/defaultProfile.png')} style={{width: '100%', height: '100%'}}/>
            <Avatar.Fallback bc="grey" />
          </Avatar>
        </tamaguiStyles.RowContainer>
        <tamaguiStyles.RowContainer backgroundColor='white' width='70%' justifyContent='space-between' marginBottom='5%'>
          {userInfo.userType === 'User' ? (
            <>
              <tamaguiStyles.ColumnContainer alignItems='center'>
                <tamaguiStyles.CircularButton icon={ClipboardList} onPress={() => navigation.navigate('Overview')} />
                <tamaguiStyles.TextTitle style={{ fontSize: 14 }}>Overview</tamaguiStyles.TextTitle>
              </tamaguiStyles.ColumnContainer>
              <tamaguiStyles.ColumnContainer alignItems='center'>
                <tamaguiStyles.CircularButton icon={Edit3} onPress={() => navigation.navigate('Feedback')} />
                <tamaguiStyles.TextTitle style={{ fontSize: 14 }}>Feedback</tamaguiStyles.TextTitle>
              </tamaguiStyles.ColumnContainer>
              <tamaguiStyles.ColumnContainer alignItems='center'>
                <tamaguiStyles.CircularButton icon={LogOut} onPress={() => navigation.navigate('SignIn')} />
                <tamaguiStyles.TextTitle style={{ fontSize: 14 }}>Logout</tamaguiStyles.TextTitle>
              </tamaguiStyles.ColumnContainer>
            </>
          ) : userInfo.userType === 'Admin' ? (
            <>
              <tamaguiStyles.ColumnContainer alignItems='center'>
                <tamaguiStyles.CircularButton icon={ClipboardList} onPress={() => navigation.navigate('Overview')} />
                <tamaguiStyles.TextTitle style={{ fontSize: 14 }}>Overview</tamaguiStyles.TextTitle>
              </tamaguiStyles.ColumnContainer>
              <tamaguiStyles.ColumnContainer alignItems='center'>
                <tamaguiStyles.CircularButton icon={BarChart3} onPress={() => navigation.navigate('Dashboard')} />
                <tamaguiStyles.TextTitle style={{ fontSize: 14 }}>Dashboard</tamaguiStyles.TextTitle>
              </tamaguiStyles.ColumnContainer>
              <tamaguiStyles.ColumnContainer alignItems='center'>
                <tamaguiStyles.CircularButton icon={LogOut} onPress={() => navigation.navigate('SignIn')} />
                <tamaguiStyles.TextTitle style={{ fontSize: 14 }}>Logout</tamaguiStyles.TextTitle>
              </tamaguiStyles.ColumnContainer>
            </>
          ) : null}
        </tamaguiStyles.RowContainer>
        <tamaguiStyles.ColumnContainer width='85%' alignItems='flex-start'>
          <tamaguiStyles.TextBody style={{fontSize: 18}}>Most Recent Feedback</tamaguiStyles.TextBody>
          <tamaguiStyles.TextBody textAlign='left' color='#959595' marginBottom='5%'>What do others think about us?</tamaguiStyles.TextBody>
          
          <tamaguiStyles.ColumnContainer height='40%'>
            {recentFeedback.map((feedback: Feedback, index: number) => (
              <RecentFeedbackItem key={index} feedback={feedback} />
            ))}
          </tamaguiStyles.ColumnContainer>
        </tamaguiStyles.ColumnContainer>
      </tamaguiStyles.Container>
    </ScrollView>
  )
}

export default HomeScreen