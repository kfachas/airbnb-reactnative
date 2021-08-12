// react:js/native
import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View } from "react-native";
import Distance from "../components/Distance";
// Icons
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
// Dimensions
import { Dimensions } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
//  Location
import Location, { installWebGeolocationPolyfill } from "expo-location";
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// navigator.geolocation = require("@react-native-community/geolocation");
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
          // const location = await Location.getCurrentPositionAsync();
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
      <View style={{ height: 100 }}>
        <GooglePlacesAutocomplete
          styles={{
            container: { flex: 1 },
          }}
          placeholder="Search locations"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // details exist if fetchDetails = true
            console.log("DETAILS =>> ", Object.key(details));
          }}
          query={{
            key: "AIzaSyALKaefFkdtwubPa1iOhQbhWZKGTlsnIYI",
            language: "fr",
            components: "country:fr",
          }}
          enablePoweredByContainer={true}
          autoFocus={false}
          returnKeyType={"default"}
          onNotFound={() => {
            console.log("t nul");
          }}
          minLength={3}
          // currentLocation={true}
          // currentLocationLabel="Current location"
        />
      </View>
      <MapView
        style={{ width, height: 600 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={
          okay
            ? {
                latitude: latitude, // User
                longitude: longitude,
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
              latitude, // User
              longitude,
            }}
            call
            draggable={true}
            pinColor="black"
            onDragStart={(e) => {
              console.log("Drag start", e.nativeEvent.coordinate);
            }}
            onDragEnd={(e) => {
              console.log("Drag end", e.nativeEvent.coordinate);
            }}
            style={{ alignItems: "center" }}
          >
            <View
              style={{ backgroundColor: "white", borderRadius: 10, padding: 5 }}
            >
              <Text
                style={{
                  padding: 2,
                }}
              >
                I'm here
              </Text>
            </View>
            <Ionicons name="location" size={35} color="#F9575C" />
          </Marker>
        )}
        <View>
          <Circle
            center={{ longitude, latitude }}
            radius={5000}
            fillColor="rgba(64,224,208, 0.5)"
          />
        </View>
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
                numberOfLines={1}
                ellipsizeMode="tail"
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
              <Ionicons name="location" size={24} color="black" />
            </Marker>
          );
        })}
      </MapView>
    </SafeAreaView>
  );
}
