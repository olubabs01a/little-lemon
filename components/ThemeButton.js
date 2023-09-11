import * as React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ThemeButton(props) {
    const navigator = useNavigation();

    const styles = StyleSheet.create({
        loggedIn: {
            textAlign: 'right',
            lineHeight: Platform.OS === 'ios' ? 30 : 60,
            paddingHorizontal: 10,
            fontSize: 15
        }
    });

    return <Pressable
        accessibilityLabel={props.isLoggedIn ? 'Log out' : 'Login'}
        onPress={() => {
            props.isLoggedIn 
                ? props.setLoggedIn(false)
                : navigator.navigate('Login')}
            }>
                <Icon style={{ ...styles.loggedIn, color: props.tintColor }} name={props.isLoggedIn ? 'user-circle' : 'user'}>
                    <Text>
                        {props.isLoggedIn ? " Log Out" : " Login"}
                    </Text>
                </Icon>
        </Pressable>;
};
