import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import BookScreen from "../screens/BookScreen";
import AvatarScreen from "../screens/AvatarScreen";
import SettingsScreen from "../screens/SettingsScreen";

// this.props.navigate('Setting

const BookStack = createSwitchNavigator({
  Book: BookScreen
});

BookStack.navigationOptions = {
  tabBarLabel: "Book",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-book${focused ? "" : "-outline"}`
          : "md-book"
      }
    />
  ),
  tabBarOptions: {
    activeTintColor: "white",
    activeBackgroundColor: "#545",
    style: {
      backgroundColor: "#333232"
    }
  }
};

const AvatarStack = createStackNavigator({
  Avatar: AvatarScreen
});

AvatarStack.navigationOptions = {
  tabBarLabel: "Avatar",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  ),
  tabBarOptions: {
    activeTintColor: "white",
    activeBackgroundColor: "#545",
    style: {
      backgroundColor: "#333232"
    }
  }
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
    />
  ),
  tabBarOptions: {
    activeTintColor: "white",
    activeBackgroundColor: "#545",
    style: {
      backgroundColor: "#333232"
    }
  }
};

export default createSwitchNavigator({
  BookStack,
  AvatarStack,
  SettingsStack
});
