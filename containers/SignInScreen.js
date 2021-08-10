import React, { useState } from "react";
import axios from "axios";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function SignInScreen({ setToken, navigation }) {
  const [values, setValues] = useState({});
  const handleSubmit = async () => {
    try {
      const response = axios.post("http://localhost:3005/user/login", values);
      setToken(response.token);
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };
  return (
    <KeyboardAwareScrollView>
      <TextInput
        placeholder="email"
        textContentType="emailAddress"
        onChange={(e) => {
          const obj = { ...values };
          obj.email = e.target.value;
          setValues(obj);
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        textContentType="newPassword"
        onChange={(e) => {
          const obj = { ...values };
          obj.password = e.target.value;
          setValues(obj);
        }}
      />
      <Button title="Sign in" onPress={handleSubmit} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text>Create an account</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}
