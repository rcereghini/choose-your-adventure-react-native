import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
// import LinearGradient from 'react-native-linear-gradient';
// import Sound from 'react-native-sound';
import { connect } from 'react-redux'


import * as firebase from 'firebase'
import 'firebase/firestore'





const mapStateToProps = (state) => {
  return {
    fireDisplayName: state.fireDisplayName,
    userUID: state.userUID,
    userEmail: state.userEmail,
    userPhotoURL: state.userPhotoURL,
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
      fireDisplayName: firebase.auth().currentUser.displayName,
      userUID: firebase.auth().currentUser.uid,
      userEmail: firebase.auth().currentUser.email,
      userPhotoURL: firebase.auth().currentUser.photoURL,
    }

    firebase.auth().currentUser.updateProfile({
      displayName: null,
      photoURL: 'https://st2.depositphotos.com/9223672/12056/v/950/depositphotos_120568236-stock-illustration-male-face-avatar-logo-template.jpg'
    })
  }

  onComponentDidMount(){
    
    
  }

  onSignoutPress = () => {
    firebase.auth().signOut();
  }


  onGalleryPress = () => {
  //   var navActions = StackActions.reset({
  //       index: 0,
  //       key: null,
  //       actions: [NavigationActions.navigate({routeName: "Gallery"})]
  //   });
  //   this.props.navigation.dispatch(navActions);

  // const soundObject = new Expo.Audio.Sound();
  // try {
  //   await soundObject.loadAsync(require('./assets/sounds/hello.mp3'));
  //   await soundObject.playAsync();
  //   // Your sound is playing!
  // } catch (error) {
  //   // An error occurred!
  // }

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
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <Image style={{ height: 100, width: 100, borderRadius: 100, borderWidth: 8, borderColor: '#8C7284'}}source={{ uri: this.state.userPhotoURL }}></Image>
                      <View>
                        <Text style={{fontSize: 30, textAlign: 'center', paddingLeft: 20}}>{((this.state.fireDisplayName) ? this.state.fireDisplayName : '?????')}</Text>
                        <Text style={{fontSize: 14, textAlign: 'center', paddingLeft: 20}}>{this.state.userEmail}</Text>
                        {/* <Text style={{fontSize: 18, textAlign: 'center'}}>{this.state.userUID}</Text> */}
                      </View>
                    </View>
        <Text onPress={this.onGalleryPress} style={styles.settingsButton}>Gallery</Text>
        {/* <Text onPress={sound.play()} style={styles.settingsButton}>Gallery</Text> */}

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
    height: 60,
    borderWidth: 1,
    paddingTop: 20,
    marginTop: 10,
    backgroundColor: '#8C7284',
    // backgroundColor: 'linear-gradient(to bottom, #3c333a, #422b38, #482132, #4e1528, #52041b)',
    color: 'white'
},
  settingsScreenWrap: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
},
settingsScreenInnerWrap: {
    flex: .95,
    width: '93%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
},
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)