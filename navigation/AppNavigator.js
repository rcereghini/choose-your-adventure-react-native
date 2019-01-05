import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

// import LoginScreen from './../screens/auth/LoginScreen';
// import SignupScreen from './../screens/auth/SignupScreen';
// import ForgotPasswordScreen from './../screens/auth/ForgotPasswordScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
});