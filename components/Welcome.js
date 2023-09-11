import React, { useContext, useEffect } from 'react';
import { Image, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { DarkGrey, LemonYellow } from '../utils/Colors';
import { CustomDrawerSelection } from './types';
import ThemeContext from '../context/ThemeContext';

const Welcome = (props) => {
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    props.setCustomDrawerSelection(CustomDrawerSelection.None);
  }, []);

  return (
    <ScrollView 
      style={[ styles.container, 
        theme !== 'light'
          ? { backgroundColor: DarkGrey, color: 'white' }
          : { backgroundColor: 'white', color: DarkGrey }
    ]} 
      contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
      <Image
        resizeMode='contain'
        style={styles.logo}
        accessible={true}
        accessibilityLabel={'Little Lemon logo'}
        source={require('../assets/little-lemon-logo.png')} />
      <Text style={[styles.title, 
                    theme !== 'light'
                      ? { color: 'white' }
                      : { color: DarkGrey }
      ]}>
        Little Lemon, your local Mediterranean Bistro
      </Text>
      <Pressable
        style={{ ...styles.button, ...styles.subscribeButton }}
        onPress={_ => { 
          props.setCustomDrawerSelection(CustomDrawerSelection.Subscribe);
          props.navigation.navigate('Subscribe');
      }}>
        <Text style={styles.subscribeButtonText}>Newsletter</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: 'white'
    },
    logo: {
      height: 250,
      width: 250,
      resizeMode: 'contain'
    },
    subscribeButton: {
      backgroundColor: LemonYellow,
      padding: 10,
      marginTop: 100,
      minHeight: 40,
      alignItems: 'center',
      width: '100%',
      borderRadius: 5
    },
    subscribeButtonText: {
      color: 'black',
      fontWeight: '700', 
    },
    title: {
      marginVertical: 15,
      paddingVertical: 10,
      color: DarkGrey,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    }
  });

export default Welcome;