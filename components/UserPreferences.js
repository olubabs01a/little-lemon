import { View, Text, StyleSheet } from "react-native";
import { DarkGrey, LemonYellow } from "../utils/Colors";
import { useEffect, useContext, useState, useCallback } from "react";
import PreferencesContext, { PreferencesProvider } from "../context/PreferencesContext";
import { ToggleButton } from "react-native-paper";
import ThemeContext from "../context/ThemeContext";
import Header from "./shared/Header";
import { CustomDrawerSelection } from "./types";

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: "black",
		paddingHorizontal: 20,
		paddingVertical: 40
	},
	innerContainer: {
		paddingHorizontal: 10,
		paddingVertical: 15,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between"
	},
	preferenceItem: {
		fontSize: 16,
		color: LemonYellow
	}
});

export default function UserPreferences(props) {
	const { theme } = useContext(ThemeContext);
	const { preferences, updatePreferences } = useContext(PreferencesContext);

	useEffect(() => {
		props.setCustomDrawerSelection(CustomDrawerSelection.Preferences);
	}, []);

	function PreferenceItem(props) {
		const [isEnabled, setEnabled] = useState(props.isEnabled);

		const onButtonToggle = useCallback(
			(val) => {
				const newIsEnabled = isEnabled ? false : true;

				setEnabled(newIsEnabled);
				updateUserPreferences(val, newIsEnabled);
			},
			[preferences]
		);

		const updateUserPreferences = (key, updated) => {
			let userPrefs = preferences.filter((item) => item[0] !== key);
			userPrefs.push([key, { title: props.title, isEnabled: updated }]);
			updatePreferences(userPrefs);
		};

		return (
			<View style={styles.innerContainer}>
				<Text
					style={[
						styles.preferenceItem,
						theme !== "light" ? { color: "white" } : { color: DarkGrey }
					]}>
					{props.title}
				</Text>
				<ToggleButton
					accessibilityLabel={props.title}
					value={props.key}
					status={isEnabled}
					rippleColor={"blue"}
					style={[
						styles.preferenceItem,
						theme !== "light" ? { color: "white" } : { color: DarkGrey }
					]}
					onPress={onButtonToggle}
				/>
			</View>
		);
	}

	return (
		<PreferencesProvider>
			<View
				style={[
					styles.container,
					theme !== "light" ? { backgroundColor: DarkGrey } : { backgroundColor: "white" }
				]}>
				<Header text={"Account Preferences"} />
				{preferences?.map((setting) => {
					<PreferenceItem
						key={setting[0]}
						title={setting[1].title}
						isEnabled={setting[1].isEnabled}
					/>;
				})}
			</View>
		</PreferencesProvider>
	);
}
