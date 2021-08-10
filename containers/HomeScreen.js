import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
} from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Text>Welcome home!</Text>
        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
