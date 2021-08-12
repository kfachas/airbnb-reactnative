// react:js/native
import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, TouchableOpacity } from "react-native";
import Distance from "../components/Distance";
// Icons
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
// Dimensions
import { Dimensions } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
//  Location
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getDistance, convertDistance } from "geolib";
// request
import axios from "axios";

export default function AroundMeScreen({ navigation }) {
  const [okay, setOkay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  useEffect(() => {
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          setLongitude(2.28322);
          setLatitude(48.863918);
          setOkay(true);
          setLoading(false);
        } else {
          setLongitude();
          setLatitude("");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPermission();
  }, []);
  useEffect(() => {
    if (!loading) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${latitude}&longitude=${longitude}`
          );
          setCoords(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchData();
    }
  }, [loading]);

  return isLoading ? (
    <LottieView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
      autoPlay
      source={require("../assets/loaderAroundMe.json")}
    />
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <MapView
        style={{ width, height }}
        provider={PROVIDER_GOOGLE}
        initialRegion={
          okay
            ? {
                latitude: 48.863918, // User
                longitude: 2.28322,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }
            : {
                latitude: 48.859403, // Paris Centre
                longitude: 2.342836,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }
        }
      >
        {okay && (
          <Marker
            coordinate={{
              latitude: 48.863918, // User
              longitude: 2.28322,
            }}
            title="Your position"
          ></Marker>
        )}
        {coords.map((elem, index) => {
          return (
            <Marker
              style={{
                alignItems: "center",
                width: 100,
              }}
              key={index}
              onPress={() => {
                navigation.navigate("Rooms", { id: elem._id });
              }}
              coordinate={{
                latitude: elem.location[1],
                longitude: elem.location[0],
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  backgroundColor: "white",
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                {elem.title}
              </Text>
              {okay && (
                <Distance
                  itemLocal={elem.location}
                  latitude={latitude}
                  longitude={longitude}
                />
              )}
              <Ionicons name="location" size={24} color="red" />
            </Marker>
          );
        })}
      </MapView>
    </SafeAreaView>
  );
}
