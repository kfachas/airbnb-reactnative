import React from "react";
import {
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function SettingsScreen({ setToken }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Text>Hello Settings</Text>
        <TouchableOpacity
          title="Log Out"
          onPress={() => {
            setToken(null);
          }}
        >
          <Text>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
