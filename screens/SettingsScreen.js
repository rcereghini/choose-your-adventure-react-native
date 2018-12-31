import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.outerView}>
        <Text style={styles.settingsButton}>Save</Text>
        <Text style={styles.settingsButton}>Load</Text>
        <Text style={styles.settingsButton}>Support</Text>
      </View>
    )}
}

const styles = StyleSheet.create({
  outerView: {
    display: 'flex'
  },
  settingsButton: {
    flex: 1,
    backgroundColor: 'red'
  }
});
