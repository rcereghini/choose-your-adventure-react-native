import React from "react";
import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
// import LinearGradient from 'react-native-linear-gradient';
// import Sound from 'react-native-sound';
import { connect } from "react-redux";
import { Font } from "expo";
import { Ionicons } from "@expo/vector-icons";

import * as firebase from "firebase";
import "firebase/firestore";

const mapStateToProps = state => {
  return {
    fireDisplayName: state.fireDisplayName,
    userUID: state.userUID,
    userEmail: state.userEmail,
    userPhotoURL: state.userPhotoURL
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // setFavoriteAnimal: (text) => { dispatch(setFavoriteAnimal(text))},
    // userAuthenticated: (userId) => { dispatch(userAuthenticated(userId))},
    // setSelectedItem: (item) => { dispatch(setSelectedItem(item))}
  };
};

class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      fireDisplayName: firebase.auth().currentUser.displayName,
      userUID: firebase.auth().currentUser.uid,
      userEmail: firebase.auth().currentUser.email,
      userPhotoURL: firebase.auth().currentUser.photoURL,
      fontLoaded: false
    };

    firebase.auth().currentUser.updateProfile({
      displayName: null,
      photoURL:
        "https://st2.depositphotos.com/9223672/12056/v/950/depositphotos_120568236-stock-illustration-male-face-avatar-logo-template.jpg"
    });
  }

  async componentDidMount() {
    await Font.loadAsync({
      //Can rename to more useful description.
      // 'julius-sans-one': require('../assets/fonts/JuliusSansOne-Regular.ttf')
      "main-text-font": require("../assets/fonts/Mirza-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  onSignoutPress = () => {
    firebase.auth().signOut();
  };

  onBackPress = () => {
    this.props.navigation.navigate("Book");
  };

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
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.settingsScreenWrap}>
        <StatusBar hidden={true} />
        <Image
          style={{
            backgroundColor: "#ccc",
            flex: 1,
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center"
            // marginTop: 25
          }}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/cya2018-6942c.appspot.com/o/leather.jpg?alt=media&token=186d45c2-5c89-4529-acd6-0018d767995f"
          }}
        />
        <View style={styles.settingsScreenInnerWrap}>
          <Image
            style={{
              backgroundColor: "#ccc",
              flex: 1,
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              marginTop: 20
            }}
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/cya2018-6942c.appspot.com/o/paper.jpg?alt=media&token=c98d47cf-1ae1-4bd4-890e-165fcd10cf66"
            }}
          />
          <View
            style={{
              display: "flex",
              flex: 0.5,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              onPress={this.onBackPress}
              style={{
                height: 50,
                marginTop: 10,
                marginLeft: 10,
                paddingTop: 8,
                width: 50,
                backgroundColor: "white",
                color: "white",
                display: "flex",
                alignSelf: "flex-start",
                textAlign: "center",
                borderColor: "#545",
                borderWidth: 5,
                fontFamily: "main-text-font"
              }}
            >
              <Ionicons name="md-arrow-round-back" size={32} color="black" />
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{
                textAlign: "center",
                height: 140,
                width: 140,
                borderRadius: 100,
                borderWidth: 8,
                borderColor: "#8C7284"
              }}
              source={{ uri: this.state.userPhotoURL }}
            />
            <View>
              <Text
                style={{
                  fontFamily: "main-text-font",
                  textAlign: "center",
                  fontSize: 30
                }}
              >
                {this.state.fireDisplayName
                  ? this.state.fireDisplayName
                  : "?????"}
              </Text>
              <Text
                style={{
                  fontFamily: "main-text-font",
                  textAlign: "center",
                  fontSize: 14
                }}
              >
                {this.state.userEmail}
              </Text>
              {/* <Text style={{fontSize: 18, textAlign: 'center'}}>{this.state.userUID}</Text> */}
            </View>
          </View>
          <View
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 25
            }}
          >
            <Text onPress={this.onGalleryPress} style={styles.settingsButton}>
              <Ionicons name="md-medal" size={32} color="white" />
              Achievements
            </Text>
            {/* <Text onPress={sound.play()} style={styles.settingsButton}>Gallery</Text> */}
            <Text style={styles.settingsButton}>
              <Ionicons name="md-save" size={32} color="white" /> Save
            </Text>
            <Text style={styles.settingsButton}>
              <Ionicons name="md-archive" size={32} color="white" />
              Load
            </Text>
            <Text onPress={this.onSignoutPress} style={styles.settingsButton}>
              <Ionicons name="md-log-out" size={32} color="white" />
              Log Out
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },

  settingsButton: {
    fontFamily: "main-text-font",
    fontSize: 24,
    textAlign: "center",
    width: 240,
    flex: 1,
    borderWidth: 1,
    paddingTop: 7,
    marginTop: 10,
    backgroundColor: "#8C7284",
    // backgroundColor: 'linear-gradient(to bottom, #3c333a, #422b38, #482132, #4e1528, #52041b)',
    color: "white"
  },
  settingsScreenWrap: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  settingsScreenInnerWrap: {
    flex: 1,
    width: "95%",
    display: "flex",
    flexDirection: "row",
    marginBottom: 40
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
