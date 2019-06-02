import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Modal
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";

import Ghostwriter from "react-native-ghostwriter";

const mapStateToProps = state => {
  return {
    favoriteAnimal: state.favoriteAnimal,
    authenticated: state.authenticated,
    selectedItem: state.selectedItem,
    userUID: state.userUID,
    userEmail: state.userEmail,
    fireDisplayName: state.fireDisplayName,
    userPhotoURL: state.userPhotoURL
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedItem: item => {
      dispatch(setSelectedItem(item));
    },
    setUserUID: uid => {
      dispatch(setUserUID(uid));
    }
  };
};

const BOOK = {
  inventoryAdd: "",
  inventoryRemove: "",
  options: [
    { one: "", two: "", three: "" },
    { one: 0, two: 0, three: 0 },
    { oneReq: [], twoReq: [], threeReq: [] }
  ],
  pageImage: "www.opinads.com",
  pageNumber: 0,
  statChange: [0, 0, 0],
  text: "",
  title: ""
};

class BookScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      ...BOOK,
      user: {},
      selectedItem: this.props.selectedItem,
      fireDisplayName: this.props.fireDisplayName,
      userUID: this.props.userUID,
      userEmail: this.props.userEmail,
      userPhotoURL: this.props.userPhotoURL,
      fontLoaded: false,
      decisionTime: false,
      continueTime: false,
      musicPlaying: false
    };

    if (!firebase.apps.length) firebase.initializeApp(ApiKeys.FirebaseConfig);
    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);
    this.initializeGame = this.initializeGame.bind(this);
    this.setName = this.setName.bind(this);
    this.winGame = this.winGame.bind(this);
    this.loseGame = this.loseGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.optionSelect = this.optionSelect.bind(this);
    this.addToInventory = this.addToInventory.bind(this);
    this.getThisPage = this.getThisPage.bind(this);
    this.onAvatarPress = this.onAvatarPress.bind(this);
    this.onSettingsPress = this.onSettingsPress.bind(this);
  }

  /////////////////////////////////////////////////////////////////////

  async componentDidMount() {
    await Font.loadAsync({
      "main-text-font": require("../assets/fonts/Mirza-Regular.ttf"),
      "main-title-font": require("../assets/fonts/Crack-Regular.ttf")
    });
    this.initializeGame();
    this.setState({ fontLoaded: true });
  }

  /////////////////////////////////////////////////////////////////////

  async addToInventory(item) {
    // let currentInventory = await firebase.firestore().collection('inventoryTest').doc('Bob').get()
    //                           .then(function(data){

    //                             })
    // // await alert(`currentInventory: ${this.state.user.inventory}`)
    // this.setState({
    //   user: this.state.user.inventory.push(item)
    // }, () => console.log(`state: ${this.state.user.inventory}`))

    // REFACTOR TO HOLD IN STATE AND STORE ON SAVE!

    firebase
      .firestore()
      .collection("userInventory")
      .doc(this.state.user.gameId)
      .update({ [item]: true })
      .catch(() => {
        firebase
          .firestore()
          .collection("userInventory")
          .doc(this.state.user.gameId)
          .set({ [item]: true });
      });
  }

  initializeGame() {
    this.getThisPage(0);
    if (!this.state.musicPlaying) {
      async function playBackgroundMusic() {
        const backgroundMusic = new Expo.Audio.Sound();
        try {
          await backgroundMusic.loadAsync(
            require("../assets/sounds/sound.wav")
          );
          await backgroundMusic.playAsync();
        } catch (error) {
          // An error occurred!
        }
      }

      playBackgroundMusic();
      this.setState({ musicPlaying: true });
    }
  }

  async getThisPage(pNum) {
    let pageData = await firebase
      .firestore()
      .collection("Book")
      .where("page.pageNumber", "==", pNum.toString())
      .get()
      .then(data => data.docs[0].data().page);
    this.setState({ ...pageData }, () => [
      this.state.inventoryAdd
        ? this.addToInventory(this.state.inventoryAdd)
        : null
    ]);
  }

  setName(event) {
    this.setState(state => ({
      user: {
        name: document.getElementById("nameInput").value,
        friendName: this.state.user.friendName,
        gender: this.state.user.gender,
        stats: {
          int: this.state.user.stats.int,
          str: this.state.user.stats.str,
          dex: this.state.user.stats.dex
        },
        inventory: this.state.user.inventory
      }
    }));
  }

  // optionNumber, pageNumber, optionText
  optionSelect(option) {
    //Refreshes Ghostwriter w/ Markup Conditional
    this.setState({ text: "", decisionTime: false, continueTime: false });
    this.getThisPage(option);

    async function test2() {
      // const backgroundMusic = new Expo.Audio.Sound();
      try {
        await backgroundMusic.loadAsync(
          require("../assets/sounds/pageFlip.wav")
        );
        await backgroundMusic.playAsync();
      } catch (error) {
        // An error occurred!
      }
    }
    test2();
    //check inv/stat add
  }

  winGame = () => {
    alert("You Win!");
  };

  loseGame = () => {
    alert("You Lose!");
  };

  resetGame = () => {
    this.setState({
      ...BOOK[0],
      user: {
        name: "User Name",
        friendName: "Thomas",
        gender: "male",
        stats: {
          int: 1,
          str: 1,
          dex: 1
        },
        inventory: []
      }
    });
  };

  onSignoutPress = () => {
    firebase.auth().signOut();
  };

  onAvatarPress = () => {
    // var navActions = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: "Avatar" })]
    // });
    // this.props.navigation.dispatch(navActions);
    this.props.navigation.navigate("Avatar");
  };

  onSettingsPress = () => {
    // var navActions = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: "Settings" })]
    // });
    // this.props.navigation.dispatch(navActions);
    this.props.navigation.navigate("Settings");
  };

  render() {
    console.log("Text State ===>", this.state.text);

    //Ghostwriter Options
    let options = {
      writeSpeed: -88,
      sequences: [
        {
          string: this.state.text,
          duration: 1000
        }
      ],
      showCursor: false,
      stringStyles: {
        fontSize: 28,
        fontFamily: "main-text-font"
      },
      containerStyles: {
        paddingTop: 0,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 0,
        paddingBottom: 20
      },
      onComplete: () => this.setState({ continueTime: true })
      // onComplete: () => this.setState({ decisionTime: true })
    };

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {/* <Image
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
          >
        </Image> */}
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
          source={{ uri: this.state.pageImage }}
          // source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cya2018-6942c.appspot.com/o/paper.jpg?alt=media&token=c98d47cf-1ae1-4bd4-890e-165fcd10cf66' }}
        />
        <View style={styles.scrollWrap}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingBottom: 5,
              backgroundColor: "rgba(52, 52, 52, 0)"
            }}
          >
            <Text
              style={{
                paddingTop: 10,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                marginRight: 5,
                borderWidth: 3,
                borderColor: "black",
                backgroundColor: "white",
                color: "black",
                textAlign: "center"
              }}
              onPress={this.onAvatarPress}
            >
              <Ionicons name="md-body" size={32} color="black" />
            </Text>
            <Text
              style={{
                paddingTop: 10,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                marginRight: 10,
                borderWidth: 3,
                borderColor: "black",
                backgroundColor: "white",
                color: "black",
                textAlign: "center"
              }}
              onPress={this.onSettingsPress}
            >
              <Ionicons name="md-settings" size={32} color="black" />
            </Text>
          </View>
          <ScrollView
            // style={styles.wrapAll}
            contentContainerStyle={styles.contentContainer}
          >
            {/* <Image
              style={{
                backgroundColor: "#ccc",
                flex: 1,
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center"
                // marginTop: 25
              }}
              source={{ uri: this.state.pageImage }}
              // source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cya2018-6942c.appspot.com/o/paper.jpg?alt=media&token=c98d47cf-1ae1-4bd4-890e-165fcd10cf66' }}
            /> */}
            {/* <View style={styles.imageWrap}> */}
            {/* <Image style={styles.chapterImage} source={{uri: this.state.pageImage}}></Image> */}
            {/* </View> */}

            {this.state.fontLoaded ? (
              <View>
                <View style={styles.textWrap}>
                  <Text style={styles.titleText}>
                    {this.state.title
                      ? this.state.title + "\n------------"
                      : ""}
                  </Text>
                  {this.state.text ? (
                    <Ghostwriter
                      style={styles.mainText}
                      options={options}
                      onPress={() => this.setState({ decisionTime: true })}
                    />
                  ) : null}
                  {this.state.continueTime ? (
                    <Text
                      style={{
                        borderWidth: 3,
                        borderColor: "black",
                        paddingTop: 8,
                        paddingBottom: 2,
                        paddingLeft: 25,
                        paddingRight: 5,
                        marginBottom: 10,
                        marginRight: 10,
                        textAlign: "center",
                        alignSelf: "flex-end"
                      }}
                      onPress={() => this.setState({ decisionTime: true })}
                    >
                      <Ionicons
                        name="md-arrow-round-forward"
                        size={32}
                        color="black"
                      />
                    </Text>
                  ) : null}
                  {/* <Text style={styles.mainText}>{this.state.text}</Text> */}
                </View>
                {console.log("Options ===>", this.state.options)}
              </View>
            ) : null}
          </ScrollView>
          {this.state.decisionTime ? (
            <Modal transparent={true} animationType={"fade"}>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor: "rgba(88,88,88,0.8)0"
                }}
              >
                <Text
                  style={
                    this.props.selectedItem
                      ? styles.selectedItem1
                      : styles.selectedItem2
                  }
                >
                  {this.props.selectedItem}
                </Text>
                {/* <View style={styles.buttonWrap}> */}
                {this.state.options[1].one ? (
                  <Text
                    onPress={() => this.optionSelect(this.state.options[1].one)}
                    style={styles.choiceButton}
                  >
                    {this.state.options[0].one}
                  </Text>
                ) : (
                  <View />
                )}
                {this.state.options[1].two ? (
                  <Text
                    onPress={() => this.optionSelect(this.state.options[1].two)}
                    style={styles.choiceButton}
                  >
                    {this.state.options[0].two}
                  </Text>
                ) : (
                  <View />
                )}
                {this.state.options[1].three ? (
                  <Text
                    onPress={() =>
                      this.optionSelect(this.state.options[1].three)
                    }
                    style={styles.choiceButton}
                  >
                    {this.state.options[0].three}
                  </Text>
                ) : (
                  <View />
                )}
                <Text
                  onPress={() => this.setState({ decisionTime: false })}
                  style={{
                    borderWidth: 3,
                    borderColor: "black",
                    paddingTop: 8,
                    paddingBottom: 2,
                    paddingRight: 25,
                    paddingLeft: 5,
                    marginBottom: 10,
                    marginLeft: 10,
                    marginTop: 10,
                    fontSize: 24,
                    backgroundColor: "white",
                    textAlign: "center",
                    alignSelf: "flex-start"
                  }}
                >
                  <Ionicons
                    name="md-arrow-round-back"
                    size={32}
                    color="black"
                  />{" "}
                </Text>
              </View>
            </Modal>
          ) : null}
        </View>
      </View>
    );
  }
}

//////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  wrapAll: {
    display: "flex",
    flex: 1,
    height: 400,
    justifyContent: "space-around"
    // marginBottom: 20
  },
  imageWrap: {
    flex: 1,
    borderWidth: 5,
    borderColor: "#333232",
    marginLeft: -5,
    marginRight: -5
    // marginTop: 10,
    // marginBottom: 10
  },
  textWrap: {
    flex: 1,
    minHeight: 221,
    marginTop: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    marginRight: 8,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#333232"
    // marginBottom: 10
  },
  buttonWrap: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 70
  },
  choiceButton: {
    // flex: 1,
    fontSize: 28,
    textAlign: "center",
    marginRight: 7,
    marginLeft: 7,
    marginTop: 5,
    borderColor: "#333232",
    borderWidth: 2,
    backgroundColor: "#8C7284",
    color: "white",
    fontFamily: "main-text-font"
  },
  chapterImage: {
    // height: 200
  },
  titleText: {
    fontSize: 30,
    paddingTop: 20,
    fontFamily: "main-title-font",
    textAlign: "center"
  },
  mainText: {
    paddingLeft: 17,
    paddingRight: 10,
    paddingBottom: 20
  },
  scrollWrap: {
    height: "100%",
    backgroundColor: "rgba(88, 88, 88, 0.2)"
  },
  container: {
    flex: 1,
    // backgroundColor: 'black',
    display: "flex"
  },
  contentContainer: {
    marginTop: -5
  },
  signoutButton: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 300,
    color: "white",
    marginTop: 30,
    marginLeft: 30,
    textAlign: "center",
    backgroundColor: "#333"
  },
  selectedItem1: {
    height: 70,
    paddingTop: 20,
    width: 70,
    backgroundColor: "#333",
    color: "white",
    display: "flex",
    textAlign: "center",
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 10
  }
});

//////////////////////////////////////////////////////////////////////////////////

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookScreen);
