import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { tamaguiStyles } from './TamaguiStyles'
import { Plus } from '@tamagui/lucide-icons'

const FeedbackScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <tamaguiStyles.Container>
            <tamaguiStyles.CircularButton icon={Plus} onPress={()=>navigation.navigate('AddFeedback')}/>
        
            <Text>AddFeedbackScreen</Text>
        
        </tamaguiStyles.Container>
    </ScrollView>
  )
}

export default FeedbackScreen

const styles = StyleSheet.create({})