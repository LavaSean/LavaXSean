import { StyleSheet, Text, View, TouchableHighlight, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, XStack, YStack, ZStack, styled, Input, SizeTokens, TextArea } from 'tamagui';
import { Activity, Airplay } from '@tamagui/lucide-icons'
import PrimaryButton from '../components/Buttons/PrimaryButton';

const HomeScreen = () => {
  const navigation = useNavigation();

  const onPressedNavigation = () => {
    navigation.navigate('SignIn');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text>HomeScreennnn</Text>
        <Button style={{ justifyContent: 'center', alignItems: 'center', textAlign:'center', backgroundColor: 'pink',
            borderRadius: 2, borderWidth: 2, borderColor: 'black', fontWeight: 20,
          }} size="$5" onPress={() => console.log('Button clicked')}>
          <Button.Text style={{color:'black'}}>Click MeWWWW</Button.Text>
        </Button>
        <Button style={{alignContent:'center', justifyContent:'center'}} icon={require('@tamagui/lucide-icons').Airplay} size="$10">
          Largee
        </Button>
        <TouchableHighlight><Text style={{ color: 'grey', textAlign: 'center' }}>Hello</Text></TouchableHighlight>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.7 : 1,
            },
            styles.btn,
          ]}
          onPress={onPressedNavigation}>
          <Text style={{color: '#fff'}}>Generate a number</Text>
        </Pressable>
        <Button>Plainn</Button>
        <Button size="$6">Lorem ipsum</Button>
        <YStack
          width={200}
          minHeight={250}
          overflow="hidden"
          space="$2"
          margin="$3"
          padding="$2"
        >
          <InputDemo size="$2" />
          <InputDemo size="$3" />
          <InputDemo size="$4" />
        <TextArea style={{backgroundColor:"white"}}placeholder="Enter your details..." />
      </YStack>
      <PrimaryButton text="Reset Password" onPress={()=> console.log("Primary Button")}/>
      </View>
    </ScrollView>
  )
}

export default HomeScreen

function InputDemo(props: { size: SizeTokens }) {
  return (
    <XStack alignItems="center" space="$2">
      <Input flex={1} size={props.size} placeholder={`Size ${props.size}...`} />
      <Button size={props.size}>Go</Button>
    </XStack>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 8,
    paddingHorizontal: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'aliceblue',
  },
  btn: {
    backgroundColor: '#222',
    padding: 10,
  },
})

const tamaguiStyles = {
  Container: styled(YStack, {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  MyYStack : styled(YStack, {
    backgroundColor:"red",
    borderRadius:"$3",
    padding:6,
    width: '80%',}),
  MainXStack : styled(XStack, {
    borderColor:'black',
    borderWidth: 2,
    borderRadius:2,
    height: "5%",
  })
};