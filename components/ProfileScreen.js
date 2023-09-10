import { StyleSheet, Text, TextInput, useColorScheme, Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useEffect, useRef, useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone, validMaskedPhoneLength } from '../utils/Validate';
import { isNullUndefinedOrEmpty, maskPhoneNumber } from '../utils/String';
import { DarkGrey, LemonYellow, LightGrey } from '../utils/Colors';

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
    subtitle: {
        fontSize: 18,
        fontStyle: 'italic',
        color: LemonYellow,
        textAlign: 'center',
        flexWrap: 'wrap'
    },
    body: {
        margin: 15,
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    formField: {
        padding: 15,
        margin: 10,
        minWidth: 350,
        color: DarkGrey,
        borderColor: 'green',
        borderBottomWidth: 2
    },
    submitButton: {
        backgroundColor: LemonYellow, //Coral,
        padding: 10,
        marginVertical: 30,
        minHeight: 40,
        alignItems: 'center',
        alignSelf: 'center',
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

export default function ProfileScreen(props) {
    const [firstName, setFirstName] = useState("Gregory");
    const [lastName, setLastName] = useState("Jones");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, updatePassword] = useState("abcdefgh123!");
    const [newPassword, setNewPassword] = useState("");
    const [hasValidInput, setInputValidState] = useState(false);

    const colorScheme = useColorScheme();
    const refs = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef
    ];

    const updateProfile = () => {
        updatePassword(newPassword);
        resetForm();
    };

    const resetForm = () => {
        setNewPassword("");
    };

    const renderFormFieldStyle = (isValid) => {
        return colorScheme !== 'light'
            // Handle styling if color scheme is not 'light'
            ? (isValid
                ? { ...styles.formField, color: 'white'}
                : [{ ...styles.formField, ...styles.invalidInput }])
            // Handle styling if color scheme is 'light'
            : (isValid
                ? { ...styles.formField, color: DarkGrey }
                : [{ ...styles.formField, ...styles.invalidInput }]);
    };

    const isValidNewPassword = (passwordVal) => isValidPassword(passwordVal) && oldPassword !== passwordVal;

    const validateInput = (fName, lName, phoneNum, emailAdd, pwd) => {
        setInputValidState(
            isNullUndefinedOrEmpty(fName) === false &&
            isNullUndefinedOrEmpty(lName) === false &&
            isValidPhone(phoneNum) && 
            isValidEmail(emailAdd) &&
            isValidNewPassword(pwd)
        );
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
                ? { backgroundColor: DarkGrey, color: 'white' }
                : { backgroundColor: 'white', color: DarkGrey }
            ]}
            indicatorStyle='white'
            contentContainerStyle={{alignItems: 'center'}}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            keyboardDismissMode='interactive' >
            <Text
                style={[ 
                    styles.header, 
                    colorScheme !== 'light' 
                    ? { color: 'white' }
                    : { color: DarkGrey }
                ]}>
                Hi, {firstName}!
            </Text>
            <View style={[styles.body, 
                        colorScheme !== 'light' 
                        ? { color: 'white' }
                        : { color: DarkGrey }
                    ]}>
                <Text style={[styles.subtitle, 
                        colorScheme !== 'light' 
                        ? { color: 'white' }
                        : { color: DarkGrey }
                    ]}>Verify account information</Text>
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
                        validateInput(val, lastName, phone, email, newPassword);
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
                        validateInput(firstName, val, phone, email, newPassword);
                    }} />
                <TextInput
                    ref={refs[1]}
                    keyboardType='numeric'
                    maxLength={validMaskedPhoneLength}
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
                    selectionColor={
                        isValidPhone(phone)
                        ? styles.formField.color
                        : styles.invalidInput.color }
                    clearButtonMode={'always'} // iOS only
                    value={phone}
                    onChangeText={val => {
                        setPhone(maskPhoneNumber(val));
                        validateInput(firstName, lastName, val, email, newPassword);
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
                    selectionColor={
                        isValidEmail(email) 
                            ? styles.formField.color : styles.invalidInput.color }
                    style={renderFormFieldStyle(isValidEmail(email))}
                    onSubmitEditing={_ => {refs[3].current.focus(); }}
                    placeholder='Email'
                    inputMode='email'
                    clearButtonMode={'always'} // iOS only
                    value={email}
                    onChangeText={val => {
                        setEmail(val);
                        validateInput(firstName, lastName, phone, val, newPassword);
                    }} />
                <TextInput
                    ref={refs[3]}
                    placeholder='New Password (>= 8 characters)'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    placeholderTextColor={
                        isValidNewPassword(newPassword)
                            ? styles.formField.color
                            : styles.invalidInput.borderColor
                    }
                    selectionColor={
                        isValidNewPassword(newPassword) 
                        ? styles.formField.color
                        : styles.invalidInput.color }
                    style={[renderFormFieldStyle(isValidNewPassword(newPassword)), styles.newPassword]}
                    value={newPassword}
                    onChangeText={val => {
                        setNewPassword(val);
                        validateInput(firstName, lastName, phone, email, val);
                    }} />
                    <Pressable
                        disabled={!hasValidInput}
                        style={hasValidInput 
                                ? { ...styles.button, ...styles.submitButton }
                                : { ...styles.button, ...styles.submitButton, ...styles.disabledButton }}
                        onPress={_ => {
                            updateProfile();
                        }}>
                    <Text style={styles.submitButtonText}>Save</Text>
                </Pressable>
            </View>
        </KeyboardAwareScrollView>
        </>
    );
}
