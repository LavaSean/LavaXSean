import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { tamaguiStyles } from './TamaguiStyles'
import TertiaryButton from '../components/Buttons/TertiaryButton';
import { Picker } from '@react-native-picker/picker';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState('User');

  const SignInNavigation = () => {
    navigation.navigate('SignIn');
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
            />
            <tamaguiStyles.TextTitle style={{fontSize:14, alignSelf:'flex-start'}} paddingHorizontal='10%'>Email</tamaguiStyles.TextTitle>
            <tamaguiStyles.InputField 
                placeholder='Please enter your email'
            />
            <tamaguiStyles.TextTitle style={{fontSize:14, alignSelf:'flex-start'}} paddingHorizontal='10%'>Password</tamaguiStyles.TextTitle>
            <tamaguiStyles.InputField 
                placeholder='Please enter your password'
            />
            <tamaguiStyles.TextTitle style={{fontSize:14, alignSelf:'flex-start'}} paddingHorizontal='10%'>Repeat Password</tamaguiStyles.TextTitle>
            <tamaguiStyles.InputField 
                placeholder='Please repeat your password'
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
            <tamaguiStyles.PrimaryButton>Register</tamaguiStyles.PrimaryButton>
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