import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'

import * as firebase from 'firebase'
import 'firebase/firestore'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  onSignoutPress = () => {
    firebase.auth().signOut();
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
            <View style={styles.settingsScreenWrap}>
                <Image
                    style={{
                    backgroundColor: '#ccc',
                    flex: 1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    marginTop: 25
                    }}
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cya2018-6942c.appspot.com/o/leather.jpg?alt=media&token=186d45c2-5c89-4529-acd6-0018d767995f' }}
                ></Image>
                <View style={styles.settingsScreenInnerWrap}>
                    <Image
                        style={{
                            backgroundColor: '#ccc',
                            flex: 1,
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            marginTop: 25
                        }}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cya2018-6942c.appspot.com/o/paper.jpg?alt=media&token=c98d47cf-1ae1-4bd4-890e-165fcd10cf66' }}
                    ></Image>
        <Text onPress={this.onSignoutPress} style={styles.settingsButton}>Log Out</Text>
        <Text style={styles.settingsButton}>Save</Text>
        <Text style={styles.settingsButton}>Load</Text>
        <Text style={styles.settingsButton}>Support</Text>
      </View>
      </View>
    )}
}

const styles = StyleSheet.create({
  outerView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  
  settingsButton:{
    textAlign: 'center',
    width: 240,
    height: 80,
    borderWidth: 1,
    paddingTop: 30,
    marginTop: 10,
    backgroundColor: '#8C7284',
    color: 'white'
},
  settingsScreenWrap: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
},
settingsScreenInnerWrap: {
    flex: .7,
    width: '93%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
},
});
