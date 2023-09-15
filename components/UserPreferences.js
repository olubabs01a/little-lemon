import { View, Switch, Text, StyleSheet } from "react-native";
import { DarkGreen, DarkGrey, LemonYellow, LightGrey } from "../utils/Colors";
import { useEffect, useContext, useState, useCallback } from "react";
import PreferencesContext from "../context/PreferencesContext";
import ThemeContext from "../context/ThemeContext";
import Header from "./shared/Header";
import { CustomDrawerSelection } from "./types";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		paddingHorizontal: 20,
		paddingVertical: 40
	},
	innerContainer: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between"
	},
	preferenceItem: {
		fontSize: 16,
		textAlignVertical: "center",
		color: LemonYellow
	},
	switchStyle: {
		transform: Platform.OS !== "ios" ? [] : [{ scaleX: 0.6 }, { scaleY: 0.6 }],
		verticalAlign: "middle"
	}
});

export default function UserPreferences(props) {
	const { theme } = useContext(ThemeContext);
	const { preferences, updatePreferences } = useContext(PreferencesContext);

	useEffect(() => {
		props.setCustomDrawerSelection(CustomDrawerSelection.Preferences);
	}, []);

	const onUpdateUserPreferences = useCallback(
		(updatedPref, index) => {
			let userPrefs = preferences;
			userPrefs[index] = updatedPref;

			updatePreferences(userPrefs);
		},
		[preferences]
	);

	function PreferenceItem(props) {
		const [isEnabled, setEnabled] = useState(props.isEnabled);

		const onButtonToggle = useCallback(
			(val) => {
				setEnabled(val);
				props.onUpdateUserPreferences(
					[props.name, { title: props.title, isEnabled: val }],
					props.index
				);
			},
			[props, preferences]
		);

		return (
			<View style={styles.innerContainer}>
				<Text
					aria-label={props.title}
					style={[
						styles.preferenceItem,
						{ color: theme !== "light" ? "white" : DarkGrey }
					]}>
					{props.title}
				</Text>
				<Switch
					aria-label={props.title}
					value={isEnabled}
					thumbColor={isEnabled ? LemonYellow : DarkGreen}
					trackColor={{
						true: DarkGreen,
						false: LightGrey
					}}
					ios_backgroundColor={LightGrey}
					style={[styles.switchStyle, { color: theme !== "light" ? "white" : DarkGrey }]}
					onValueChange={onButtonToggle}
				/>
			</View>
		);
	}

	return (
		<View
			style={[styles.container, { backgroundColor: theme !== "light" ? DarkGrey : "white" }]}>
			<Header text={"Account Preferences"} />
			<View style={{ paddingTop: 15 }}>
				{preferences.map((setting, index) => (
					<PreferenceItem
						name={setting[0]}
						key={setting + index}
						index={index}
						title={setting[1].title}
						isEnabled={setting[1].isEnabled}
						onUpdateUserPreferences={onUpdateUserPreferences}
					/>
				))}
			</View>
		</View>
	);
}
