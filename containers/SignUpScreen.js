import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function SignUpScreen({ navigation }) {
  const [values, setValues] = useState({});

  const handleSubmit = async () => {
    if (values.password === values.confirmPassword) {
      axios
        .post("http://localhost:4000/user/signup", values)
        .then((response) => {
          console.log(response);
          alert("Inscription confirmed ! You can sign In now !");
          navigation.navigate("SignIn");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" translucent={false} />
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            textContentType="emailAddress"
            onChange={(e) => {
              const obj = { ...values };
              obj.email = e.target.value;
              setValues(obj);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            textContentType="username"
            onChange={(e) => {
              const obj = { ...values };
              obj.username = e.target.value;
              setValues(obj);
            }}
          />

          <TextInput
            style={[styles.input, { height: 100, borderWidth: 2 }]}
            placeholder="describe yourself"
            multiline={true}
            numberOfLines={4}
            onChange={(e) => {
              const obj = { ...values };
              obj.description = e.target.value;
              setValues(obj);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            textContentType="newPassword"
            onChange={(e) => {
              const obj = { ...values };
              obj.password = e.target.value;
              setValues(obj);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="confirmPassword"
            secureTextEntry={true}
            textContentType="newPassword"
            onChange={(e) => {
              const obj = { ...values };
              obj.confirmPassword = e.target.value;
              setValues(obj);
            }}
          />
          <TouchableOpacity
            title="Sign up"
            onPress={handleSubmit}
            style={{
              borderWidth: 3,
              borderColor: "red",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 50,
              marginTop: 40,
            }}
          >
            <Text style={{ textAlign: "center", color: "gray" }}>Sign UP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text>Already have an account ? Sign in</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 300,
    padding: 5,
    borderBottomWidth: 2,
    borderColor: "#FFBAC0",
    marginBottom: 20,
  },
});
