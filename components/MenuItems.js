import { View, Text, StyleSheet, SectionList } from 'react-native';
import { DarkGrey, LemonYellow } from '../utils/Colors';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const menuItemsToDisplay = [
    {
        title: 'Appetizers',
        data: [
            { name: 'Hummus', price: '$5.00', id: '1A' },
            { name: 'Moutabal', price: '$5.00', id: '2B' },
            { name: 'Falafel', price: '$7.50', id: '3C' },
            { name: 'Marinated Olives', price: '$5.00', id: '4D' },
            { name: 'Kofta', price: '$5.00', id: '5E' },
            { name: 'Eggplant Salad', price: '$8.50', id: '6F' }
        ]
    },
    {
        title: 'Main Dishes',
        data: [
            { name: 'Lentil Burger', price: '$10.00', id: '7G' },
            { name: 'Smoked Salmon', price: '$14.00', id: '8H' },
            { name: 'Kofta Burger', price: '$11.00', id: '9I' },
            { name: 'Turkish Kebab', price: '$15.50', id: '10J' }
        ],
        note: 'Each comes with 1st side on the house'
    },
    {
        title: 'Sides',
        data: [
            { name: 'Fries', price: '$3.00', id: '11K' },
            { name: 'Buttered Rice', price: '$3.00', id: '12L' },
            { name: 'Bread Sticks', price: '$3.00', id: '13M' },
            { name: 'Pita Pocket', price: '$3.00', id: '14N' },
            { name: 'Lentil Soup', price: '$3.75', id: '15O' },
            { name: 'Greek Salad', price: '$6.00', id: '16Q' },
            { name: 'Rice Pilaf', price: '$4.00', id: '17R' }
        ]
    },
    {
        title: 'Desserts',
        data: [
            { name: 'Baklava', price: '$3.00', id: '18S' },
            { name: 'Tartufo', price: '$3.00', id: '19T' },
            { name: 'Tiramisu', price: '$5.00', id: '20U' },
            { name: 'Panna Cotta', price: '$5.00', id: '21V' }
        ]
    }
];

const menuStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingVertical: 40
    },
    innerContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    listStyle: {
        margin: 10,
        textAlign: 'center'
    },
    sectionHeader: {
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontWeight: '500',
        backgroundColor: LemonYellow //Coral
    },
    sectionFooter: {
        fontSize: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        textAlign: 'center',
        color: LemonYellow //Coral
    },
    menuItem: {
        fontSize: 16,
        color: LemonYellow //Coral
    },
    header: {
        padding: 18,
        fontSize: 23,
        textAlign: 'center',
        color: 'white'
    },
    separator: {
        backgroundColor: 'white',
        height: 0.5,
        opacity: 0.5
    }
});

function Header () {
    const {theme} = useContext(ThemeContext);

    return <Text style={[ 
                menuStyles.header, 
                theme !== 'light' 
                ? { color: 'white', opacity: 1 }
                : { color: DarkGrey }
            ]}>
                Menu Items
            </Text>;
}

function Separator() {
    const {theme} = useContext(ThemeContext);

    return (
        <View style={[ 
            menuStyles.separator, 
            theme !== 'light' 
            ? { backgroundColor: 'white' }
            : { backgroundColor: DarkGrey }
        ]} />
    );
}

export default function MenuItems() {
    const {theme} = useContext(ThemeContext);

    return (
        <View style={[ 
            menuStyles.container, 
            theme !== 'light' 
            ? { backgroundColor: DarkGrey }
            : { backgroundColor: 'white' }
        ]}>
            <SectionList
                sections={menuItemsToDisplay}
                nestedScrollEnabled={true}
                ListHeaderComponent={Header}
                ItemSeparatorComponent={Separator}
                renderSectionHeader={
                    ({section: {title}}) => <View>
                        <Text style={menuStyles.sectionHeader}>{title}</Text>
                    </View>
                }
                renderSectionFooter={
                    ({section: {note}}) => note && <View>
                        <Text style={[ 
                            menuStyles.sectionFooter, 
                            theme !== 'light' 
                            ? { color: LemonYellow } //Coral }
                            : { color: DarkGrey }
                        ]}>{note}</Text>
                    </View>
                }
                renderItem={
                    ({item}) => <View style={menuStyles.innerContainer}>
                        <Text style={[ 
                            menuStyles.menuItem, 
                            theme !== 'light' 
                            ? { color: 'white' }
                            : { color: DarkGrey }
                        ]}>{item.name}</Text>
                        <Text style={[ 
                            menuStyles.menuItem, 
                            theme !== 'light' 
                            ? { color: 'white' }
                            : { color: DarkGrey }
                        ]}>{item.price}</Text>
                    </View>
                }
                contentContainerStyle={menuStyles.listStyle}
                stickySectionHeadersEnabled={true}
                showsVerticalScrollIndicator={true}
                indicatorStyle={'white'}
                keyExtractor={(item, index) => item + index}
            />
        </View>
    );
}
