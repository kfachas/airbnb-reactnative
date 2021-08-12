import React, { useState, useEffect } from "react";
import {
  Text,
  StatusBar,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import LottieView from "lottie-react-native";
import RatingValue from "../components/RatingValue";
import Distance from "../components/Distance";
const width = Dimensions.get("window").width;

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <LottieView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
      autoPlay
      source={require("../assets/home.json")}
    />
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 10,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("Rooms", { id: item._id });
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <View
                style={{
                  position: "relative",
                }}
              >
                <Image
                  style={{
                    width: width - 20,
                    height: 200,
                  }}
                  source={{ uri: item.photos[0].url }}
                />
                <View style={styles.price}>
                  <Text style={[styles.priceText, { opacity: 1 }]}>
                    {item.price} €
                  </Text>
                </View>
              </View>

              <View style={styles.bottomImg}>
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
                    {item.title}
                  </Text>
                  <RatingValue
                    ratingValue={item.ratingValue}
                    reviews={item.reviews}
                  />
                  {/* <Distance itemLocal={item.location} /> */}
                </View>
                <View>
                  <Image
                    style={{ height: 70, width: 70, borderRadius: 50 }}
                    source={{ uri: item.user.account.photo.url }}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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
  bottomImg: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 20,
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});
