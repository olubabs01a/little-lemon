import { StyleSheet, ScrollView, Text, TextInput, useColorScheme, Pressable } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { isValidEmail, isValidPassword } from '../utils/Validate';
import { useNavigation } from '@react-navigation/native';
import { DarkGrey, LemonYellow, LightGrey } from '../utils/Colors';
import { isNullUndefinedOrEmpty } from '../utils/String';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    header: {
        paddingVertical: 20,
        fontSize: 25,
        textAlign: 'center',
        color: 'white',
        flexWrap: 'wrap'
    },
    body: {
        margin: 15,
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    loggedIn: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 50,
        color: 'white'
    },
    formField: {
        paddingVertical: 15,
        margin: 10,
        paddingHorizontal: 10,
        minWidth: 325,
        color: DarkGrey,
        borderRadius: 5,
        borderColor: 'green',
        borderBottomWidth: 2
    },
    submitButton: {
        backgroundColor: LemonYellow, //Coral,
        padding: 10,
        marginVertical: 30,
        minHeight: 40,
        alignItems: 'center',
        minWidth: 100,
        borderRadius: 5
    },
    invalidInput: {
        color: 'red',
        borderColor: 'red',
        borderBottomWidth: 2
    },
    disabledButton: {
        opacity: .6,
        backgroundColor: LightGrey
    },
    submitButtonText: {
        color: 'black',
        fontWeight: '700', 
    }
});

export default function LoginScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasValidInput, setInputValidState] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const colorScheme = useColorScheme();
    const passwordRef = useRef();
    const navigator = useNavigation();

    const resetForm = () => {
        setEmail("");
        setPassword("");
    };

    const validateInput = (emailInput, passwordInput) => {
        setInputValidState(isValidEmail(emailInput) && isValidPassword(passwordInput));
    };

    const renderFormFieldStyle = (isValid) => {
        return colorScheme !== 'light'
            // Handle styling if color scheme is not 'light'
            ? (isValid
                ? { ...styles.formField, color: 'white'}
                : [ styles.formField, styles.invalidInput ])
            // Handle styling if color scheme is 'light'
            : (isValid
                ? { ...styles.formField, color: DarkGrey }
                : [ styles.formField, styles.invalidInput ]);
    };

    useEffect(() => {
        const sub$ = navigator.addListener('focus', () => {
            props.setIsLoginScreen(true);
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount.
        return sub$;
    }, [navigator]);
    
    useEffect(() => {
        const sub$ = navigator.addListener('blur', () => {
            props.setIsLoginScreen(false);
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount.
        return sub$;
    }, [navigator]);

    useEffect(() => {
        resetForm();

        return () => {
            resetForm();
        };
    }, []);

    return (
        <><ScrollView style={[ 
            styles.container, 
            colorScheme !== 'light'
            ? { backgroundColor: DarkGrey, color: 'white' }
            : { backgroundColor: 'white', color: DarkGrey }
        ]}
            indicatorStyle='white'
            contentContainerStyle={{ alignItems: 'center' }} enableOnAndroid={true}
            keyboardDismissMode='interactive' >
            <Text
                style={[ 
                    styles.header, 
                    colorScheme !== 'light' 
                    ? { color: 'white' }
                    : { color: DarkGrey }
                ]}>
                Welcome to Little Lemon
            </Text>
            {isLoggedIn === false
                && (<><Text
                    style={[ 
                        styles.body, 
                        colorScheme !== 'light' 
                        ? { color: 'white' }
                        : { color: DarkGrey }
                    ]}>
                        Login to continue
                </Text>
                <TextInput
                    keyboardType='email-address'
                    placeholderTextColor={
                        isNullUndefinedOrEmpty(email) === false
                            ? styles.formField.color
                            : styles.invalidInput.borderColor
                    }
                    enterKeyHint='next'
                    returnKeyLabel='next'
                    autoCapitalize='none'
                    style={renderFormFieldStyle(isValidEmail(email))}
                    onSubmitEditing={_ => passwordRef.current.focus()}
                    placeholder='Email'
                    inputMode='email'
                    clearButtonMode={'always'} // iOS only
                    value={email}
                    onChangeText={(val) => {
                        setEmail(val);
                        validateInput(val, password);
                    }} />
                <TextInput
                    ref={passwordRef}
                    placeholder='Password (>= 8 characters)'
                    autoCapitalize='none'
                    placeholderTextColor={
                        isNullUndefinedOrEmpty(password) === false
                            ? styles.formField.color
                            : styles.invalidInput.borderColor
                    }
                    enterKeyHint='done'
                    returnKeyLabel='done'
                    secureTextEntry={true}
                    style={renderFormFieldStyle(isValidPassword(password))}
                    value={password}
                    onChangeText={(val) => {
                        setPassword(val);
                        validateInput(email, val);
                    }} />
                <Pressable
                    disabled={!hasValidInput}
                    style={hasValidInput 
                            ? { ...styles.button, ...styles.submitButton }
                            : { ...styles.button, ...styles.submitButton, ...styles.disabledButton }}
                    onPress={_ => {
                        props.setLoggedIn(true);
                        navigator.navigate('Welcome');
                    }}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </Pressable></>
            )}
        </ScrollView>
        </>
    );
}
