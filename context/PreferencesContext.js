import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import UserContext from "./UserContext";

const PreferencesContext = createContext();
const preferencesKeys = ["pushNotifications", "emailMarketing", "latestNews"];

export const PreferencesProvider = ({ children }) => {
	const defaultPreferences = {
		pushNotifications: { title: "Push Notifications", isEnabled: false },
		emailMarketing: { title: "Marketing emails", isEnabled: false },
		latestNews: { title: "Latest News", isEnabled: false }
	};

	const { isLoggedIn } = useContext(UserContext);
	const [preferences, setPreferences] = useState([]);

	const mapPreferences = (savedPreferences) => {
		let mappedPrefs = savedPreferences;

		Object.entries(mappedPrefs).forEach((item, index) => {
			if (item[1][1] === null) {
				mappedPrefs[index][1] = defaultPreferences[item[1][0]];
			} else {
				mappedPrefs[index][1] = JSON.parse(value);
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

		if (isLoggedIn) {
			getPreferences();
		}
	}, [isLoggedIn]);

	const updatePreferences = (updatedPreferences) => {
		const setNewPreferences = async (updatedPreferences) => {
			try {
				setPreferences(updatedPreferences);

				const prefsToSave = Object.entries(updatedPreferences).map((entry) => {
					return [entry[0], String(entry[1])];
				});

				await AsyncStorage.multiSet(prefsToSave).then(() => {
					Alert.alert("Little Lemon", "Preferences updated!", undefined, {
						cancelable: true
					});
				});
			} catch (error) {
				const errorMsg = "Error storing user preferences:";
				console.log(errorMsg, error);
				Alert.alert(errorMsg, error.message, undefined, {
					cancelable: true
				});
			}
		};

		setNewPreferences(updatedPreferences);
	};

	return (
		<PreferencesContext.Provider value={{ preferences, updatePreferences }}>
			{children}
		</PreferencesContext.Provider>
	);
};

export default PreferencesContext;
