import React, { useState, useEffect } from "react";
import { Text, StatusBar, ScrollView, SafeAreaView, View } from "react-native";
import * as Location from "expo-location";
import { Permissions, Request } from "expo-permissions";
import MapView, { Marker } from "react-native-maps";
import { getDistance, convertDistance } from "geolib";
export default function AroundMeScreen({ setToken, navigation }) {
  const [values, setValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Wait, we are fetching you location..."
  );

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    console.log(enabled);
    if (!enabled) {
      alert(
        "Location Service not enabled",
        "Please enable your location services to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };
  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      const obj = { ...values };
      obj.latitude = latitude;
      obj.longitude = longitude;
      setValues(obj);

      setIsLoading(false);
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      //   pour avoir coordonnées précices de la localisation
      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

        setDisplayCurrentAddress(address);
      }
    }
  };

  return isLoading ? (
    <Text>En cours de chargements de votre position..</Text>
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ backgroundColor: "white", flex: 1 }}>
        <View>
          <Text>Votre adresse :</Text>
          <Text>{displayCurrentAddress}</Text>
          <MapView
            style={{ height: 200, backgroundColor: "black" }}
            initialRegion={{
              latitude: values.latitude,
              longitude: values.longitude,
              latitudeDelta: 0.08,
              longitudeDelta: 0.08,
            }}
          >
            <Marker
              coordinate={{
                latitude: values.latitude,
                longitude: values.longitude,
              }}
            />
          </MapView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
