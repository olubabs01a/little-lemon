import { Alert, Image, StyleSheet, ScrollView, Text, TextInput, Pressable } from "react-native";
import { useContext, useEffect, useState } from "react";
import { isValidEmail } from "../utils/Validate";
import { DarkGrey, LemonYellow, LightGrey } from "../utils/Colors";
import { isNullUndefinedOrEmpty } from "../utils/String";
import { CustomDrawerSelection } from "./types";
import ThemeContext from "../context/ThemeContext";

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingVertical: 50
	},
	logo: {
		height: 150,
		width: 150,
		resizeMode: "contain"
	},
	body: {
		margin: 15,
		paddingVertical: 20,
		fontSize: 20,
		textAlign: "center",
		color: "white"
	},
	formField: {
		paddingVertical: 15,
		paddingHorizontal: 10,
		minWidth: 325,
		color: DarkGrey,
		borderRadius: 5,
		borderColor: "green",
		borderBottomWidth: 2
	},
	subscribeButton: {
		backgroundColor: LemonYellow,
		padding: 10,
		marginHorizontal: 10,
		marginVertical: 30,
		minWidth: 325,
		minHeight: 40,
		alignItems: "center",
		borderRadius: 5
	},
	invalidInput: {
		color: "red",
		borderColor: "red",
		borderBottomWidth: 2
	},
	disabledButton: {
		opacity: 0.6,
		backgroundColor: LightGrey
	},
	subscribeButtonText: {
		color: "black",
		fontWeight: "700"
	}
});

export default function SubscribeScreen(props) {
	const [email, setEmail] = useState("");
	const [hasValidInput, setInputValidState] = useState(false);
	const { theme } = useContext(ThemeContext);

	const resetForm = () => {
		setInputValidState(false);
		setEmail("");
	};

	const validateInput = (emailInput) => {
		setInputValidState(isValidEmail(emailInput));
	};

	const renderFormFieldStyle = (isValid) => {
		return theme !== "light"
			? // Handle styling if color scheme is not 'light'
			  isValid
				? { ...styles.formField, color: "white" }
				: [styles.formField, styles.invalidInput]
			: // Handle styling if color scheme is 'light'
			isValid
			? { ...styles.formField, color: DarkGrey }
			: [styles.formField, styles.invalidInput];
	};

	const subscribeToNewsletter = () => {
		Alert.alert("Thanks for subscribing, stay tuned!");
		resetForm();
	};

	useEffect(() => {
		props.setCustomDrawerSelection(CustomDrawerSelection.Subscribe);
		resetForm();

		return () => {
			resetForm();
		};
	}, []);

	return (
		<>
			<ScrollView
				style={[
					styles.container,
					theme !== "light"
						? { backgroundColor: DarkGrey, color: "white" }
						: { backgroundColor: "white", color: DarkGrey }
				]}
				indicatorStyle={theme !== "light" ? "white" : "black"}				contentContainerStyle={{
					flex: 1,
					alignItems: "center",
					justifyContent: "flex-start"
				}}
				enableOnAndroid={true}
				keyboardDismissMode='interactive'>
				<Image
					resizeMode='contain'
					style={styles.logo}
					accessible={true}
					accessibilityLabel={"Little Lemon logo"}
					source={require("../assets/little-lemon-logo-grey.png")}
				/>
				<Text
					style={[
						styles.body,
						theme !== "light" ? { color: "white" } : { color: DarkGrey }
					]}>
					Subscribe to our newsletter for our latest delicious recipes!
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
					placeholder='Email'
					inputMode='email'
					clearButtonMode={"always"} // iOS only
					value={email}
					onChangeText={(val) => {
						setEmail(val);
						validateInput(val);
					}}
				/>
				<Pressable
					disabled={!hasValidInput}
					style={
						hasValidInput
							? { ...styles.button, ...styles.subscribeButton }
							: {
									...styles.button,
									...styles.subscribeButton,
									...styles.disabledButton
							  }
					}
					onPress={(_) => {
						subscribeToNewsletter();
					}}>
					<Text style={styles.subscribeButtonText}>Subscribe</Text>
				</Pressable>
			</ScrollView>
		</>
	);
}
