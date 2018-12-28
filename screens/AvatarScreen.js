import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class AvatarScreen extends React.Component {
  static navigationOptions = {
    title: 'Avatar',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarLeft}>L</Text>
          <Text style={styles.avatarCenter}>Avatar</Text>
          <Text style={styles.avatarRight}>R</Text>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.kribbitBalance}>Balance</Text>
          <Text style={styles.kribbitDrag}>Drag</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarContainer:{
    flex: 2,
    backgroundColor: 'darkgrey',
    flexDirection: 'row',
    
  },
  avatarRight:{
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'brown'
  },
  avatarLeft: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'brown'
  },
  avatarCenter: {
    flex: 3,
    textAlign: 'center'
  },
  attributeContainer:{
    flex: 1,
    flexDirection: 'row'
  },
  kribbitBalance:{
    flex: 1,
    backgroundColor: 'darkslategrey',
  },
  kribbitDrag:{
    flex: 1,
    backgroundColor: 'slategrey',
  }
});
