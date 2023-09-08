import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Coral } from '../utils/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Coral //LemonYellow
  },
  body: {
    paddingTop: 30,
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  loggedIn: {
    textAlign: 'right',
    paddingHorizontal: 10,
    fontSize: 15
  }
});

export default function LittleLemonHeader(props) {
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text style={styles.body}>
        Little Lemon
      </Text>
      <Pressable onPress={() => {
        props.isLoggedIn 
          ? props.setLoggedIn(false)
          : navigator.navigate('Login')}}>
        <Icon style={styles.loggedIn} name={props.isLoggedIn ? 'user-circle' : 'user'}>
          <Text>
            {props.isLoggedIn ? " Log Out" : " Login"}
          </Text>
        </Icon>
      </Pressable>
    </View>
  );
}