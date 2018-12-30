import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import BookScreen from '../screens/BookScreen';
import AvatarScreen from '../screens/AvatarScreen';
import SettingsScreen from '../screens/SettingsScreen';

const BookStack = createStackNavigator({
  Book: BookScreen,
});

BookStack.navigationOptions = {
  tabBarLabel: 'Book',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-book${focused ? '' : '-outline'}`
          : 'md-book'
      }
    />
  ),
  tabBarOptions: {
    style: {
      backgroundColor: '#333232',
    },
  }
};

const AvatarStack = createStackNavigator({
  Avatar: AvatarScreen,
});

AvatarStack.navigationOptions = {
  tabBarLabel: 'Avatar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
  tabBarOptions: {
    style: {
      backgroundColor: '#333232',
    },
  }
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  ),
  tabBarOptions: {
    style: {
      backgroundColor: '#333232',
    },
  }
};

export default createBottomTabNavigator({
  BookStack,
  AvatarStack,
  SettingsStack,
});
