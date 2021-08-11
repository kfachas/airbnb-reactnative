import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import RatingValue from "../components/RatingValue";

const width = Dimensions.get("window").width;
console.log(Location);
export default function RoomsScreen() {
  const { params } = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [roomData, setRoomData] = useState();
  const [limitLines, setLimitLines] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.id}`
        );
        setRoomData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator
      style={{ flex: 1, backgroundColor: "white" }}
      size="large"
      color="#F9575C"
    />
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <View style={{ position: "relative" }}>
          <SwiperFlatList
            horizontal={true}
            autoplay
            autoplayDelay={5}
            autoplayLoop
            index={2}
            showPagination
            data={roomData.photos}
            renderItem={({ item }) => (
              <View>
                <Image
                  style={{ height: 250, width: width }}
                  source={{ uri: item.url }}
                />
              </View>
            )}
          />
          <View style={styles.price}>
            <Text style={styles.priceText}>{roomData.price} €</Text>
          </View>
        </View>
        <View style={styles.descriptionRoom}>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{ fontSize: 20, marginBottom: 10 }}
            >
              {roomData.title}
            </Text>
            <RatingValue
              reviews={roomData.reviews}
              ratingValue={roomData.ratingValue}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Image
              style={styles.imgProfile}
              source={{ uri: roomData.user.account.photo.url }}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, fontSize: 16, marginBottom: 20 }}>
          <Text ellipsizeMode="tail" numberOfLines={limitLines ? 3 : 0}>
            {roomData.description}
          </Text>
          <Text
            style={{ color: "gray", marginTop: 10 }}
            onPress={() => {
              setLimitLines(!limitLines);
            }}
          >
            {limitLines ? (
              <Text>
                Show more <AntDesign name="caretdown" size={16} color="gray" />
              </Text>
            ) : (
              <Text>
                Show less <AntDesign name="caretup" size={16} color="gray" />
              </Text>
            )}
          </Text>
        </View>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: roomData.location[1],
            longitude: roomData.location[0],
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          }}
        >
          <Marker
            coordinate={{
              latitude: roomData.location[1],
              longitude: roomData.location[0],
            }}
          />
        </MapView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  price: {
    color: "white",
    position: "absolute",
    opacity: 0.7,
    bottom: 10,
    padding: 10,
    backgroundColor: "black",
    width: 80,
  },
  priceText: {
    color: "white",
    textAlign: "center",
  },
  descriptionRoom: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imgProfile: { height: 70, width: 70, borderRadius: 50 },
});
