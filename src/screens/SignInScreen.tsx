import { StyleSheet, ScrollView, Alert, Animated, Modal, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { tamaguiStyles } from './TamaguiStyles'
import TertiaryButton from '../components/Buttons/TertiaryButton';
import { auth, db } from '../../firebase';

const SignInScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [showResetModal, setShowResetModal] = useState(false);
    const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);
    const [isLoadingReset, setIsLoadingReset] = useState(false);
    const slideAnimation = useRef(new Animated.Value(0)).current;

    const SignUpNavigation = () => {
        navigation.navigate('SignUp');
      };

    const isValidEmail = (email: string) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const handleSignIn = () => {
        setIsLoadingSignIn(true);
        auth
          .signInWithEmailAndPassword(email, password)
          .then(async (userCredential) => {
            setIsLoadingSignIn(false);
            // Signed in successfully, get user data
            const user = userCredential.user;
      
            // Retrieve the user document from Firestore
            const userDoc = await db.collection('users').doc(user.uid).get();
      
            if (userDoc.exists) {
              // Get the userType field from the document data
              const userType = userDoc.data().userType;
      
              Alert.alert(
                'Welcome',
                `You have successfully signed in to your account.`,
                [{ text: 'OK' }],
                { cancelable: false }
              );
      
              // Check the userType and navigate accordingly
              if (userType === 'User') {
                navigation.navigate('Home');
              } else if (userType === 'Admin') {
                navigation.navigate('Home');
              }
            } else {
              // User document does not exist
              Alert.alert('Error', 'User document not found', [{ text: 'OK' }]);
            }
          })
          .catch((error) => {
            setIsLoadingSignIn(false);
            Alert.alert('Error', 'User account not found!\nPlease verify your email and password.', [{ text: 'OK' }], { cancelable: false });
          });
      };

      const handleResetPassword = async () => {
        setIsLoadingReset(true);
        if (!isValidEmail(resetEmail)) {
          setIsLoadingReset(false);
          Alert.alert('Error', 'Please enter a valid email', [{ text: 'OK' }]);
          return;
        }
      
        try {
          // Check if the email exists in Firebase
          const userSnapshot = await db.collection('users').where('email', '==', resetEmail).get();
          if (userSnapshot.empty) {
            Alert.alert('Error', 'User with this email does not exist', [{ text: 'OK' }]);
            return;
          }
      
          // Send password reset email
          await auth.sendPasswordResetEmail(resetEmail);
          Alert.alert(
            'Password Reset Email Sent',
            'Please check your email to reset your password.',
            [{ text: 'OK' }],
            { cancelable: false }
          );
          setShowResetModal(false);
          setIsLoadingReset(false);
        } catch (error) {
          setIsLoadingReset(false);
          Alert.alert('Error', error.message, [{ text: 'OK' }], { cancelable: false });
        }
      };
      

      const onForgotPasswordPressed = () => {
        setShowResetModal(true);
      }

      const closeResetModal = () => {
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(() => {
          setShowResetModal(false);
        });
      };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <tamaguiStyles.Container>
            <tamaguiStyles.TextTitle style={{
                fontSize: 40,
            }}>
                Welcome!
            </tamaguiStyles.TextTitle>
            <tamaguiStyles.TextBody style={{
                color:'#9e9e9e',
                paddingHorizontal: '15%'
            }}>
                Connect, contribute, and make an impact with your valued insights.
            </tamaguiStyles.TextBody>
            <tamaguiStyles.EmptyContainerY height='10%'/>
            <tamaguiStyles.TextTitle style={{fontSize:14, alignSelf:'flex-start'}} paddingHorizontal='10%'>Email</tamaguiStyles.TextTitle>
            <tamaguiStyles.InputField 
                placeholder='Please enter your email'
                value={email}
                onChangeText={setEmail}
            />
            <tamaguiStyles.TextTitle style={{fontSize:14, alignSelf:'flex-start'}} paddingHorizontal='10%'>Password</tamaguiStyles.TextTitle>
            <tamaguiStyles.InputField 
                marginBottom='2%'
                placeholder='Please enter your password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <tamaguiStyles.RowContainer width='100%' paddingLeft='10%' marginBottom='2%'>
                <TertiaryButton
                    text="Forgot Password?"
                    onPress={onForgotPasswordPressed}
                    alignItems='flex-start'
                    textColor='#959595'
                    textPressedColor='#3e3e3e'
                />
            </tamaguiStyles.RowContainer>
            <tamaguiStyles.PrimaryButton onPress={handleSignIn}>
              {isLoadingSignIn ? (
                <ActivityIndicator color="white" /> // Show the loading spinner
                ) : (
                'Login'
              )}
            </tamaguiStyles.PrimaryButton>
            <tamaguiStyles.RowContainer>
                <tamaguiStyles.TextBody>Don't have an account?</tamaguiStyles.TextBody>
                <TertiaryButton
                    text="Sign Up Now"
                    onPress={SignUpNavigation}
                    alignItems='flex-start'
                    textColor='#959595'
                    textPressedColor='#3e3e3e'
                />
            </tamaguiStyles.RowContainer>
            <Modal visible={showResetModal} animationType="slide" transparent>
                <tamaguiStyles.ModalContainer>
                    <tamaguiStyles.ModalContent>
                        <tamaguiStyles.TextTitle marginBottom='5%'>Reset Password</tamaguiStyles.TextTitle>
                        <tamaguiStyles.TextTitle style={{fontSize:14, alignSelf:'flex-start'}} paddingHorizontal='10%'>Email</tamaguiStyles.TextTitle>
                        <tamaguiStyles.InputField
                            placeholder="Please enter your email"
                            value={resetEmail}
                            onChangeText={setResetEmail}
                        />
                        
                        <tamaguiStyles.PrimaryButton onPress={handleResetPassword}>
                        {isLoadingReset ? (
                          <ActivityIndicator color="white" /> // Show the loading spinner
                        ) : (
                          'Reset Password'
                        )}
                        </tamaguiStyles.PrimaryButton>
                        <TertiaryButton
                            text="Cancel"
                            onPress={closeResetModal}
                            alignItems='flex-start'
                            textColor='#959595'
                            textPressedColor='#3e3e3e'
                        />
                    </tamaguiStyles.ModalContent>
                </tamaguiStyles.ModalContainer>
                
            </Modal>
        </tamaguiStyles.Container>
    </ScrollView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  modalText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#3e3e3e',
    padding: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
  },
});