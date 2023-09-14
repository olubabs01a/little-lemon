import { Alert, View, Text, StyleSheet } from "react-native";
import { DarkGrey, LemonYellow, LightGrey } from "../utils/Colors";
import { useEffect, useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import { getMenu } from "../api/Actions";
import { ActivityIndicator } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import Header from "./shared/Header";
import Separator from "./shared/Separator";

const menuStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		paddingVertical: 40
	},
	innerContainer: {
		paddingHorizontal: 10,
		paddingVertical: 15,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between"
	},
	spinner: {
		flex: 1
	},
	listStyle: {
		margin: 10,
		textAlign: "center"
	},
	sectionHeader: {
		fontSize: 18,
		paddingVertical: 10,
		paddingHorizontal: 10,
		fontWeight: "500",
		backgroundColor: LemonYellow
	},
	sectionFooter: {
		fontSize: 15,
		paddingVertical: 10,
		paddingHorizontal: 10,
		textAlign: "center",
		color: LemonYellow
	},
	menuItem: {
		fontSize: 16,
		color: LemonYellow
	}
});

export default function MenuItems() {
	const [menuItems, setMenuItems] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const { theme } = useContext(ThemeContext);

	useEffect(() => {
		async function getItems() {
			await getMenu()
				.then(response => {
					setMenuItems(response.menu);
					setLoading(false);
				})
				.catch((error) => {
					console.error(error);
					Alert.alert("An error occured", error.message, undefined, {
						cancelable: true
					});
				});
		}

		getItems();
	}, []);

	//TODO: Add scroll to each section via Dropdown menu footer component
	return (
		<View
			style={[
				menuStyles.container,
				theme !== "light" ? { backgroundColor: DarkGrey } : { backgroundColor: "white" }
			]}>
			{isLoading ? (
				<ActivityIndicator
					size={"large"}
					animating={isLoading}
					style={menuStyles.spinner}
					color={theme !== "light" ? LightGrey : DarkGrey}
				/>
			) : menuItems?.length > 0 ? (
				<FlatList
					data={menuItems}
					scrollEnabled
					nestedScrollEnabled
					ListHeaderComponent={() => <Header text={"Menu Items"} />}
					ItemSeparatorComponent={Separator}
					renderItem={({ item }) => (
						<View style={menuStyles.innerContainer}>
							<Text
								style={[
									menuStyles.menuItem,
									theme !== "light" ? { color: "white" } : { color: DarkGrey }
								]}>
								{item.title}
							</Text>
							<Text
								style={[
									menuStyles.menuItem,
									theme !== "light" ? { color: "white" } : { color: DarkGrey }
								]}>
								{`$${item.price}`}
							</Text>
						</View>
					)}
					contentContainerStyle={menuStyles.listStyle}
					stickySectionHeadersEnabled={true}
					showsVerticalScrollIndicator={true}
					indicatorStyle={theme !== "light" ? "white" : "black"}
					keyExtractor={(item, index) => item + index}
				/>
			) : (
				<>
					<Header text={"Menu Items"} />
					<Text
						style={[
							menuStyles.menuItem,
							theme !== "light"
								? { textAlign: "center", color: "white" }
								: { textAlign: "center", color: DarkGrey }
						]}>
						No Items Found
					</Text>
				</>
			)}
		</View>
	);
}
