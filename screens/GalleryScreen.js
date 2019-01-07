import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';

export default class GalleryScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
        <View style={styles.galleryScreenWrap}>
            <Text>Hello</Text>
        </View>
    )}
}

const styles = StyleSheet.create({
  
});
