import { useContext } from "react";
import { Platform, StyleSheet, Switch, Text, View } from "react-native";
import { DarkGreen, DarkGrey, LemonYellow, LightGrey } from "../utils/Colors";
import ThemeContext from "../context/ThemeContext";
import Icon from "react-native-vector-icons/FontAwesome";
import UserContext from "../context/UserContext";

export default function ThemeButton(props) {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { isLoggedIn } = useContext(UserContext);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			marginHorizontal: 10
		},
		innerContainer: {
			paddingBottom:
				isLoggedIn && Platform.OS !== "web" ? (Platform.OS !== "ios" ? 10 : 18) : 30,
			flexDirection: "row",
			justifyContent: "flex-end",
			verticalAlign: "middle",
			alignItems: "center"
		},
		iconTextStyle: {
			fontSize: 15,
			color: theme !== "light" ? LightGrey : DarkGrey
		},
		switchStyle: {
			transform: Platform.OS !== "ios" ? [] : [{ scaleX: 0.6 }, { scaleY: 0.6 }],
			verticalAlign: "middle"
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
				<Icon {...props} style={styles.iconStyle} name='sun-o' />
				<Switch
					aria-label={"Theme Selection"}
					value={theme !== "light"}
					thumbColor={theme !== "light" ? LemonYellow : DarkGreen}
					trackColor={{
						true: theme !== "light" ? DarkGreen : LemonYellow,
						false: LightGrey
					}}
					ios_backgroundColor={LightGrey}
					style={styles.switchStyle}
					onValueChange={toggleTheme}
				/>
				<Icon {...props} style={styles.iconStyle} name='moon-o' />
			</View>
		</View>
	);
}
