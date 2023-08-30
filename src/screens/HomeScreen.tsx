import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { tamaguiStyles } from './TamaguiStyles'
import { Avatar, Button } from 'tamagui'
import { Activity, Airplay } from '@tamagui/lucide-icons'

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <tamaguiStyles.Container>
        <tamaguiStyles.RowContainer>
          <tamaguiStyles.ColumnContainer>
            <tamaguiStyles.TextTitle>Hello, Sean</tamaguiStyles.TextTitle>
            <tamaguiStyles.TextBody>Let's check out</tamaguiStyles.TextBody>
          </tamaguiStyles.ColumnContainer>
          <Avatar circular size="$6">
            <Avatar.Image source={require('../../assets/defaultProfile.png')} style={{width: '100%', height: '100%'}}/>
            <Avatar.Fallback bc="grey" />
          </Avatar>
        </tamaguiStyles.RowContainer>
        <tamaguiStyles.RowContainer backgroundColor='white' width='70%' justifyContent='space-between'>
          <tamaguiStyles.ColumnContainer alignItems='center'>
            <Button circular backgroundColor='grey' color='black' icon={Airplay} onPress={()=>navigation.navigate('Feedback')}></Button>
            <tamaguiStyles.TextTitle style={{fontSize: 14}}>Feedback</tamaguiStyles.TextTitle>
          </tamaguiStyles.ColumnContainer>
          <tamaguiStyles.ColumnContainer alignItems='center'>
            <Button circular backgroundColor='grey' color='black' icon={Airplay} onPress={()=>navigation.navigate('Dashboard')}></Button>
            <tamaguiStyles.TextTitle style={{fontSize: 14}}>Dashboard</tamaguiStyles.TextTitle>
          </tamaguiStyles.ColumnContainer>
          <tamaguiStyles.ColumnContainer alignItems='center'>
            <Button circular backgroundColor='grey' color='black' icon={Airplay} onPress={()=>navigation.navigate('SignIn')}></Button>
            <tamaguiStyles.TextTitle style={{fontSize: 14}}>Logout</tamaguiStyles.TextTitle>
          </tamaguiStyles.ColumnContainer>
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