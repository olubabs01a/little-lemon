import React from 'react';
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import { DarkGrey } from '../utils/Colors';

const Welcome = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
      <Image
        resizeMode='contain'
        style={styles.logo}
        accessible={true}
        accessibilityLabel={'Little Lemon logo'}
        source={require('../img/littleLemonLogo.png')} />
      <Text style={styles.title}>
        Little Lemon, your local Mediterranean Bistro
      </Text>
      <Image
        style={styles.image}
        source={require('../img/Picture1.png')}
        resizeMode="cover"
        accessible={true}
        accessibilityLabel={'Food Picture 1'}
      />
      <Image
        style={styles.image}
        source={require('../img/Picture2.png')}
        resizeMode="cover"
        accessible={true}
        accessibilityLabel={'Food Picture 2'}
      />
      <Image
        style={styles.image}
        source={require('../img/Picture3.png')}
        resizeMode="cover"
        accessible={true}
        accessibilityLabel={'Food Picture 3'}
      />
      <Image
        style={styles.image}
        source={require('../img/Picture4.png')}
        resizeMode="cover"
        accessible={true}
        accessibilityLabel={'Food Picture 4'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    logo: {
      height: 100,
      width: 300,
    },
    image: {
      width: 300,
      height: 250,
      borderRadius: 10,
      margin: 5
    },
    container: {
      flex: 1,
      padding: 20,
      marginVertical: 25,
      backgroundColor: 'white',
    },
  
    title: {
      marginVertical: 15,
      paddingVertical: 10,
      color: DarkGrey,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

export default Welcome;