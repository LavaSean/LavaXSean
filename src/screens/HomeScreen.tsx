import { StyleSheet, Text, View, TouchableHighlight, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, XStack, YStack, ZStack, styled } from 'tamagui';
import { Activity, Airplay } from '@tamagui/lucide-icons'

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
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
        onPress={()=> console.log('Pressableee!')}>
        <Text style={{color: '#fff'}}>Generate a number</Text>
      </Pressable>
      <Button>Plainn</Button>
      <Button size="$6">Lorem ipsum</Button>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 8,
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