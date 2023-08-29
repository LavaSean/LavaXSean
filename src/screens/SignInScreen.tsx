import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { tamaguiStyles } from './TamaguiStyles'
import { XStack, Button } from 'tamagui'
import TertiaryButton from '../components/Buttons/TertiaryButton';

const SignInScreen = () => {
    const navigation = useNavigation();

    const SignUpNavigation = () => {
        navigation.navigate('SignUp');
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
            <tamaguiStyles.InputField 
                placeholder='Please enter your email'
            />
            <tamaguiStyles.InputField 
                marginBottom='2%'
                placeholder='Please enter your password'
            />
            <tamaguiStyles.RowContainer width='100%' paddingLeft='10%' marginBottom='2%'>
                <TertiaryButton
                    text="Forgot Password?"
                    onPress={()=>{}}
                    alignItems='flex-start'
                    textColor='#959595'
                    textPressedColor='#3e3e3e'
                />
            </tamaguiStyles.RowContainer>
            <tamaguiStyles.PrimaryButton>Login</tamaguiStyles.PrimaryButton>
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
            <Button onPress={()=>navigation.navigate('Home')}>To Home</Button>
        </tamaguiStyles.Container>
    </ScrollView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({})