import { StyleSheet, View, useColorScheme } from 'react-native';
import LogInOutButton from './components/LogInOutButton';
import LittleLemonFooter from './components/LittleLemonFooter';
import WelcomeScreen from './components/WelcomeScreen';
import MenuItems from './components/MenuItems';
import FeedbackForm from './components/FeedbackForm';
import LoginScreen from './components/LoginScreen';
import { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DarkGreen, DarkGrey, LemonYellow } from './utils/Colors';

const appStyles = StyleSheet.create({
  header: {
    flex: 0.2,
    maxHeight: 100
  },
  body: {
    flex: 1,
    backgroundColor: DarkGrey //DarkGreen
  },
  footer: {
    backgroundColor: DarkGrey //DarkGreen
  },
  navigatorOptions: {
    headerTitleAlign: 'center',
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white'
    },
    headerStyle: {
      backgroundColor: DarkGreen
    },
    tabBarActiveTintColor: LemonYellow,
    tabBarActiveBackgroundColor: DarkGreen
  }
});

export default function App() {
  const [isMenuActive, shouldShowMenu] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const colorScheme = useColorScheme();
  const Drawer = createDrawerNavigator();

  const renderMenuItems = useCallback(() => {
    return isMenuActive === true && <MenuItems />;
  }, [isMenuActive]);

  return (
    <><NavigationContainer>
        <View style={[ 
          appStyles.body, 
          colorScheme !== 'light' 
            ? { backgroundColor: DarkGrey, color: 'white' }
            : { backgroundColor: 'white', color: DarkGrey }
        ]}>
          <Drawer.Navigator
            initialRouteName='Welcome'
            backBehavior='history' //'initialRoute'
            screenOptions={{
              ...appStyles.navigatorOptions,
              drawerPosition: 'left',
              headerRight: (props) => <LogInOutButton {...props} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            }}>
            <Drawer.Screen name='Login' options={{
              /** hide login button on Login screen */
              headerRight: () => {},
              /** hide login button in drawer */
              drawerItemStyle: { display: 'none' }
              // drawerButton: () => null
            }}>
              {(props) => <LoginScreen {...props} setLoggedIn={setLoggedIn} />}
            </Drawer.Screen>
            <Drawer.Screen name='Welcome'
              options={{ title: 'Home', tabBarAccessibilityLabel: 'Home', drawerIcon: (props) => <Icon {...props} name='home' /> }} >
              {(props) => (
                <><WelcomeScreen {...props}
                  isMenuActive={isMenuActive}
                  shouldShowMenu={shouldShowMenu} />
                {renderMenuItems()}</>
              )}
            </Drawer.Screen>
            <Drawer.Screen name='Feedback' component={FeedbackForm}
              options={{ title: 'Feedback', drawerIcon: (props) => <Icon {...props} name='comments' /> }}
            />
          </Drawer.Navigator>
        </View>
        <View style={appStyles.footer}>
          <LittleLemonFooter />
        </View>
      </NavigationContainer>
    </>
  );
}
