import menuItems from "../menuItems.json";

export function getMenu() {
    // return fetch("https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json");
    return new Promise((resolve) => resolve(menuItems));
}