import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export default class AvatarScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarLeft}>L</Text>
          <View style={styles.avatarCenter}>
            <Image style={styles.avatarImage} source={{uri:'https://firebasestorage.googleapis.com/v0/b/cya2018-6942c.appspot.com/o/manSilhouette.png?alt=media&token=d5c50063-966b-457f-bbc4-b2351a962b23'}}>
            </Image>
          </View>
          <Text style={styles.avatarRight}>R</Text>
        </View>
        <View style={styles.attributeContainer}>
          <View style={styles.kribbitBalance}>
            <Text style={styles.kribbitIcon}>⛏</Text>
            <Text style={styles.kribbitText}>Scavange Kribbits</Text>
          </View>
          <View style={styles.kribbitDrag}>
            <Text style={styles.kribbitIcon}>💰</Text>
            <Text style={styles.kribbitText}>Kribbits: 0</Text>
          </View>
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
    flex: 3,
    backgroundColor: 'darkgrey',
    flexDirection: 'row',
  },
  avatarRight:{
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#333'
  },
  avatarLeft: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#333'
  },
  avatarCenter: {
    flex: 3,
    textAlign: 'center'
  },
  avatarImage: {
    height: '100%'
  },
  attributeContainer:{
    flex: 1,
    flexDirection: 'row'
  },
  kribbitBalance:{
    flex: 1,
    backgroundColor: 'grey',
  },
  kribbitDrag:{
    flex: 1,
    backgroundColor: 'grey',
  },
  kribbitIcon:{
    textAlign: 'center',
    fontSize: 80
  },
  kribbitText: {
    textAlign: 'center'
  }
});
