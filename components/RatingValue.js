import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Text, View } from "react-native";

const RatingValue = ({ ratingValue, reviews }) => {
  let tab = [];
  const stars = (ratingValue) => {
    let counter = 0;
    for (; counter < ratingValue; counter++) {
      tab.push(<Entypo name="star" size={24} color="orange" />);
    }

    if (counter < 5) {
      for (; counter < 5; counter++) {
        tab.push(<Entypo name="star" size={24} color="gray" />);
      }
    }
  };
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {stars(ratingValue)}
      {tab.map((elem, index) => {
        return <Text key={index}>{elem}</Text>;
      })}
      <Text style={{ color: "gray", marginLeft: 5 }}>{reviews} reviews </Text>
    </View>
  );
};

export default RatingValue;
