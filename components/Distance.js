import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { getDistance, convertDistance } from "geolib";

const Distance = ({ itemLocal, latitude, longitude }) => {
  let distance = getDistance(
    {
      latitude: latitude,
      longitude: longitude,
    },
    { latitude: itemLocal[1], longitude: itemLocal[0] }
  );

  return (
    <Text
      style={{
        fontSize: 12,
        textAlign: "center",
        backgroundColor: "white",
        width: 100,
      }}
    >
      Distance: {convertDistance(distance, "km").toFixed(2)}km
    </Text>
  );
};

export default Distance;
