import { styled, YStack, XStack, Text, Input, Button, TextArea } from 'tamagui';
import { Dimensions, TouchableOpacity } from 'react-native';

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
    fontSize: 14,
    color: 'black',
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
    height:45,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    backgroundColor: '#f0f0f0',
    borderColor: '#f0f0f0',
    placeholderTextColor: '#a7a7a7',
    marginBottom: 20,
  }),
  InputPicker: styled(XStack,{
    width: "80%",
    height: "6%",
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderColor: '#f0f0f0',
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
  CircularButton: styled(Button,{
    borderRadius: 100,
    width: 50,
    height: 50,
    backgroundColor:'#f0f0f0',
    color:'black',
  }),
  ModalContainer:styled(YStack,{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }),
  ModalContent:styled(YStack,{
    width:'80%',
    paddingVertical: '5%',
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
  }),
  TextButton: styled(Button,{
    backgroundColor: 'rgba(255, 0, 0, 0)', //transparent
    color: 'green',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '800',
    alignSelf: 'flex-start',
  }),
  TextArea: styled(TextArea,{
    backgroundColor: 'white',
    width: '100%',
    minHeight: '25%',
    textAlignVertical:"top",
    borderColor: '#CCCCCC',
    placeholderTextColor: '#959595',
    color: 'black',
  }),

  //CSS
  picker: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold', 
    color:'black',
  },
  pickerItemLabel: {
    fontSize: 14,
    color:'black',
    fontWeight: 'bold',
  },
};