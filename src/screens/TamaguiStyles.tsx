import { styled, YStack, XStack, Text, Input, Button } from 'tamagui';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const tamaguiStyles = {
  Container: styled(YStack, {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    height:screenHeight,
    marginVertical: 20,
    //backgroundColor: 'pink',
  }),
  RowContainer:styled(XStack,{
    alignItems: 'center',
  }),
  ColumnContainer:styled(YStack,{
  }),
  EmptyContainerY:styled(YStack,{
  }),
  TextBody: styled(Text,{
    fontFamily: '$body',
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  }),
  TextRegular: styled(Text,{
    fontFamily: 'PoppinsRegular',
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  }),
  TextTitle: styled(Text,{
    fontFamily:'PoppinsBold',
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
  }),
  InputField: styled(Input,{
    width: "80%",
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    backgroundColor: '#f0f0f0',
    borderColor: '#f0f0f0',
    placeholderTextColor: '#a7a7a7',
    marginBottom: 20,
  }),
  PrimaryButton: styled(Button,{
    backgroundColor: '#000000',
    color: '#FFFFFF',
    width:'80%',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 700,
  }),
  TextButton: styled(Button,{
    backgroundColor: 'rgba(255, 0, 0, 0)', //transparent
    color: 'green',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '800',
    alignSelf: 'flex-start',
  }),
};