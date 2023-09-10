import { Pressable, StyleSheet, View, Text, useColorScheme } from 'react-native';
import LogInOutButton from './components/LogInOutButton';
import MenuButton from './components/MenuButton';
import LittleLemonFooter from './components/LittleLemonFooter';
import WelcomeScreen from './components/WelcomeScreen';
import MenuItems from './components/MenuItems';
import FeedbackForm from './components/FeedbackForm';
import LoginScreen from './components/LoginScreen';
import { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DarkGreen, DarkGrey, LemonYellow, LightGrey } from './utils/Colors';
import ProfileScreen from './components/ProfileScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const appStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: DarkGrey
  },
  footer: {
    backgroundColor: DarkGrey
  },
  logOutDrawerItem: {
    borderRadius: 5
  },
  logOutLink: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    bottom: 10,
    fontSize: 13,
    color: '#FF6969',
    textDecorationStyle: 'solid',
    // textDecorationLine: 'underline',
    textDecorationColor: '#FF6969'
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
    drawerActiveTintColor: DarkGreen,
    drawerActiveBackgroundColor: LemonYellow,
    drawerInactiveTintColor: DarkGrey
  }
});

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const colorScheme = useColorScheme();
  const LeftDrawer = createDrawerNavigator();
  const RightDrawer = createDrawerNavigator();

  const MenuDrawerScreen = () => (
    <RightDrawer.Navigator
      id="RightDrawer"
      drawerContent={(props) => <MenuItems {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        drawerAllowFontScaling: true,
        headerTitleAllowFontScaling: true,
        headerShown: false
    }}>
      <RightDrawer.Screen name='MenuItems' component={LeftDrawerScreens} />
    </RightDrawer.Navigator>);

  function LogoutDrawerContent(props) {
    const navigator = useNavigation();
    const defaultTextColor = colorScheme !== 'light' ? LightGrey : DarkGrey;

    const renderActiveTint = () => {
      return isLoginScreen ? DarkGreen : defaultTextColor;
    };

    const renderActiveBackground = () => {
      return isLoginScreen ? LemonYellow : DarkGrey;
    };

    return (
      <SafeAreaView style={{ flex: 1, position: 'absolute', width: '100%', bottom: 0, justifyContent: 'space-between' }} forceInset={{top: "always", horizontal: "never"}}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <DrawerContentScrollView {...props} style={{ flex: 1, alignContent: 'flex-end' }}>
          {isLoggedIn
            ? (
              <DrawerItem 
                name='Profile'
                accessibilityLabel={'View Profile'}
                label={'View Profile'}
                icon={props => 
                  <Icon
                    {...
                      {...props, color: colorScheme !== 'light'
                        ? LightGrey
                        : DarkGrey
                    }
                  }
                    name='user-circle' />}
                labelStyle={
                  colorScheme !== 'light'
                  ? { color: LightGrey, paddingLeft: 8 }
                  : { color: DarkGrey, paddingLeft: 8 }
                }
                style={appStyles.logOutDrawerItem}
                onPress={() => navigator.navigate('Profile')}
              />
            ) : (
              <DrawerItem 
                name='Login'
                accessibilityLabel={'Login'}
                label={'Login'}
                activeBackgroundColor='yellow'
                icon={props => 
                  <Icon
                    {...
                      {...props, color: colorScheme !== 'light'
                        ? LightGrey
                        : DarkGrey
                    }
                  }
                    name='user' />}
                labelStyle={
                  colorScheme !== 'light'
                  ? { color: LightGrey, paddingLeft: 8 }
                  : { color: DarkGrey, paddingLeft: 8 }
                }
                style={appStyles.logOutDrawerItem}
                onPress={() => navigator.navigate('Login')}
              />
            )
          }
          {isLoggedIn && (
            <Pressable
              accessibilityLabel={'Log out'}
              style={appStyles.logOutLink}
              onPress={() => { setLoggedIn(false) }}>
              <Text style={appStyles.logOutLink}>Log out</Text>
            </Pressable>
          )}
        </DrawerContentScrollView>
      </SafeAreaView>
    );
  }

  const LeftDrawerScreens = () => {
    return (<View style={[ 
      appStyles.body, 
      colorScheme !== 'light' 
        ? { backgroundColor: DarkGrey, color: 'white' }
        : { backgroundColor: 'white', color: DarkGrey }
    ]}>
      <LeftDrawer.Navigator
        id='LeftDrawer'
        initialRouteName='Welcome'
        drawerContent={props => <LogoutDrawerContent {...props} />}
        backBehavior='history' //'initialRoute'
        screenOptions={{
          ...appStyles.navigatorOptions,
          drawerAllowFontScaling: true,
          headerTitleAllowFontScaling: true,
          drawerStyle: {
            backgroundColor: colorScheme !== 'light' ? DarkGrey : 'white'
          },
          drawerPosition: 'left',
          drawerInactiveTintColor: colorScheme !== 'light' ? LightGrey : DarkGrey, 
          headerRight: (props) => <MenuButton {...props} />
        }}>
        <LeftDrawer.Screen name='Login' options={{
          /** hide menu button on Login screen */
          headerRight: () => {},
          /** hide this login button in drawer */
          drawerItemStyle: { display: 'none' }
        }}>
          {(props) => <LoginScreen {...props} setLoggedIn={setLoggedIn} />}
        </LeftDrawer.Screen>
        <LeftDrawer.Screen name='Profile' options={{
          headerRight: (props) => <LogInOutButton {...props} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />,
          /** hide this profile button in drawer */
          drawerItemStyle: { display: 'none' }
        }}>
          {(props) => <ProfileScreen {...props} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}
        </LeftDrawer.Screen>
        <LeftDrawer.Screen name='Welcome' component={WelcomeScreen}
          options={{ title: 'Home', drawerIcon: (props) => <Icon {...props} name='home' /> }} />
        <LeftDrawer.Screen name='Feedback' component={FeedbackForm}
          options={{ title: 'Feedback', drawerIcon: (props) => <Icon {...props} name='comments' /> }}
        />
      </LeftDrawer.Navigator>
    </View>
  )};

  return (
    <><NavigationContainer>
        <MenuDrawerScreen />
        <View style={appStyles.footer}>
          <LittleLemonFooter />
        </View>
      </NavigationContainer>
    </>
  );
}
