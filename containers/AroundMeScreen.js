// react:js/native
import React, { useState, useEffect } from "react";
import { Text, ScrollView, SafeAreaView, View } from "react-native";
// Icons
import { Ionicons } from "@expo/vector-icons";

// Dimensions
import { Dimensions } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
//  Location
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// request
import axios from "axios";

export default function AroundMeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();

  const [userLocation, setUserLocation] = useState();
  const [okay, setOkay] = useState(false);
  useEffect(() => {
    const getPermission = async () => {
      try {
        // Demander la permission d'accès aux coordonnées de l'appareil
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          setOkay(true);
        } else {
          alert("Permission denied");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPermission();
  }, []);
  // if (okay) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`
        );
        setCoords(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [userLocation.latitude, userLocation.longitude]);
  // } else {
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(
  //           `https://express-airbnb-api.herokuapp.com/rooms/around`
  //         );
  //         setCoords(response.data);
  //         setIsLoading(false);
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     };
  //     fetchData();
  //   }, []);
  // }
  return isLoading ? (
    <Text>En cours de chargements de votre position..</Text>
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ backgroundColor: "white", flex: 1 }}>
        <View>
          <View style={{ alignItems: "center" }}>
            <MapView
              style={{ height, width }}
              initialRegion={
                okay
                  ? {
                      latitude: userLocation.latitude,
                      longitude: userLocation.longitude,
                      latitudeDelta: 0.2,
                      longitudeDelta: 0.2,
                    }
                  : {
                      latitude: 48.859403,
                      longitude: 2.342836,
                      latitudeDelta: 0.2,
                      longitudeDelta: 0.2,
                    }
              }
              showsUserLocation={true}
              provider={PROVIDER_GOOGLE}
            >
              {/* {!okay && (
                <Marker
                  coordinate={{ latitude: 48.859403, longitude: 2.342836 }}
                />
              )} */}
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
                    <Ionicons name="location" size={24} color="red" />
                  </Marker>
                );
              })}
            </MapView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
