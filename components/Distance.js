import { View, Text } from "react-native";
import React from "react";
import { getDistance, convertDistance } from "geolib";
const Distance = ({ values, itemLocal }) => {
  let distance = getDistance(
    { latitude: values.latitude, longitude: values.longitude },
    { latitude: itemLocal[1], longitude: itemLocal[0] }
  );
  console.log(convertDistance(distance, "km"));
  return (
    <View>
      <Text>Distance: {convertDistance(distance, "km").toFixed(2)}km</Text>
    </View>
  );
};

export default Distance;
