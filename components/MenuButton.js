import * as React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MenuButton (props) {
    const navigator = useNavigation();

    const styles = StyleSheet.create({
        loggedIn: {
            textAlign: 'right',
            lineHeight: Platform.OS === 'ios' ? 30 : 60,
            paddingHorizontal: 10,
            fontSize: 16
        }
    });

    return <Pressable
        accessibilityLabel={'Menu Items'}
        onPress={() => {
            navigator.getId() !== 'RightDrawer'
                ? (navigator.getParent('RightDrawer')).navigate('MenuItems')
                : navigator.navigate('MenuItems')
            }}>
                <Icon style={{ ...styles.loggedIn, color: props.tintColor }} name={'cutlery'}>
                    <Text>
                        {' Menu'}
                    </Text>
                </Icon>
        </Pressable>;
};
