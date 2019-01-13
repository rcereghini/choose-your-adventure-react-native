import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  StatusBar
} from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore'

import { connect } from 'react-redux'



const mapStateToProps = (state) => {
  return {
    favoriteAnimal: state.favoriteAnimal,
    authenticated: state.authenticated,
    selectedItem: state.selectedItem,
    userUID: state.userUID,
    userEmail: state.userEmail,
    fireDisplayName: state.fireDisplayName,
    userPhotoURL: state.userPhotoURL
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedItem: (item) => { dispatch(setSelectedItem(item))},
    setUserUID: (uid) => { dispatch(setUserUID(uid))}  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // setUserUID: (uid) => { dispatch(setUserUID(uid))},
//     // setUserEmail: (email) => { dispatch(setUserEmail(email))},
//     // setUserPhotoURL: (url) => { dispatch(setUserPhotoURL(url))},
//     // setFireDisplayName: (name) => { dispatch(setFireDisplayName(name))}
//     // setFavoriteAnimal: (text) => { dispatch(setFavoriteAnimal(text))},
//     // userAuthenticated: (userId) => { dispatch(userAuthenticated(userId))},
//     // setSelectedItem: (item) => { dispatch(setSelectedItem(item))}
//   }
// }


const BOOK = {
  inventoryAdd: '',
  inventoryRemove: '',
  options: [
    {one: '', two: '', three: ''},
    {one: 0, two: 0, three: 0},
    {oneReq: [], twoReq: [], threeReq: []}
  ],
  pageImage: 'www.opinads.com',
  pageNumber: 0,
  statChange: [0,0,0],
  text: '',
  title: '',
}

let userFB = null;

class BookScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      ...BOOK,
      // user:{
      //   name: 'User Name',
      //   friendName: 'Thomas',
      //   gender: 'male',
      //   kribbits: 0,
      //   gameId: 'testId',
      //   inventory: ['Beginners Luck']
      // },
      user: {},
      selectedItem: this.props.selectedItem,
      fireDisplayName: this.props.fireDisplayName,
      userUID: this.props.userUID,
      userEmail: this.props.userEmail,
      userPhotoURL: this.props.userPhotoURL,
    }

  
  
    if(!firebase.apps.length)
      firebase.initializeApp(ApiKeys.FirebaseConfig)
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true}
    firestore.settings(settings);
    this.initializeGame = this.initializeGame.bind(this);
    this.setName = this.setName.bind(this);
    this.winGame = this.winGame.bind(this);
    this.loseGame = this.loseGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.optionSelect = this.optionSelect.bind(this);
    this.addToInventory = this.addToInventory.bind(this);
    this.getThisPage = this.getThisPage.bind(this);
  }

/////////////////////////////////////////////////////////////////////


  componentDidMount(){
    this.initializeGame()
    // setTimeout(() => this.setState({userUID: userFB.uid}), 3000)
    // setTimeout(() => this.setState({userUID: userFB.uid}, () => this.props.setUserUID(this.state.userUID)), 3000)
  }


/////////////////////////////////////////////////////////////////////

  async addToInventory(item){
    // let currentInventory = await firebase.firestore().collection('inventoryTest').doc('Bob').get()
    //                           .then(function(data){

    //                             })
    // // await alert(`currentInventory: ${this.state.user.inventory}`)
    // this.setState({
    //   user: this.state.user.inventory.push(item)
    // }, () => console.log(`state: ${this.state.user.inventory}`))

    // REFACTOR TO HOLD IN STATE AND STORE ON SAVE!

    firebase.firestore().collection('userInventory').doc(this.state.user.gameId).update({[item]: true})
      .catch(() => {
        firebase.firestore().collection('userInventory').doc(this.state.user.gameId).set({[item]: true})
      })
  }

  // () => this.setState({userUID: user.uid}, () => this.props.setUserUID(this.state.userUID))
  initializeGame(){
    this.getThisPage(0)
  }

  async getThisPage(pNum){
    let pageData = await firebase.firestore().collection('Book')
                            .where('page.pageNumber', '==', pNum.toString())
                            .get().then((data) => data.docs[0].data().page)
    this.setState({...pageData}, () => [
      (this.state.inventoryAdd) ? this.addToInventory(this.state.inventoryAdd) : console.log('no item here')
    ])
  }

  setName(event){
    this.setState(state => ({
      user: {
        name: document.getElementById('nameInput').value,
        friendName: this.state.user.friendName,
        gender: this.state.user.gender,
        stats: {
          int: this.state.user.stats.int,
          str: this.state.user.stats.str,
          dex: this.state.user.stats.dex
        },
        inventory: this.state.user.inventory
      }
    }))
  }

  // optionNumber, pageNumber, optionText
  optionSelect(option){
    
    this.getThisPage(option)
    
    //check inv/stat add
  }

  winGame = () => {
    alert('You Win!')
  }
  
  loseGame = () => {
    alert('You Lose!')
  }

  resetGame = () => {
    this.setState({
      ...BOOK[0],
      user:{
        name: 'User Name',
        friendName: 'Thomas',
        gender: 'male',
        stats: {
          int: 1,
          str: 1,
          dex: 1
        },
        inventory: []
      }
    })
  }

  onSignoutPress = () => {
    firebase.auth().signOut();
  }


  render() {
    return (
      <View style={styles.container}> 
        <StatusBar hidden />
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
          >
        </Image>
        <ScrollView style={styles.scrollWrap} contentContainerStyle={styles.contentContainer}>
        <View style={styles.wrapAll}>
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
            <View style={styles.imageWrap}>
              <Image style={styles.chapterImage} source={{uri: this.state.pageImage}}></Image>
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.titleText}>{(this.state.title) ? this.state.title + '\n------------' : ''}</Text>
              <Text style={styles.mainText}>{this.state.text}</Text>
            </View>
            <View style={styles.buttonWrap}>
              {
                (this.state.options[1].one) ? 
                  <Text onPress={() => this.optionSelect(this.state.options[1].one)} style={styles.choiceButton}>{this.state.options[0].one}</Text> :
                  <View></View>
              }
              {
                (this.state.options[1].two) ? 
                  <Text onPress={() => this.optionSelect(this.state.options[1].two)} style={styles.choiceButton}>{this.state.options[0].two}</Text> :
                  <View></View>
              }
              {
                (this.state.options[1].three) ?
                <Text onPress={() => this.optionSelect(this.state.options[1].three)} style={styles.choiceButton}>{this.state.options[0].three}</Text> :
                <View></View>
              } 
              <Text style={this.props.selectedItem ? styles.selectedItem1 : styles.selectedItem2}>{this.props.selectedItem}</Text>
            </View>
        </View>  
        </ScrollView>
      </View>
    );
  }

}


//////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({ 
  wrapAll:{
    display: 'flex',
    flex: 1,
    height: '100%',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  imageWrap: {
    flex: 1,
    borderWidth: 5,
    borderColor: '#333232',
    marginLeft: -5,
    marginRight: -5,
    // marginTop: 10,
    marginBottom: 10
  },
  textWrap:{
    flex: 1,
    minHeight: 221,
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginRight: 8,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#333232',
    marginBottom: 10
  },
  buttonWrap:{
    flex: 1,
    // justifyContent: 'flex-end'
    marginBottom: 20
  },
  choiceButton: {
    flex: 1,
    fontSize: 21,
    textAlign: 'center',
    marginRight: 7,
    marginLeft: 7,
    marginTop: 10,
    paddingTop: 7,
    paddingBottom: 5,
    borderColor: '#333232',
    borderWidth: 2,
    backgroundColor: '#8C7284',
    color: 'white'
  },
  chapterImage: {
    height: 200
  },
  titleText:{
    fontSize: 22,
    paddingTop: 20,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    flex: 1
  },
  mainText:{
    fontSize: 20,
    paddingLeft: 17,
    paddingRight: 10,
    paddingBottom: 20,
    fontFamily: 'sans-serif',
    flex: 3,
  },
  scrollWrap:{
    height: '100%',
    backgroundColor: 'rgba(88, 88, 88, 0.2)',
  },
  container: {
    flex: 1,
    // backgroundColor: 'black',
    display: 'flex',
  },
  contentContainer: {
    marginTop: -5
  },
  signoutButton:{
    paddingTop: 20,
    paddingBottom: 20,
    width: 300,
    color: 'white',
    marginTop: 30,
    marginLeft: 30,          
    textAlign: 'center',
    backgroundColor: '#333'
  },
  selectedItem1: {
    height: 70,
    paddingTop: 20,
    width: 70,
    backgroundColor: '#333',
    color: 'white',
    display: 'flex',
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10
  }
});

//////////////////////////////////////////////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(BookScreen)