import { Pressable, StyleSheet, Image, View, Text, Platform } from 'react-native';
import LogInOutButton from './components/LogInOutButton';
import MenuButton from './components/MenuButton';
import ThemeButton from './components/ThemeButton';
import LittleLemonFooter from './components/LittleLemonFooter';
import Welcome from './components/Welcome';
import WelcomeScreen from './components/WelcomeScreen';
import SubscribeScreen from './components/SubscribeScreen';
import MenuItems from './components/MenuItems';
import FeedbackForm from './components/FeedbackForm';
import LoginScreen from './components/LoginScreen';
import { useCallback, useContext, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DarkGreen, DarkGrey, LemonYellow, LightGrey } from './utils/Colors';
import ProfileScreen from './components/ProfileScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomDrawerSelection } from './components/types';
import { isNullUndefinedOrEmpty } from './utils/String';
import ThemeContext, { ThemeProvider } from './context/ThemeContext';

const appStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: DarkGrey
  },
  footer: {
    backgroundColor: DarkGrey
  },
  drawerIcon: {
    alignSelf: 'center',
    maxWidth: 250,
    maxHeight: 250,
    marginBottom: Platform.OS === 'ios' ? 75 : 100
  },
  logOutDrawerItem: {
    borderRadius: 5
  },
  logOutLink: {
    position: 'absolute',
    alignItems: 'flex-end',
    marginVertical: Platform.OS === 'ios' ? 40 : 55,
    verticalAlign: 'middle',
    paddingHorizontal: 10,
    bottom: Platform.OS === 'ios' ? 9 : 11,
    right: 5,
    backgroundColor: '#B30000',
    color: LightGrey,
    fontWeight: '700'
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
  const LeftDrawer = createDrawerNavigator();
  const RightDrawer = createDrawerNavigator();
  let customDrawerSelection = CustomDrawerSelection.None;

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

  const setCustomDrawerSelection = useCallback((updatedRoute) => {
    customDrawerSelection = updatedRoute;
  }, [customDrawerSelection]);

  function LogoutDrawerContent(props) {
    const {theme} = useContext(ThemeContext);
    const navigator = useNavigation();
    const defaultTextColor = theme !== 'light' ? LightGrey : DarkGrey;
    const defaultBackground = theme !== 'light' ? DarkGrey : 'white';

    const renderActiveTint = useCallback((routeName) => {
      return isNullUndefinedOrEmpty(customDrawerSelection) === false
        ? (customDrawerSelection.toLowerCase() === routeName.toLowerCase()
          ? DarkGreen
          : defaultTextColor)
        : defaultTextColor;
    }, [customDrawerSelection, navigator, theme]);

    const renderActiveBackground = useCallback((routeName) => {
      return isNullUndefinedOrEmpty(customDrawerSelection) === false
        ? (customDrawerSelection?.toLowerCase() === routeName.toLowerCase()
          ? LemonYellow
          : defaultBackground)
        : defaultBackground;
    }, [customDrawerSelection, navigator, theme]);

    return (
      <SafeAreaView style={{ flex: 1, position: 'absolute', width: '100%', bottom: 0, justifyContent: 'space-between' }} forceInset={{top: "always", horizontal: "never"}}>
        <Image
          resizeMode='center'
          style={appStyles.drawerIcon}
          accessible={true}
          accessibilityLabel={'Little Lemon logo'}
          source={require('./img/littleLemonLogo.png')} />
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <DrawerContentScrollView {...props} style={{ flex: 1, alignContent: 'flex-end' }}>
          {isLoggedIn
            ? (
              <DrawerItem 
                name={CustomDrawerSelection.Profile}
                accessibilityLabel={'View Profile'}
                label={'View Profile'}

                /** Workaround to simulate active appearance on route change */
                inactiveBackgroundColor={renderActiveBackground(CustomDrawerSelection.Profile)}
                inactiveTintColor={renderActiveTint(CustomDrawerSelection.Profile)}
                allowFontScaling={true}
                icon={props => 
                  <Icon
                    {...
                      {...props, color: renderActiveTint(CustomDrawerSelection.Profile)
                    }
                  }
                    name='user-circle' />}
                labelStyle={{ color: renderActiveTint(CustomDrawerSelection.Profile), paddingLeft: 0 }}
                style={appStyles.logOutDrawerItem}
                onPress={() => {
                  navigator.navigate(CustomDrawerSelection.Profile);
                }}
              />
            ) : (
              <DrawerItem 
                name={CustomDrawerSelection.Login}
                accessibilityLabel={'Login'}
                label={'Login'}
                allowFontScaling={true}

                /** Workaround to simulate active appearance on route change */
                inactiveBackgroundColor={renderActiveBackground(CustomDrawerSelection.Login)}
                inactiveTintColor={renderActiveTint(CustomDrawerSelection.Login)}

                icon={props => 
                  <Icon
                    {...
                      {...props, color: renderActiveTint(CustomDrawerSelection.Login)
                    }
                  }
                    name='user' />}
                labelStyle={{ color: renderActiveTint(CustomDrawerSelection.Login), paddingLeft: 8 }}
                style={appStyles.logOutDrawerItem}
                onPress={() => {
                  navigator.navigate(CustomDrawerSelection.Login);
                }}
              />
            )
          }
          {isLoggedIn && (
            <Pressable
              accessibilityLabel={'Log out'}
              style={{ ...appStyles.button, ...appStyles.logOutLink }}
              onPress={() => {
                setLoggedIn(false);
              }}>
              <Text style={appStyles.logOutLink}>Log out</Text>
            </Pressable>
          )}

          <DrawerItem 
            name={CustomDrawerSelection.Subscribe}
            accessibilityLabel={'Subscribe to our Newsletter'}
            label={'Newsletter'}
            allowFontScaling={true}

            /** Workaround to simulate active appearance on route change */
            inactiveBackgroundColor={renderActiveBackground(CustomDrawerSelection.Subscribe)}
            inactiveTintColor={renderActiveTint(CustomDrawerSelection.Subscribe)}

            icon={props => 
              <Icon
                {...
                  {...props, color: renderActiveTint(CustomDrawerSelection.Subscribe)
                }
              }
                name='envelope' />}
            labelStyle={{ color: renderActiveTint(CustomDrawerSelection.Subscribe), paddingLeft: 1 }}
            style={appStyles.logOutDrawerItem}
            onPress={() => {
              navigator.navigate(CustomDrawerSelection.Subscribe);
            }}
          />

          <View style={{ marginBottom: 0 }}>
            <ThemeButton />
          </View>
        </DrawerContentScrollView>
      </SafeAreaView>
    );
  }

  const LeftDrawerScreens = () => {
    const {theme} = useContext(ThemeContext);

    return (<View style={[ 
      appStyles.body, 
      theme !== 'light' 
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
            backgroundColor: theme !== 'light' ? DarkGrey : 'white'
          },
          drawerPosition: 'left',
          drawerInactiveTintColor: theme !== 'light' ? LightGrey : DarkGrey,
          headerRight: (props) => <MenuButton {...props} />
        }}>
        <LeftDrawer.Screen name='Login' options={{
          unmountOnBlur: true,
          /** hide menu button on Login screen */
          headerRight: () => {},
          /** hide this login button in drawer */
          drawerItemStyle: { display: 'none' }
        }}>
          {(props) => <LoginScreen {...props} setLoggedIn={setLoggedIn} setCustomDrawerSelection={setCustomDrawerSelection} />}
        </LeftDrawer.Screen>
        <LeftDrawer.Screen name='Profile' options={{
          unmountOnBlur: true,
          headerRight: (props) => <LogInOutButton {...props} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />,
          /** hide this profile button in drawer */
          drawerItemStyle: { display: 'none' }
        }}>
          {(props) => <ProfileScreen {...props} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} setCustomDrawerSelection={setCustomDrawerSelection} />}
        </LeftDrawer.Screen>
        <LeftDrawer.Screen name='Subscribe' options={{
          unmountOnBlur: true,
          /** hide menu button on Login screen */
          headerRight: () => {},
          /** hide this login button in drawer */
          drawerItemStyle: { display: 'none' }
        }}>
          {(props) => <SubscribeScreen {...props} setLoggedIn={setLoggedIn} setCustomDrawerSelection={setCustomDrawerSelection} />}
        </LeftDrawer.Screen>

        {/* <LeftDrawer.Screen name='Home' options={{ title: 'Home', drawerIcon: (props) => <Icon {...props} name='home' /> }}>
          {(props) => <WelcomeScreen {...props} setCustomDrawerSelection={setCustomDrawerSelection} />}
        </LeftDrawer.Screen> */}
        <LeftDrawer.Screen name='Welcome' options={{ title: 'Welcome', drawerIcon: (props) => <Icon {...props} name='home' /> }}>
          {(props) => <Welcome {...props} setCustomDrawerSelection={setCustomDrawerSelection} />}
        </LeftDrawer.Screen>
        <LeftDrawer.Screen name='Feedback' options={{ title: 'Feedback', drawerIcon: (props) => <Icon {...props} name='comments' /> }}>
          {(props) => <FeedbackForm {...props} setCustomDrawerSelection={setCustomDrawerSelection} />}
        </LeftDrawer.Screen>
      </LeftDrawer.Navigator>
    </View>
  )};

  return (
    <><ThemeProvider>
      <NavigationContainer>
        <MenuDrawerScreen />
        <View style={appStyles.footer}>
          <LittleLemonFooter />
        </View>
      </NavigationContainer>
    </ThemeProvider></>
  );
}
