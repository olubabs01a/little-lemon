import { useContext } from "react";
import { Pressable, StyleSheet, Text, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import UserContext from "../context/UserContext";

export default function LogInOutButton(props) {
	const navigator = useNavigation();
	const { isLoggedIn, setLoggedIn } = useContext(UserContext);

	const styles = StyleSheet.create({
		loggedIn: {
			textAlign: "right",
			lineHeight: Platform.OS === "ios" ? 30 : 60,
			paddingHorizontal: 10,
			fontSize: 15
		}
	});

	const renderText = () => (isLoggedIn ? "Log out" : "Login");
	const renderIcon = () => (isLoggedIn ? "user-circle" : "user");

	return (
		<Pressable
			aria-label={renderText()}
			onPress={() => {
				if (isLoggedIn) {
					setLoggedIn(false);
				}

				navigator.navigate("Login");
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
