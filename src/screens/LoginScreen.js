import {StyleSheet, Text, View, ImageBackground, Alert} from 'react-native';
import React, {useState, useContext} from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const LoginScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../assets/Fairways.jpg')}>
        <View style={styles.topView}>
          <Text style={styles.text}>FAIRWAYS</Text>
          <Text style={styles.text}>APPLICATION</Text>
        </View>
        <View style={styles.bottomView}>
          <CustomInput
            placeholder="user"
            onChangeText={text => setUserName(text)}
          />
          <CustomInput
            placeholder="password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
          <CustomButton
            buttonTitle="LOGIN"
            onPress={() => {
              if (userName != '' || password != '') {
                navigation.navigate('Home');
                console.log('if login pressed');
              } else {
                Alert.alert('Please input your password or email');
                console.log('else login pressed');
              }
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  topView: {flex: 1},
  text: {fontSize: 40, fontWeight: '800', textAlign: 'center'},
  bottomView: {flex: 2},
  container: {
    flex: 1,

    backgroundColor: 'transparent',
    alignContent: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
  },
});
