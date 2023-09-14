import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const PreferencesContext = createContext();
const preferencesKeys = ["pushNotifications", "emailMarketing", "latestNews"];

export const PreferencesProvider = ({ children }) => {
	const defaultPreferences = [
		["pushNotifications", { title: "Push Notifications", isEnabled: false }],
		["emailMarketing", { title: "Marketing emails", isEnabled: false }],
		["latestNews", { title: "Latest News", isEnabled: false }]
	];

	const [preferences, setPreferences] = useState([]);

	const mapPreferences = (savedPreferences) => {
		let mappedPrefs = savedPreferences;

		savedPreferences.map((item, index) => {
			if (item[1] === null) {
				mappedPrefs[index][1] = defaultPreferences[index][1];
			} else {
				mappedPrefs[index][1] = JSON.parse(item[1]);
			}
		});

		console.info("Loaded user preferences:", mappedPrefs);
		setPreferences(mappedPrefs);
	};

	useEffect(() => {
		// Load saved preferences from storage
		const getPreferences = async () => {
			try {
				const savedPreferences = await AsyncStorage.multiGet(preferencesKeys);

				mapPreferences(savedPreferences);
			} catch (error) {
				const errorMsg = "Error loading user preferences:";

				console.log(errorMsg, error);
				Alert.alert(errorMsg, error.message, undefined, {
					cancelable: true
				});
			}
		};

		getPreferences();
	}, []);

	const updatePreferences = (updatedPreferences) => {
		const setPreferences = async (updatedPreferences) => {
			try {
				setPreferences(updatedPreferences);
				let prefsToSave = updatedPreferences;

				updatedPreferences.map((item, index) => {
					prefsToSave[index][1] = JSON.stringify(item[1]);
				});

				console.log(prefsToSave);
				await AsyncStorage.multiSet(prefsToSave);
			} catch (error) {
				const errorMsg = "Error storing user preferences:";

				console.log(errorMsg, error);
				Alert.alert(errorMsg, error.message, undefined, {
					cancelable: true
				});
			}
		}

		setPreferences(updatedPreferences);
	};

	return (
		<PreferencesContext.Provider value={{ preferences, updatePreferences }}>
			{children}
		</PreferencesContext.Provider>
	);
};

export default PreferencesContext;
