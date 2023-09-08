import { Pressable, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import LittleLemonHeader from './components/LittleLemonHeader';
import LogInOutButton from './components/LogInOutButton';
import LittleLemonFooter from './components/LittleLemonFooter';
import LittleLemonWelcome from './components/LittleLemonWelcome';
import WelcomeScreen from './components/WelcomeScreen';
import MenuItems from './components/MenuItems';
import FeedbackForm from './components/FeedbackForm';
import LoginScreen from './components/LoginScreen';
import { useState, useCallback } from 'react';
import Welcome from './components/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const lemonGreen = '#495E57';
const appStyles = StyleSheet.create({
  header: {
    flex: 0.2,
    maxHeight: 100
  },
  body: {
    flex: 1,
    backgroundColor: '#333333' //lemonGreen
  },
  footer: {
    backgroundColor: '#333333' //lemonGreen
  },
  navigatorOptions: {
    headerTitleAlign: 'center',
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white'
    },
    headerStyle: {
      backgroundColor: lemonGreen
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
        {/* <View style={appStyles.header}>
          <LittleLemonHeader isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        </View> */}
        <View style={[ 
          appStyles.body, 
          colorScheme !== 'light' 
            ? { backgroundColor: '#333333', color: '#fff' }
            : { backgroundColor: '#fff', color: '#333333' }
        ]}>
          <Stack.Navigator
            initialRouteName='Welcome'
            screenOptions={{
              ...appStyles.navigatorOptions,
              headerRight: (props) => <LogInOutButton {...props} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            }}>
            {/* <Stack.Group> */}
              <Stack.Screen name='Login'>
                {(props) => <LoginScreen {...props} setLoggedIn={setLoggedIn} />}
              </Stack.Screen>
              {/* <Stack.Screen options={{ title: 'Home' }} name='Welcome' component={Welcome} /> */}
              <Stack.Screen options={{ title: 'Home' }} name='Welcome'>
                {(props) => (
                  <><WelcomeScreen {...props}
                    isMenuActive={isMenuActive}
                    shouldShowMenu={shouldShowMenu} />
                  {renderMenuItems()}</>
                )}
              </Stack.Screen>
              <Stack.Screen options={{ title: 'A Lemon for your thoughts...' }} name='Feedback' component={FeedbackForm} />
            {/* </Stack.Group> */}
          </Stack.Navigator>
        </View>
        <View style={appStyles.footer}>
          <LittleLemonFooter />
        </View>
      </NavigationContainer>
    </>
  );
}
