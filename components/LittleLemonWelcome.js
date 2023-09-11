import { StyleSheet, View, Text } from "react-native";
import { LemonYellow } from "../utils/Colors";

const styles = StyleSheet.create({
	container: {
		flex: 0.2,
		marginTop: 5
	},
	header: {
		padding: 40,
		fontSize: 20,
		color: LemonYellow,
		textAlign: "center"
	}
});

export default function LittleLemonWelcome() {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Welcome to Little Lemon!</Text>
		</View>
	);
}
