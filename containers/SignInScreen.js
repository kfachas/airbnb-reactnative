import React, { useState } from "react";
import axios from "axios";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SignInScreen({ setToken, navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [values, setValues] = useState({});
  const [onPress, setOnPress] = useState(false);
  const [errorNotCorrect, setErrorNotCorrect] = useState();
  const [errorFieldEmpty, setErrorFieldEmpty] = useState();
  const obj = { ...values };
  const handleSubmit = async () => {
    setOnPress(true);
    setErrorNotCorrect(false);
    setErrorFieldEmpty(false);
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        values
      );
      await AsyncStorage.setItem("userItems", response.data.id);
      setToken(response.data.token);
    } catch (error) {
      setOnPress(false);
      if (error.response.data.error === "Unauthorized") {
        setErrorNotCorrect(true);
      } else if ((error.response.data.error = "Missing parameters")) {
        setErrorFieldEmpty(true);
      }
      console.log(error.response.data.error);
      console.log(error.message);
    }
  };
  console.log(obj);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <View
          style={{
            height: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ height: 100, width: 100 }}
            source={require("../assets/airbnb-logo.png")}
          />
          <Text>Sign In</Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Input
            style={styles.input}
            placeholder="email"
            textContentType="emailAddress"
            type="email"
            values={values}
            setValues={setValues}
          />

          <View
            style={[
              styles.input,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            <Input
              style={{ flex: 1 }}
              placeholder="Password"
              secure={hidePassword ? true : false}
              type="password"
              textContentType="newPassword"
              values={values}
              setValues={setValues}
            />
            {hidePassword ? (
              <Entypo
                name="eye"
                size={24}
                color="black"
                onPress={() => setHidePassword(false)}
              />
            ) : (
              <Entypo
                name="eye-with-line"
                size={24}
                color="black"
                onPress={() => setHidePassword(true)}
              />
            )}
          </View>
          {errorNotCorrect && (
            <Text style={{ color: "#F9575C" }}>
              Email/password are not correct
            </Text>
          )}
          {errorFieldEmpty && (
            <Text style={{ color: "#F9575C" }}>Please fill all fields</Text>
          )}
          {onPress ? (
            <ActivityIndicator size="small" color="#F9575C" />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                borderWidth: 3,
                borderColor: "#F9575C",
                borderRadius: 20,
                paddingVertical: 10,
                paddingHorizontal: 50,
                marginTop: 40,
                width: 150,
              }}
            >
              <Text style={{ color: "#606060" }}>Sign In</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>No account ? Register now !</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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
