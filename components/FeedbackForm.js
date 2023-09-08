import { useNavigation } from '@react-navigation/native';
import { StyleSheet, useColorScheme, Text, TextInput, Alert, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useEffect, useRef, useState } from 'react';
import { isValidEmail, isValidPhone } from '../utils/Validate';
import { isNullUndefinedOrEmpty, maskPhoneNumber } from '../utils/String';
import { DarkGrey, LemonYellow, LightGrey } from '../utils/Colors';

// KeyboardAvoidingComponent is good for not wanting users to scroll, otherwise use KeyboardAwareScrollView

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginHorizontal: 5,
    },
    header: {
        padding: 15,
        fontSize: 25,
        textAlign: 'center',
        flexWrap: 'wrap'
    },
    subtitle: {
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: '500',
        color: LemonYellow,
        textAlign: 'center',
        flexWrap: 'wrap'
    },
    body: {
        padding: 10,
        margin: 15,
        fontSize: 18,
        textAlign: 'center',
    },
    formField: {
        padding: 15,
        margin: 10,
        minWidth: 350,
        color: DarkGrey,
        borderColor: 'green',
        borderBottomWidth: 2
    },
    message: {
        minHeight: 100,
        maxWidth: 350
    },
    submitButton: {
        backgroundColor: LemonYellow, //Coral,
        padding: 10,
        marginVertical: 30,
        marginHorizontal: 10,
        minHeight: 40,
        alignItems: 'center',
        maxWidth: 100,
        borderRadius: 5
    },
    submitButtonText: {
        color: 'black',
        fontWeight: '700', 
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
});

export default function FeedbackForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [hasValidInput, setInputValidState] = useState(false);
    const colorScheme = useColorScheme();
    const navigator = useNavigation();
    const PhoneInputComponent = PhoneInput.default ? PhoneInput.default : PhoneInput;

    const refs = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),
    ];
    
    const showAlert = () =>
        Alert.alert('Submit Feedback', 'Send feedback to Little Lemon?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => {
                //TODO: Send message somewhere, then reset
                //resetForm();
                setTimeout(() => resetForm(), 1800);
                Alert.alert('Little Lemon', 'Thank you for your feedback! Send another message?', [
                    { text: 'No', onPress: () => navigator.navigate('Welcome') },
                    { text: 'Yes' }
                ]);
            }}
        ],
        {
            cancelable: true
        });

    const resetForm = () => {
        setInputValidState(false);
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setMessage("");
    };

    const validateInput = (fName, lName, phoneNum, emailAdd, msg) => {
        setInputValidState(
            isNullUndefinedOrEmpty(fName) === false &&
            isNullUndefinedOrEmpty(lName) === false &&
            isValidPhone(phoneNum) && 
            isValidEmail(emailAdd) &&
            isNullUndefinedOrEmpty(msg) === false
        );
    };

    const renderFormFieldStyle = (isValid) => {
        return colorScheme !== 'light'
            // Handle styling if color scheme is not 'light'
            ? (isValid
                ? styles.formField
                : [{ ...styles.formField, ...styles.invalidInput }])
            // Handle styling if color scheme is 'light'
            : (isValid
                ? styles.formField
                : [{ ...styles.formField, ...styles.invalidInput }]);
    };

    useEffect(() => {
        resetForm();

        return () => {
            resetForm();
        };
    }, []);

    return (
        <><KeyboardAwareScrollView 
            style={[ 
                styles.container, 
                colorScheme !== 'light'
                ? { backgroundColor: DarkGrey }
                : { backgroundColor: 'white' }
            ]}
            indicatorStyle='white'
            contentContainerStyle={{alignItems: 'center'}}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            keyboardDismissMode='interactive' >
            <Text
                style={styles.header}>
                How was your visit to Little Lemon?
            </Text>
            <Text
                style={styles.subtitle}>
                A Lemon for your thoughts...
            </Text>
            <Text
                style={styles.body}>
                    Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment. We would love to hear more about your experience with us!
            </Text>
            <TextInput
                autoCapitalize='words'
                placeholder='First Name'
                placeholderTextColor={
                    isNullUndefinedOrEmpty(firstName) === false
                        ? styles.formField.color
                        : styles.invalidInput.borderColor
                }
                enterKeyHint='next'
                returnKeyLabel='next'
                onSubmitEditing={_ => {refs[0].current.focus(); }}
                selectionColor={isNullUndefinedOrEmpty(firstName) === false ? styles.formField.color : styles.invalidInput.color }
                style={renderFormFieldStyle(isNullUndefinedOrEmpty(firstName) === false)}
                value={firstName}
                clearButtonMode={'always'} // iOS only
                onChangeText={val => {
                    setFirstName(val);
                    validateInput(val, lastName, phone, email, message);
                }} />
            <TextInput
                ref={refs[0]}
                autoCapitalize='words'
                placeholder='Last Name'
                placeholderTextColor={
                    isNullUndefinedOrEmpty(lastName) === false
                        ? styles.formField.color
                        : styles.invalidInput.borderColor
                }
                enterKeyHint='next'
                returnKeyLabel='next'
                onSubmitEditing={_ => {refs[1].current.focus(); }}
                style={renderFormFieldStyle(isNullUndefinedOrEmpty(lastName) === false)}
                value={lastName}
                selectionColor={isNullUndefinedOrEmpty(lastName) === false ? styles.formField.color : styles.invalidInput.color }
                clearButtonMode={'always'} // iOS only
                onChangeText={val => {
                    setLastName(val);
                    validateInput(firstName, val, phone, email, message);
                }} />
            <TextInput
                ref={refs[1]}
                keyboardType='numeric'
                placeholderTextColor={
                    isValidPhone(phone)
                        ? styles.formField.color
                        : styles.invalidInput.borderColor
                }
                enterKeyHint='done' // 'next' won't work, there is a bug
                returnKeyLabel='done'
                onSubmitEditing={_ => {refs[2].current.focus(); }}
                style={renderFormFieldStyle(isValidPhone(phone))}
                placeholder='Phone'
                inputMode='tel'
                selectionColor={isValidPhone(phone) ? styles.formField.color : styles.invalidInput.color }
                clearButtonMode={'always'} // iOS only
                value={phone}
                onChangeText={val => {
                    setPhone(maskPhoneNumber(val));
                    validateInput(firstName, lastName, val, email, message);
                }} />
            <TextInput
                ref={refs[2]}
                keyboardType='email-address'
                autoCapitalize='none'
                placeholderTextColor={
                    isValidEmail(email)
                        ? styles.formField.color
                        : styles.invalidInput.color
                }
                enterKeyHint='next'
                returnKeyLabel='next'
                selectionColor={isValidEmail(email) ? styles.formField.color : styles.invalidInput.color }
                style={renderFormFieldStyle(isValidEmail(email))}
                onSubmitEditing={_ => {refs[3].current.focus(); }}
                placeholder='Email'
                inputMode='email'
                clearButtonMode={'always'} // iOS only
                value={email}
                onChangeText={val => {
                    setEmail(val);
                    validateInput(firstName, lastName, phone, val, message);
                }} />
            <TextInput
                ref={refs[3]}
                autoCapitalize='sentences'
                placeholder='Message'
                enterKeyHint='done'
                returnKeyLabel='done'
                inputMode='text'
                placeholderTextColor={
                    isNullUndefinedOrEmpty(message) === false
                        ? styles.formField.color
                        : styles.invalidInput.borderColor
                }
                selectionColor={isNullUndefinedOrEmpty(message) === false ? styles.formField.color : styles.invalidInput.color }
                style={[renderFormFieldStyle(isNullUndefinedOrEmpty(message) === false), styles.message]}
                value={message}
                multiline={true}
                onChangeText={val => {
                    setMessage(val);
                    validateInput(firstName, lastName, phone, email, val);
                }} />
            <Pressable
                disabled={!hasValidInput}
                style={hasValidInput 
                    ? { ...styles.button, ...styles.submitButton }
                    : { ...styles.button, ...styles.submitButton, ...styles.disabledButton }}
                onPress={showAlert}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
        </KeyboardAwareScrollView>
        </>
    );
}
