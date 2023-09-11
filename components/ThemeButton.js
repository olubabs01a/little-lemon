import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isNullUndefinedOrEmpty } from '../utils/String';
import { DarkGrey, LightGrey, LemonYellow } from '../utils/Colors';
import ThemeContext from '../context/ThemeContext';

export default function ThemeButton(props) {
    const {theme, toggleTheme} = useContext(ThemeContext);

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
            borderBottomColor: theme !== 'light' ? LightGrey : DarkGrey,
            borderBottomWidth: .5,
            elevation: 1
        },
        listSelection: {
            color: theme !== 'light' ? DarkGrey : 'white',
            backgroundColor: theme !== 'light' ? DarkGrey : 'white',
        },
        iconTextStyle: {
            fontSize: 17,
            lineHeight: 20
        },
        iconStyle: {
            padding: 5
        },
        selectedTextStyle: {
            color: theme !== 'light' ? LightGrey : DarkGrey,
            fontWeight: '400',
            paddingHorizontal: 5
        }
    });

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
                activeColor={LemonYellow}
                iconStyle={styles.iconStyle}
                itemTextStyle={styles.itemTextStyle}
                itemContainerStyle={styles.iconStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={themeData}
                search={false}
                labelField="label"
                valueField="value"
                value={theme}
                onChange={item => { toggleTheme(item.value); }}
                renderItem={(item, selected) => 
                    <Icon {...props} 
                        name={item.icon}
                        accessibilityLabel={item.label}
                        style={[ styles.iconStyle, selected && { color: DarkGrey }, !selected && theme !== 'light' && { color: LightGrey }]} 
                        size={20}
                    >
                        <Text style={[ styles.iconTextStyle, selected && { color: DarkGrey }]}>
                            {` ${item.label} `}
                            {selected && (
                                <Icon
                                    {...props}
                                    name={'check'}
                                    style={[ styles.iconStyle, selected && { color: DarkGrey }]}
                                    size={15}
                                />
                            )}
                        </Text>
                    </Icon> 
                }
                renderLeftIcon={() => 
                    <Icon {...props} 
                        name={
                            isNullUndefinedOrEmpty(theme) === false 
                                ? (theme === 'light' ? 'circle-o' : 'circle')
                                : 'adjust'
                        } 
                        style={styles.iconStyle} 
                        size={20} 
                    />}
            /> 
        </View>
    );
};
