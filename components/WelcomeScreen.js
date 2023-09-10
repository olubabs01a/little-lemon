import { StyleSheet, Pressable, View, Text, Image } from 'react-native';
import { LemonYellow } from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        margin: 5
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
    submitButton: {
        backgroundColor: LemonYellow, //Coral,
        padding: 10,
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

export default function WelcomeScreen(props) {
    const navigator = useNavigation();

    return (
        <><View style={styles.container} indicatorStyle='white'>
            <View style={styles.headerWrapper}>
                <Image
                    accessible={true}
                    accessibilityLabel='Little Lemon Logo'
                    resizeMode='cover' style={styles.logo} source={require('../img/lemonLogo.png')} />
                <Text
                    style={styles.header}>
                    Little Lemon
                </Text>
            </View>
            <Text
                style={styles.body}>
                    Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment. We would love to hear more about your experience with us!
            </Text>
            <Pressable style={{ ...styles.button, ...styles.submitButton }} onPress={_ => navigator.getParent('RightDrawer').openDrawer()}>
                <Text style={styles.submitButtonText}>
                    View Menu
                </Text>
            </Pressable>
        </View>
        </>
  );
}
