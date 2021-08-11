import React from "react";
import { Text, StatusBar, ScrollView, SafeAreaView } from "react-native";

export default function AroundMeScreen({ setToken }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Text>LETSGO</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
