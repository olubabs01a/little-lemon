import { Pressable, StyleSheet, Image, View, Platform } from "react-native";
import LogInOutButton from "./components/LogInOutButton";
import MenuButton from "./components/MenuButton";
import ThemeButton from "./components/ThemeButton";
import LittleLemonFooter from "./components/LittleLemonFooter";
import Welcome from "./components/Welcome";
import SubscribeScreen from "./components/SubscribeScreen";
import MenuItems from "./components/MenuItems";
import FeedbackForm from "./components/FeedbackForm";
import LoginScreen from "./components/LoginScreen";
import { useCallback, useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
	createDrawerNavigator
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome";
import { DeepRed, DarkGreen, DarkGrey, LemonYellow, LightGrey } from "./utils/Colors";
import ProfileScreen from "./components/ProfileScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomDrawerSelection } from "./components/types";
import { isNullUndefinedOrEmpty } from "./utils/String";
import ThemeContext, { ThemeProvider } from "./context/ThemeContext";
import UserContext, { UserProvider } from "./context/UserContext";
import UserPreferences from "./components/UserPreferences";
import { PreferencesProvider } from "./context/PreferencesContext";

//TODO: Create StyleContext to hold all styles, and effect theme changes
const appStyles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: DarkGrey
	},
	footer: {
		backgroundColor: DarkGrey
	},
	drawerIcon: {
		alignSelf: "center",
		maxWidth: 250,
		maxHeight: 250,
		marginBottom: Platform.OS === "ios" ? 75 : 100
	},
	logOutDrawerItem: {
		borderRadius: 5
	},
	logOutWrapper: {
		position: "absolute",
		alignItems: "flex-start",
		verticalAlign: "middle",
		left: 18,
		bottom: 25,
		zIndex: 1
	},
	logOutLink: {
		fontSize: 16,
		textDecorationLine: "underline",
		textDecorationStyle: "solid",
		color: DeepRed,
		fontWeight: "700"
	},
	navigatorOptions: {
		headerTitleAlign: "center",
		headerTintColor: "white",
		headerTitleStyle: {
			color: "white"
		},
		headerStyle: {
			backgroundColor: DarkGreen
		},
		drawerActiveTintColor: DarkGreen,
		drawerActiveBackgroundColor: LemonYellow,
		drawerInactiveTintColor: DarkGrey
	}
});

export default function App() {
	const LeftDrawer = createDrawerNavigator();
	const RightDrawer = createDrawerNavigator();
	let customDrawerSelection = CustomDrawerSelection.None;

	const MenuDrawerScreen = () => {
		const { isLoggedIn } = useContext(UserContext);

		const setCustomDrawerSelection = useCallback(
			(updatedRoute) => {
				customDrawerSelection = updatedRoute;
			},
			[customDrawerSelection, isLoggedIn]
		);

		return (
			<RightDrawer.Navigator
				id='RightDrawer'
				drawerContent={(props) => <MenuItems {...props} />}
				screenOptions={{
					drawerPosition: "right",
					drawerAllowFontScaling: true,
					headerTitleAllowFontScaling: true,
					headerShown: false
				}}>
				<RightDrawer.Screen name='MenuItems'>
					{(props) => (
						<LeftDrawerScreens
							{...props}
							setCustomDrawerSelection={setCustomDrawerSelection}
						/>
					)}
				</RightDrawer.Screen>
			</RightDrawer.Navigator>
		);
	};

	function LogoutDrawerContent(props) {
		const { isLoggedIn } = useContext(UserContext);
		const { theme } = useContext(ThemeContext);
		const navigator = useNavigation();
		const defaultTextColor = theme !== "light" ? LightGrey : DarkGrey;
		const defaultBackground = theme !== "light" ? DarkGrey : "white";

		const renderActiveTint = useCallback(
			(routeName) => {
				return isNullUndefinedOrEmpty(customDrawerSelection) === false
					? customDrawerSelection.toLowerCase() === routeName.toLowerCase()
						? DarkGreen
						: defaultTextColor
					: defaultTextColor;
			},
			[customDrawerSelection, navigator, theme, isLoggedIn]
		);

		const renderActiveBackground = useCallback(
			(routeName) => {
				return isNullUndefinedOrEmpty(customDrawerSelection) === false
					? customDrawerSelection?.toLowerCase() === routeName.toLowerCase()
						? LemonYellow
						: defaultBackground
					: defaultBackground;
			},
			[customDrawerSelection, navigator, theme, isLoggedIn]
		);

		return (
			<SafeAreaView
				style={{
					flex: 1,
					position: "absolute",
					width: "100%",
					marginBottom: Platform.OS === "ios" ? undefined : 0,
					justifyContent: "space-between"
				}}
				forceInset={{ top: "always", horizontal: "never" }}>
				<Image
					resizeMode='center'
					style={appStyles.drawerIcon}
					accessible={true}
					aria-label={"Little Lemon logo"}
					source={require("./img/littleLemonLogo.png")}
				/>
				<DrawerContentScrollView
					{...props}
					indicatorStyle={theme !== "light" ? "white" : "black"}>
					<DrawerItemList {...props} />
				</DrawerContentScrollView>
				<DrawerContentScrollView
					{...props}
					indicatorStyle={theme !== "light" ? "white" : "black"}>
					<View
						style={
							Platform.OS !== "web"
								? {
										marginTop: isLoggedIn
											? Platform.OS !== "ios"
												? -50
												: -60
											: -10,
										paddingBottom: undefined
								  }
								: {}
						}>
						{isLoggedIn ? (
							<>
								<DrawerItem
									name={CustomDrawerSelection.Profile}
									aria-label={"View Profile"}
									label={"View Profile"}
									/** Workaround to simulate active appearance on route change */
									inactiveBackgroundColor={renderActiveBackground(
										CustomDrawerSelection.Profile
									)}
									inactiveTintColor={renderActiveTint(
										CustomDrawerSelection.Profile
									)}
									allowFontScaling={true}
									icon={(props) => (
										<Icon
											{...{
												...props,
												color: renderActiveTint(
													CustomDrawerSelection.Profile
												)
											}}
											name='user-circle'
										/>
									)}
									labelStyle={{
										color: renderActiveTint(CustomDrawerSelection.Profile),
										paddingLeft: 0
									}}
									style={appStyles.logOutDrawerItem}
									onPress={() => {
										navigator.navigate(CustomDrawerSelection.Profile);
									}}
								/>
								<DrawerItem
									name={CustomDrawerSelection.Preferences}
									aria-label={"Account Preferences"}
									label={"Account Preferences"}
									allowFontScaling={true}
									/** Workaround to simulate active appearance on route change */
									inactiveBackgroundColor={renderActiveBackground(
										CustomDrawerSelection.Preferences
									)}
									inactiveTintColor={renderActiveTint(
										CustomDrawerSelection.Preferences
									)}
									icon={(props) => (
										<Icon
											{...{
												...props,
												color: renderActiveTint(
													CustomDrawerSelection.Preferences
												)
											}}
											name='wrench'
										/>
									)}
									labelStyle={{
										color: renderActiveTint(CustomDrawerSelection.Preferences),
										paddingLeft: 1
									}}
									style={appStyles.logOutDrawerItem}
									onPress={() => {
										navigator.navigate(CustomDrawerSelection.Preferences);
									}}
								/>
							</>
						) : (
							<DrawerItem
								name={CustomDrawerSelection.Login}
								aria-label={CustomDrawerSelection.Login}
								label={CustomDrawerSelection.Login}
								allowFontScaling={true}
								/** Workaround to simulate active appearance on route change */
								inactiveBackgroundColor={renderActiveBackground(
									CustomDrawerSelection.Login
								)}
								inactiveTintColor={renderActiveTint(CustomDrawerSelection.Login)}
								icon={(props) => (
									<Icon
										{...{
											...props,
											color: renderActiveTint(CustomDrawerSelection.Login)
										}}
										name='user'
									/>
								)}
								labelStyle={{
									color: renderActiveTint(CustomDrawerSelection.Login),
									paddingLeft: 8
								}}
								style={appStyles.logOutDrawerItem}
								onPress={() => {
									navigator.navigate(CustomDrawerSelection.Login);
								}}
							/>
						)}

						<DrawerItem
							name={CustomDrawerSelection.Subscribe}
							aria-label={"Subscribe to our Newsletter"}
							label={"Newsletter"}
							allowFontScaling={true}
							/** Workaround to simulate active appearance on route change */
							inactiveBackgroundColor={renderActiveBackground(
								CustomDrawerSelection.Subscribe
							)}
							inactiveTintColor={renderActiveTint(CustomDrawerSelection.Subscribe)}
							icon={(props) => (
								<Icon
									{...{
										...props,
										color: renderActiveTint(CustomDrawerSelection.Subscribe)
									}}
									name='envelope'
								/>
							)}
							labelStyle={{
								color: renderActiveTint(CustomDrawerSelection.Subscribe),
								paddingLeft: 1
							}}
							style={appStyles.logOutDrawerItem}
							onPress={() => {
								navigator.navigate(CustomDrawerSelection.Subscribe);
							}}
						/>
					</View>

					<View style={Platform.OS !== "ios" ? { marginTop: 5 } : { marginTop: 5 }}>
						{isLoggedIn && (
							<Pressable
								aria-label={"Log out"}
								style={{ ...appStyles.button, ...appStyles.logOutWrapper }}>
								<LogInOutButton
									{...props}
									hideLogo={true}
									textOnlyStyle={{
										...appStyles.logOutLink,
										color: theme !== "light" ? LightGrey : DeepRed
									}}
								/>
							</Pressable>
						)}
						<ThemeButton />

						{Platform.OS === "web" && (
							<View style={[appStyles.footer, { flex: 1 }]}>
								<LittleLemonFooter />
							</View>
						)}
					</View>
				</DrawerContentScrollView>
			</SafeAreaView>
		);
	}

	const LeftDrawerScreens = (drawerProps) => {
		const { theme } = useContext(ThemeContext);

		return (
			<View
				style={[
					appStyles.body,
					theme !== "light"
						? { backgroundColor: DarkGrey, color: "white" }
						: { backgroundColor: "white", color: DarkGrey }
				]}>
				<LeftDrawer.Navigator
					id='LeftDrawer'
					initialRouteName='Welcome'
					drawerContent={(props) => <LogoutDrawerContent {...props} />}
					backBehavior='history' //'initialRoute'
					screenOptions={{
						...appStyles.navigatorOptions,
						drawerAllowFontScaling: true,
						headerTitleAllowFontScaling: true,
						drawerStyle: {
							backgroundColor: theme !== "light" ? DarkGrey : "white"
						},
						drawerPosition: "left",
						drawerInactiveTintColor: theme !== "light" ? LightGrey : DarkGrey,
						headerRight: (props) => <MenuButton {...props} />
					}}>
					<LeftDrawer.Screen
						name='Login'
						options={{
							unmountOnBlur: true,
							/** hide menu button on Login screen */
							headerRight: () => {},
							/** hide this login button in top half of drawer */
							drawerItemStyle: { display: "none" }
						}}>
						{(props) => <LoginScreen {...{ ...props, ...drawerProps }} />}
					</LeftDrawer.Screen>
					<LeftDrawer.Screen
						name='Profile'
						options={{
							unmountOnBlur: true,
							headerRight: (props) => <LogInOutButton {...props} />,
							/** hide this profile button in top half of drawer */
							drawerItemStyle: { display: "none" }
						}}>
						{(props) => <ProfileScreen {...{ ...props, ...drawerProps }} />}
					</LeftDrawer.Screen>
					<LeftDrawer.Screen
						name='Preferences'
						options={{
							unmountOnBlur: true,
							headerRight: (props) => <LogInOutButton {...props} />,
							/** hide this preferences button in top half of drawer */
							drawerItemStyle: { display: "none" }
						}}>
						{(props) => <UserPreferences {...{ ...props, ...drawerProps }} />}
					</LeftDrawer.Screen>
					<LeftDrawer.Screen
						name='Subscribe'
						options={{
							unmountOnBlur: true,
							/** hide menu button on Login screen */
							headerRight: () => {},
							/** hide this login button in drawer */
							drawerItemStyle: { display: "none" }
						}}>
						{(props) => <SubscribeScreen {...{ ...props, ...drawerProps }} />}
					</LeftDrawer.Screen>
					<LeftDrawer.Screen
						name='Welcome'
						options={{
							title: "Welcome",
							drawerIcon: (props) => <Icon {...props} name='home' />
						}}>
						{(props) => <Welcome {...{ ...props, ...drawerProps }} />}
					</LeftDrawer.Screen>
					<LeftDrawer.Screen
						name='Feedback'
						options={{
							unmountOnBlur: true,
							title: "Feedback",
							drawerIcon: (props) => <Icon {...props} name='comments' />
						}}>
						{(props) => <FeedbackForm {...{ ...props, ...drawerProps }} />}
					</LeftDrawer.Screen>
				</LeftDrawer.Navigator>
			</View>
		);
	};

	return (
		<>
			<ThemeProvider>
				<UserProvider>
					<PreferencesProvider>
						<NavigationContainer>
							<MenuDrawerScreen />
							{Platform.OS !== "web" && (
								<View style={appStyles.footer}>
									<LittleLemonFooter />
								</View>
							)}
						</NavigationContainer>
					</PreferencesProvider>
				</UserProvider>
			</ThemeProvider>
		</>
	);
}
