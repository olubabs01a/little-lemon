import * as React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function LogInOutButton(props) {
	const navigator = useNavigation();

	const styles = StyleSheet.create({
		loggedIn: {
			textAlign: "right",
			lineHeight: Platform.OS === "ios" ? 30 : 60,
			paddingHorizontal: 10,
			fontSize: 15
		}
	});

	const renderText = () => (props.isLoggedIn ? "Log out" : "Login");
	const renderIcon = () => (props.isLoggedIn ? "user-circle" : "user");

	return (
		<Pressable
			accessibilityLabel={renderText()}
			onPress={() => {
				props.isLoggedIn ? props.setLoggedIn(false) : navigator.navigate("Login");
			}}>
			{props.hideLogo ? (
				<Text style={props.textOnlyStyle}>{renderText()}</Text>
			) : (
				<Icon style={{ ...styles.loggedIn, color: props.tintColor }} name={renderIcon()}>
					<Text>{` ${renderText()}`}</Text>
				</Icon>
			)}
		</Pressable>
	);
}
