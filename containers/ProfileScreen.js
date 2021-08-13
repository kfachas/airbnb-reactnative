import React, { useState, useEffect } from "react";
import {
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  View,
  Platform,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Image,
} from "react-native";
import Constants from "expo-constants";
// Icons
import { MaterialIcons, Fontisto } from "@expo/vector-icons";
// AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
// request backend
import axios from "axios";

import * as ImagePicker from "expo-image-picker";
export default function ProfileScreen({ userToken, setToken }) {
  const [hover, setHover] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [newUserData, setNewUserData] = useState({});

  // image of user
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [uploading, setUploading] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = await AsyncStorage.getItem("userItems");
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setUserData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  handleImagePicked = (pickerResult) => {
    const uri = pickerResult.uri;
    setSelectedPicture(uri);
    setHover(false);
  };

  const updateData = async () => {
    try {
      setUploading(true);
      if (selectedPicture) {
        const formData = new FormData();

        let splitUri = selectedPicture.split(".");
        const extension = splitUri[1];
        formData.append("photo", {
          uri: selectedPicture,
          name: `${userData.username}.${extension}`,
          type: `image/${extension}`,
        });
        const response = await axios.put(
          "https://express-airbnb-api.herokuapp.com/user/upload_picture",
          formData,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
      }
      setUploading(false);
      if (newUserData) {
        const response = await axios.put(
          "https://express-airbnb-api.herokuapp.com/user/update",
          {
            email: newUserData.email,
            description: newUserData.description,
            username: newUserData.username,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return isLoading ? (
    <ActivityIndicator style={{ flex: 1 }} size={30} />
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          padding: 20,
          alignItems: "center",
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: 150,
              width: 150,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 3,
              borderRadius: 150,
              borderColor: "#FFBAC0",
            }}
          >
            {uploading ? (
              <ActivityIndicator />
            ) : selectedPicture ? (
              <Image
                source={{ uri: selectedPicture }}
                style={{ height: 145, width: 145, borderRadius: 150 }}
              />
            ) : userData.photo ? (
              <Image
                source={{ uri: userData.photo[0].url }}
                style={{ height: 145, width: 145, borderRadius: 150 }}
              />
            ) : (
              <Fontisto name="person" size={80} color="lightgray" />
            )}
          </View>
          <View
            style={{
              marginLeft: 20,
              justifyContent: "space-between",
              height: 80,
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="add-photo-alternate"
              size={30}
              color={hover ? "black" : "gray"}
              onPress={async () => {
                setHover(!hover);
                const mediaLibraryUser =
                  await ImagePicker.requestMediaLibraryPermissionsAsync();
                // only if user allows permission to camera roll

                if (mediaLibraryUser.status === "granted") {
                  const pickerResult =
                    await ImagePicker.launchImageLibraryAsync({
                      allowsEditing: true,
                      aspect: [4, 3],
                    });

                  if (!pickerResult.cancelled) {
                    handleImagePicked(pickerResult);
                  }
                  setHover(false);
                } else {
                  console.log("permission denied");
                  setHover(false);
                }
              }}
            />
            <MaterialIcons
              name="add-a-photo"
              size={30}
              color={hover2 ? "black" : "gray"}
              onPress={async () => {
                setHover2(!hover2);
                const cameraPerm =
                  await ImagePicker.requestCameraPermissionsAsync();
                if (cameraPerm.granted) {
                  const pickerResult = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                  });
                  if (!pickerResult.cancelled) {
                    handleImagePicked(pickerResult);
                    setHover2(false);
                  } else {
                    setHover2(false);
                  }
                }
              }}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <TextInput
            style={styles.input}
            defaultValue={userData.email}
            onChange={(text) => {
              const obj = { ...newUserData };
              obj.email = text;
              setNewUserData(obj);
            }}
          />
          <TextInput
            style={styles.input}
            defaultValue={userData.username}
            onChange={(text) => {
              const obj = { ...newUserData };
              obj.username = text;
              setNewUserData(obj);
            }}
          />
          <TextInput
            style={[
              styles.input,
              { height: 100, borderWidth: 2, textAlignVertical: "top" },
            ]}
            defaultValue={userData.description}
            multiline={true}
            numberOfLines={4}
            onChange={(text) => {
              const obj = { ...newUserData };
              obj.description = text;
              setNewUserData(obj);
            }}
          />
        </View>

        <TouchableOpacity
          style={{
            borderWidth: 3,
            borderColor: "#F9575C",
            borderRadius: 20,
            paddingVertical: 10,
            width: 150,
            marginTop: 50,
          }}
          onPress={updateData}
        >
          <Text style={{ textAlign: "center" }}>UPDATE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 3,
            borderColor: "#F9575C",
            borderRadius: 20,
            paddingVertical: 10,
            marginTop: 20,
            width: 150,
          }}
          title="Log Out"
          onPress={() => {
            setToken(null);
          }}
        >
          <Text style={{ textAlign: "center" }}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    padding: 5,
    borderBottomWidth: 2,
    borderColor: "#FFBAC0",
    marginBottom: 20,
  },
});
