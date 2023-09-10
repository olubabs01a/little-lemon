import { StyleSheet, Pressable, View, Text, Image, useColorScheme } from 'react-native';
import { LemonYellow, DarkGrey } from '../utils/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomDrawerSelection } from './types';
import { useEffect } from 'react';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 20,
        backgroundColor: 'white'
    },
    logo: {
        marginVertical: 10,
        width: 120,
        height: 100,
        borderRadius: 10
    },
    headerWrapper: {
        paddingTop: 15,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    header: {
        fontSize: 30,
        flexWrap: 'wrap',
        paddingLeft: 15,
        paddingVertical: 35,
    },
    body: {
        padding: 10,
        margin: 10,
        fontSize: 20,
        textAlign: 'center',
    },
    image: {
        alignSelf: 'center',
        width: 300,
        height: 250,
        borderRadius: 10,
        margin: 5
    },
    submitButton: {
        backgroundColor: LemonYellow, //Coral,
        padding: 10,
        marginVertical: 20,
        marginHorizontal: 10,
        minHeight: 40,
        alignSelf: "center",
        maxWidth: 125,
        borderRadius: 5
    },
    submitButtonText: {
        color: 'black',
        fontWeight: '700'
    }
});

export default function WelcomeScreen (props) {
    const colorScheme = useColorScheme();

    useEffect(() => {
        props.setCustomDrawerSelection(CustomDrawerSelection.None);
    }, []);

    return (
        <><ScrollView style={[
            styles.container,
            colorScheme !== 'light'
                ? { backgroundColor: DarkGrey, color: 'white' }
                : { backgroundColor: 'white', color: DarkGrey }
        ]} indicatorStyle='white'>
            <View style={styles.headerWrapper}>
                <Image
                    accessible={true}
                    accessibilityLabel='Little Lemon Logo'
                    resizeMode='cover' style={styles.logo} source={require('../img/lemonLogo.png')} />
                <Text
                    style={[styles.header,
                        colorScheme !== 'light'
                        ? { color: 'white' }
                        : { color: DarkGrey }
                    ]}>
                    Little Lemon
                </Text>
            </View>
            <Text
                style={[
                    styles.body,
                    colorScheme !== 'light'
                        ? { color: 'white' }
                        : { color: DarkGrey }
                    ]}>
                    Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment. We would love to hear more about your experience with us!
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
            <Pressable style={{ ...styles.button, ...styles.submitButton }} onPress={_ => props.navigation.getParent('RightDrawer').openDrawer()}>
                <Text style={styles.submitButtonText}>
                    View Menu
                </Text>
            </Pressable>
        </ScrollView>
        </>
    );
}
