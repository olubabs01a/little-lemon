import { StyleSheet, View, useColorScheme } from 'react-native';
import LogInOutButton from './components/LogInOutButton';
import LittleLemonFooter from './components/LittleLemonFooter';
import WelcomeScreen from './components/WelcomeScreen';
import MenuItems from './components/MenuItems';
import FeedbackForm from './components/FeedbackForm';
import LoginScreen from './components/LoginScreen';
import { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DarkGreen, DarkGrey } from './utils/Colors';

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
    }
  }
});

export default function App() {
  const [isMenuActive, shouldShowMenu] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const colorScheme = useColorScheme();
  const Stack = createStackNavigator();

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
          <Stack.Navigator
            initialRouteName='Welcome'
            screenOptions={{
              ...appStyles.navigatorOptions,
              headerRight: (props) => <LogInOutButton {...props} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            }}>
            <Stack.Screen name='Login'>
              {(props) => <LoginScreen {...props} setLoggedIn={setLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen options={{ title: 'Home' }} name='Welcome'>
              {(props) => (
                <><WelcomeScreen {...props}
                  isMenuActive={isMenuActive}
                  shouldShowMenu={shouldShowMenu} />
                {renderMenuItems()}</>
              )}
            </Stack.Screen>
            <Stack.Screen options={{ title: 'Feedback' }} name='Feedback' component={FeedbackForm} />
          </Stack.Navigator>
        </View>
        <View style={appStyles.footer}>
          <LittleLemonFooter />
        </View>
      </NavigationContainer>
    </>
  );
}
