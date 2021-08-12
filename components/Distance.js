import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { getDistance, convertDistance } from "geolib";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Distance = ({ itemLocal }) => {
  //   const [userLocation, setUserLocation] = useState();
  //   const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const stored = await AsyncStorage.getItem("userLocation");
  //         if (stored) {
  //           const userLocation = JSON.parse(stored);
  //           setUserLocation(userLocation);
  //           setIsLoading(false);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  //   let distance = getDistance(
  //     {
  //       latitude: userLocation.latitude,
  //       longitude: userLocation.longitude,
  //     },
  //     { latitude: itemLocal[1], longitude: itemLocal[0] }
  //   );

  return (
    <View>
      {/* <Text>Distance: {convertDistance(distance, "km").toFixed(2)}km</Text> */}
    </View>
  );
};

export default Distance;
