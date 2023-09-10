import { StyleSheet, View, useColorScheme } from 'react-native';
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
import { DarkGreen, DarkGrey, LemonYellow } from './utils/Colors';
import ProfileScreen from './components/ProfileScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  logOutDrawerItem: {
    borderRadius: 5
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
        headerShown: false
    }}>
      <RightDrawer.Screen name='MenuItems' component={LeftDrawerScreens} />
    </RightDrawer.Navigator>);

  function LogoutDrawerContent(props) {
    const navigator = useNavigation();

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
                label={'View Profile'}
                icon={props => <Icon {...props} name='user-circle' />}
                style={appStyles.logOutDrawerItem}
                onPress={() => navigator.navigate('Profile')}
              />
            ) : (
              <DrawerItem 
                name='Login'
                label={'Login'}
                icon={props => <Icon {...props} name='user' />}
                style={appStyles.logOutDrawerItem}
                onPress={() => navigator.navigate('Login')}
              />
            )
          }
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
          drawerPosition: 'left',
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
          options={{ title: 'Home', headerRight: () => {}, drawerIcon: (props) => <Icon {...props} name='home' /> }} />
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
