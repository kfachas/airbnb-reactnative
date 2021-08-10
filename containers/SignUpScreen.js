import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
export default function SignUpScreen({ navigation }) {
  const [values, setValues] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState();
  const [errorFieldEmpty, setErrorFieldEmpty] = useState();
  const [errorMail, setErrorMail] = useState();
  const [errorUsername, setErrorUsername] = useState();
  const [onPress, setOnPress] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const handleSubmit = async () => {
    setOnPress(true);
    setErrorFieldEmpty(false);
    setErrorMessagePassword(false);
    setErrorMail(false);
    setErrorUsername(false);
    try {
      if (
        values.password !== "undefined" &&
        values.password === confirmPassword
      ) {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          values
        );
        alert("Inscription confirmed ! You can sign In now !");
        navigation.navigate("SignIn");
      } else {
        setOnPress(false);
        if (!values.password) {
          setErrorFieldEmpty(true);
        } else {
          setErrorMessagePassword(true);
        }
      }
    } catch (error) {
      setOnPress(false);
      console.log(error.response.data.error);
      if (error.response.data.error === "Missing parameters") {
        setErrorFieldEmpty(true);
      } else if (
        error.response.data.error === "This email already has an account."
      ) {
        setErrorMail(true);
      } else if (
        error.response.data.error === "This username already has an account."
      ) {
        setErrorUsername(true);
      }
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      }}
    >
      <KeyboardAwareScrollView>
        <StatusBar barStyle="dark-content" />
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
          <Text>Sign Up</Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TextInput
            style={styles.input}
            placeholder="Email"
            textContentType="emailAddress"
            onChangeText={(text) => {
              const obj = { ...values };
              console.log();
              obj.email = text;
              setValues(obj);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            textContentType="username"
            onChangeText={(text) => {
              const obj = { ...values };
              obj.username = text;
              setValues(obj);
            }}
          />

          <TextInput
            style={[
              styles.input,
              { height: 100, borderWidth: 2, textAlignVertical: "top" },
            ]}
            placeholder="describe yourself"
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => {
              const obj = { ...values };
              obj.description = text;
              setValues(obj);
            }}
          />

          <View style={[styles.input, { flexDirection: "row" }]}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Password"
              secureTextEntry={hidePassword ? true : false}
              textContentType="newPassword"
              onChangeText={(text) => {
                const obj = { ...values };
                obj.password = text;
                setValues(obj);
              }}
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
          <TextInput
            style={styles.input}
            placeholder="confirmPassword"
            secureTextEntry={hidePassword ? true : false}
            textContentType="newPassword"
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
          />
          {errorUsername && (
            <Text style={{ color: "#F9575C" }}>
              This username has already an account.
            </Text>
          )}
          {errorMail && (
            <Text style={{ color: "#F9575C" }}>
              This email has already an account.
            </Text>
          )}
          {errorMessagePassword && (
            <Text style={{ color: "#F9575C" }}>Passwords must be the same</Text>
          )}
          {errorFieldEmpty && (
            <Text style={{ color: "#F9575C" }}>Please fill all fields</Text>
          )}
          {onPress ? (
            <ActivityIndicator size="small" color="#F9575C" />
          ) : (
            <TouchableOpacity
              title="Sign up"
              onPress={handleSubmit}
              style={{
                borderWidth: 3,
                borderColor: "#F9575C",
                borderRadius: 20,
                paddingVertical: 10,
                paddingHorizontal: 50,
                marginTop: 40,
              }}
            >
              <Text style={{ color: "#606060" }}>Sign Up</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text>Already have an account ? Sign in</Text>
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
