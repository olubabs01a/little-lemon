import { useContext } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { DarkGrey, LemonYellow, LightGrey } from "../utils/Colors";
import ThemeContext from "../context/ThemeContext";
import Icon from "react-native-vector-icons/FontAwesome";

// TODO: Use UserContext to adjust button position when logged in
export default function ThemeButton(props) {
	const { theme, toggleTheme } = useContext(ThemeContext);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			marginHorizontal: 10
		},
		innerContainer: {
			paddingTop: 50,
			flexDirection: "row",
			justifyContent: "flex-end",
			verticalAlign: "middle",
			alignItems: "center",
		},
		iconTextStyle: {
			fontSize: 15,
			color: theme !== "light" ? LightGrey : DarkGrey
		},
		switchStyle: {
			transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
			verticalAlign: "middle",
		},
		iconStyle: {
			color: theme !== "light" ? LightGrey : DarkGrey,
			verticalAlign: "middle",
			fontSize: 18
		}
	});

	return (
		<View style={styles.container} aria-label={"Theme"}>
			<View style={styles.innerContainer}>
				<Icon {...props} style={styles.iconStyle} name="sun-o" />
				<Switch
					aria-label={"Theme Selection"}
					value={theme !== "light"}
					trackColor={{
						true: LemonYellow,
						false: LightGrey
					}}
					ios_backgroundColor={LightGrey}
					style={styles.switchStyle}
					onValueChange={toggleTheme}
				/>
				<Icon {...props} style={styles.iconStyle} name="moon-o" />
			</View>
		</View>
	);
}
