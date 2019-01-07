import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';

import { connect } from 'react-redux'


import * as firebase from 'firebase'
import 'firebase/firestore'

const mapStateToProps = (state) => {
  return {
    userName: state.userName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // setFavoriteAnimal: (text) => { dispatch(setFavoriteAnimal(text))},
    // userAuthenticated: (userId) => { dispatch(userAuthenticated(userId))},
    // setSelectedItem: (item) => { dispatch(setSelectedItem(item))}
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props)
    this.state = {
      userName: this.props.userName
    }
  }

  onSignoutPress = () => {
    firebase.auth().signOut();
  }


  // onGalleryPress = () => {
  //   var navActions = StackActions.reset({
  //       index: 0,
  //       key: null,
  //       actions: [NavigationActions.navigate({routeName: "Gallery"})]
  //   });
  //   this.props.navigation.dispatch(navActions);
  // }

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
                    <Text>{'User Name: ' + this.props.userName}</Text>
        <Text onPress={this.onGalleryPress} style={styles.settingsButton}>Gallery</Text>
        <Text style={styles.settingsButton}>Save</Text>
        <Text style={styles.settingsButton}>Load</Text>
        <Text onPress={this.onSignoutPress} style={styles.settingsButton}>Log Out</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)