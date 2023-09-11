import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useColorScheme, setColorScheme } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isNullUndefinedOrEmpty } from '../utils/String';
import { DarkGrey, LightGrey, LemonYellow, DarkGreen } from '../utils/Colors';

export default function ThemeButton(props) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            lineHeight: Platform.OS === 'ios' ? 30 : 60,
        },
        themeSelection: {
            margin: 20,
            minWidth: 100,
            maxHeight: 100,
            borderBottomColor: LightGrey,
            borderBottomWidth: .5,
            elevation: 1
        },
        listSelection: {
            color: colorScheme !== 'light' ? DarkGrey : 'white',
            backgroundColor: colorScheme !== 'light' ? DarkGrey : LightGrey,
        },
        iconTextStyle: {
            color: colorScheme !== 'light' ? 'white' : DarkGrey,
            fontSize: 17,
            lineHeight: 20
        },
        iconStyle: {
            color: colorScheme !== 'light' ? 'white' : DarkGrey,
            padding: 5
        },
        selectedTextStyle: {
            color: colorScheme !== 'light' ? LightGrey : DarkGrey,
            fontWeight: '400',
            paddingHorizontal: 5
        }
    });

    const [colorScheme, setColorScheme] = useState(useColorScheme());
    const themeData = [
        { label: 'Dark', value: 'dark', icon: 'circle' },
        { label: 'Light', value: 'light', icon: 'circle-o' }
    ];

    return (
        <View
            style={styles.container}
            accessibilityLabel={'Theme'}>
            <Dropdown
                accessibilityLabel={'Theme Selection'}
                style={styles.themeSelection}
                containerStyle={styles.listSelection}
                activeColor={DarkGreen}
                iconStyle={styles.iconStyle}
                itemTextStyle={styles.itemTextStyle}
                itemContainerStyle={styles.iconStyle}
                selectedStyle={styles.selectedStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={themeData}
                search={false}
                labelField="label"
                valueField="value"
                value={colorScheme}
                onChange={item => { setColorScheme(item.value); }}
                renderItem={(item, selected) => 
                    <Icon {...props} name={item.icon} style={styles.iconStyle} size={20}>
                        <Text style={styles.iconTextStyle}>
                            {` ${item.label}`}
                        </Text>
                    </Icon> 
                }
                renderLeftIcon={() => 
                    <Icon {...props} 
                        name={
                            isNullUndefinedOrEmpty(colorScheme) === false 
                                ? (colorScheme === 'light' ? 'circle-o' : 'circle')
                                : 'adjust'
                        } 
                        style={styles.iconStyle} 
                        size={20} 
                    />}
            /> 
        </View>
    );
};
