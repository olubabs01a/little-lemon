import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userProfile, setUserProfile] = useState({});

	// useEffect(() => {
	// 	// Load user details
	// 	const getUserProfile = async () => {
	// 		try {
				
	// 			setUserProfile();
	// 		} catch (error) {
	// 			console.log("Error loading user profile:", error);
	// 		}
	// 	};

	// 	getUserProfile();
	// }, [isLoggedIn]);

	const setLoggedIn = (value) => {
		setIsLoggedIn(value);
	};

	return <UserContext.Provider value={{ isLoggedIn, setLoggedIn, userProfile }}>{children}</UserContext.Provider>;
};

export default UserContext;
