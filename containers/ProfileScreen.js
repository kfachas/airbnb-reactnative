import React from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View, StatusBar, ScrollView, SafeAreaView } from "react-native";

export default function ProfileScreen() {
  const { params } = useRoute();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Text>user id : {params.userId}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
