import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
// Screens
import HomeScreen from "./containers/HomeScreen";
import RoomsScreen from "./containers/RoomsScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import AroundMeScreen from "./containers/AroundMeScreen";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import * as Location from "expo-location";
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  // const [values, setValues] = useState({});
  // // localisation user
  // const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  // const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
  //   "Wait, we are fetching you location..."
  // );

  // useEffect(() => {
  //   const CheckIfLocationEnabled = async () => {
  //     let enabled = await Location.hasServicesEnabledAsync();

  //     if (!enabled) {
  //       alert(
  //         "Location Service not enabled",
  //         "Please enable your location services to continue",
  //         [{ text: "OK" }],
  //         { cancelable: false }
  //       );
  //     } else {
  //       setLocationServiceEnabled(enabled);
  //     }
  //   };
  //   const GetCurrentLocation = async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();

  //     if (status !== "granted") {
  //       const obj = { ...values };
  //       obj.longitude = "undefined";
  //       obj.latitude = "undefined";
  //       setValues(obj);
  //       Alert.alert(
  //         "Permission not granted",
  //         "Allow the app to use location service.",
  //         [{ text: "OK" }],
  //         { cancelable: false }
  //       );
  //     }

  //     let { coords } = await Location.getCurrentPositionAsync();

  //     if (coords) {
  //       const { latitude, longitude } = coords;
  //       const obj = { ...values };
  //       obj.latitude = latitude;
  //       obj.longitude = longitude;
  //       setValues(obj);
  //       setIsLoading(false);
  //       let response = await Location.reverseGeocodeAsync({
  //         latitude,
  //         longitude,
  //       });
  //       // pour avoir coordonnées précices de la localisation
  //       //   for (let item of response) {
  //       //     let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

  //       // setDisplayCurrentAddress(address);
  //       //   }
  //     }
  //   };
  //   CheckIfLocationEnabled();
  //   GetCurrentLocation();
  // }, []);
  // console.log(values);
  // // Auth user

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.

      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);
  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen name="SignIn" options={{ headerShown: false }}>
            {(props) => <SignInScreen {...props} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp" options={{ headerShown: false }}>
            {(props) => <SignUpScreen {...props} setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Tab">
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        headerLeftLabelVisible: false,
                        headerTintColor: "#F9575C",
                        headerTitleAlign: "center",
                        headerTitle: () => (
                          <Image
                            style={{
                              width: 50,
                              height: 50,
                              marginBottom: 10,
                            }}
                            source={require("./assets/airbnb-logo.png")}
                          />
                        ),
                      }}
                    >
                      <Stack.Screen name="Home">
                        {(props) => <HomeScreen {...props} />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Rooms"
                        options={{
                          title: "Rooms",
                        }}
                      >
                        {() => <RoomsScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="AroundMeTab"
                  options={{
                    tabBarLabel: "Around me",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name="location-outline"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="AroundMe">
                        {(props) => (
                          <AroundMeScreen {...props} setToken={setToken} />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabSettings"
                  options={{
                    tabBarLabel: "My profile",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name="person-outline"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                      <Stack.Screen
                        name="Settings"
                        options={{ title: "Settings", tabBarLabel: "Settings" }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
