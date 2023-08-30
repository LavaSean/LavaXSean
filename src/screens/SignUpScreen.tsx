import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { tamaguiStyles } from './TamaguiStyles'
import TertiaryButton from '../components/Buttons/TertiaryButton';
import { Picker } from '@react-native-picker/picker';
import { auth, db } from '../../firebase';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [userType, setUserType] = useState('User');

  const SignInNavigation = () => {
    navigation.navigate('SignIn');
  };

  const isValidEmail = (email: string) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password: string) => {
    // Regular expression pattern for password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordPattern.test(password);
  };

  const onRegisterPressed = () => {
    if (!username || !email || !password || !passwordRepeat) {
      Alert.alert(
        'Error',
        'Please fill out all the fields',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    } else if (!isValidEmail(email)) {
      Alert.alert(
        'Error',
        'Please enter a valid email address',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    } else if (!isValidPassword(password)) {
      Alert.alert(
        'Error',
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least six characters long',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    } else if (password !== passwordRepeat) {
      Alert.alert(
        'Error',
        'Passwords do not match',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    } else {
      handleSignUp();
    }
  };

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        Alert.alert(
          'Registration successful',
          `You have successfully registered an account with the email: ${user.email}`,
          [
            {
              text: 'OK',
              onPress: async () => {
                // Add user data to Firestore
                const userRef = db.collection('users').doc(user.uid);
                await userRef.set({
                  email: user.email,
                  username: username,
                  userType: userType,
                  // Add any additional user data you want to store
                });
                navigation.navigate('SignIn');
              },
            },
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
        Alert.alert('Error', error.message, [{ text: 'OK' }], {
          cancelable: false,
        });
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <tamaguiStyles.Container>
            <tamaguiStyles.TextTitle style={{
                fontSize: 32,
            }}>
                Create an account
            </tamaguiStyles.TextTitle>
            <tamaguiStyles.TextBody style={{
                color:'#9e9e9e',
                paddingHorizontal: '15%'
            }}>
                Begin your journey by setting up your personal account!
            </tamaguiStyles.TextBody>
            <tamaguiStyles.EmptyContainerY height='3%'/>
            <tamaguiStyles.TextTitle style={{fontSize:14, alignSelf:'flex-start'}} paddingHorizontal='10%'>Username</tamaguiStyles.TextTitle>
            <tamaguiStyles.InputField 
                placeholder='Please enter your username'
                value={username}
                onChangeText={setUsername}
            />
            <tamaguiStyles.TextTitle style={{fontSize:14, alignSelf:'flex-start'}} paddingHorizontal='10%'>Email</tamaguiStyles.TextTitle>
            <tamaguiStyles.InputField 
                placeholder='Please enter your email'
                value={email}
                onChangeText={setEmail}
            />
            <tamaguiStyles.TextTitle style={{fontSize:14, alignSelf:'flex-start'}} paddingHorizontal='10%'>Password</tamaguiStyles.TextTitle>
            <tamaguiStyles.InputField 
                placeholder='Please enter your password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <tamaguiStyles.TextTitle style={{fontSize:14, alignSelf:'flex-start'}} paddingHorizontal='10%'>Repeat Password</tamaguiStyles.TextTitle>
            <tamaguiStyles.InputField 
                placeholder='Please repeat your password'
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
                secureTextEntry={true}
            />
            <tamaguiStyles.TextTitle style={{fontSize:14, alignSelf:'flex-start'}} paddingHorizontal='10%'>User Type</tamaguiStyles.TextTitle>
            <tamaguiStyles.InputPicker>
              <Picker
                selectedValue={userType}
                onValueChange={(itemValue) => setUserType(itemValue)}
                style={tamaguiStyles.picker}
              >
                <Picker.Item label="User" value="User" style={tamaguiStyles.pickerItemLabel}/>
                <Picker.Item label="Admin" value="Admin" style={tamaguiStyles.pickerItemLabel}/>
              </Picker>
            </tamaguiStyles.InputPicker>
            <tamaguiStyles.PrimaryButton onPress={onRegisterPressed}>Register</tamaguiStyles.PrimaryButton>
            <tamaguiStyles.RowContainer>
                <tamaguiStyles.TextBody>Already have an account?</tamaguiStyles.TextBody>
                <TertiaryButton
                    text="Sign In Now"
                    onPress={SignInNavigation}
                    alignItems='flex-start'
                    textColor='#959595'
                    textPressedColor='#3e3e3e'
                />
            </tamaguiStyles.RowContainer>           
           
        </tamaguiStyles.Container>
    </ScrollView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({})