import { StyleSheet, View } from 'react-native';
import LogInOutButton from './components/LogInOutButton';
import LittleLemonFooter from './components/LittleLemonFooter';
import WelcomeScreen from './components/WelcomeScreen';
import MenuItems from './components/MenuItems';
import FeedbackForm from './components/FeedbackForm';
import LoginScreen from './components/LoginScreen';
import { useState, useCallback, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DarkGreen, DarkGrey, LemonYellow } from './utils/Colors';
import ThemeContext from './context/ThemeContext';

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

  const {theme} = useContext(ThemeContext);
  const Tab = createBottomTabNavigator();

  const renderMenuItems = useCallback(() => {
    return isMenuActive === true && <MenuItems />;
  }, [isMenuActive]);

  return (
    <><NavigationContainer>
        <View style={[ 
          appStyles.body, 
          theme !== 'light' 
            ? { backgroundColor: DarkGrey, color: 'white' }
            : { backgroundColor: 'white', color: DarkGrey }
        ]}>
          <Tab.Navigator
            initialRouteName='Welcome'
            backBehavior='history' //'initialRoute'
            screenOptions={{
              ...appStyles.navigatorOptions,
              headerRight: (props) => <LogInOutButton {...props} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            }}>
            <Tab.Screen name='Login' options={{
              /** hide login button on Login screen */
              headerRight: () => {},
              /** hide login button on bottom bar */
              tabBarButton: () => null
            }}>
              {(props) => <LoginScreen {...props} setLoggedIn={setLoggedIn} />}
            </Tab.Screen>
            <Tab.Screen name='Welcome'
              options={{ title: 'Home', tabBarAccessibilityLabel: 'Home', tabBarIcon: (props) => <Icon {...props} name='home' />, tabBarStyle: { display: isMenuActive ? 'none' : 'flex' }}} >
              {(props) => (
                <><WelcomeScreen {...props}
                  isMenuActive={isMenuActive}
                  shouldShowMenu={shouldShowMenu} />
                {renderMenuItems()}</>
              )}
            </Tab.Screen>
            <Tab.Screen name='Feedback' component={FeedbackForm}
              options={{ title: 'Feedback', tabBarAccessibilityLabel: 'Feedback', tabBarIcon: (props) => <Icon {...props} name='comments' /> }}
            />
          </Tab.Navigator>
        </View>
        <View style={appStyles.footer}>
          <LittleLemonFooter />
        </View>
      </NavigationContainer>
    </>
  );
}
