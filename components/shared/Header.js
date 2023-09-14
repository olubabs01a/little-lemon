import { StyleSheet, Text } from "react-native";
import ThemeContext from "../../context/ThemeContext";
import { useContext } from "react";
import { DarkGrey } from "../../utils/Colors";

const styles = StyleSheet.create({
    header: {
		padding: 18,
		fontSize: 23,
		textAlign: "center",
		color: "white"
	}
});

export default function Header(props) {
	const { theme } = useContext(ThemeContext);

	return (
		<Text
			aria-label={props.text}
			style={[
				styles.header,
				theme !== "light" ? { color: "white", opacity: 1 } : { color: DarkGrey }
			]}>
			{props.text}
		</Text>
	);
}