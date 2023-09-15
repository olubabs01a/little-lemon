import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(useColorScheme());

	useEffect(() => {
		// Load saved theme from storage
		const getTheme = async () => {
			try {
				const savedTheme = await AsyncStorage.getItem("theme");
				if (savedTheme) {
					setTheme(savedTheme);
				}
			} catch (error) {
				console.log("Error loading theme:", error);
			}
		};

		getTheme();
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		(async () => await AsyncStorage.setItem("theme", newTheme))();
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
