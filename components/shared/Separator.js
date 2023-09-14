import { StyleSheet, View } from "react-native";
import ThemeContext from "../../context/ThemeContext";
import { useContext } from "react";
import { DarkGrey } from "../../utils/Colors";

const styles = StyleSheet.create({
    separator: {
		backgroundColor: "white",
		height: 0.5,
		opacity: 0.5
	}
});

export default function Separator() {
	const { theme } = useContext(ThemeContext);

	return (
		<View
			style={[
				styles.separator,
				theme !== "light" ? { backgroundColor: "white" } : { backgroundColor: DarkGrey }
			]}
		/>
	);
}