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
} from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore'

const BOOK = {
  inventoryAdd: '',
  inventoryRemove: '',
  options: [
    {one: '', two: '', three: ''},
    {one: '', two: '', three: ''},
    {oneReq: [], twoReq: [], threeReq: []}
  ],
  pageNumber: 0,
  statChange: [0,0,0],
  text: '',
  title: '',
}


export default class BookScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      mainText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras magna velit, hendrerit nec vestibulum ut, aliquet nec erat. Nunc ligula ipsum, ultricies sed cursus nec, porttitor dapibus arcu. \n\nNulla aliquam efficitur magna, vel feugiat orci scelerisque sit amet. Mauris egestas quam purus, nec consectetur lectus mattis eu. Fusce vestibulum ornare gravida. Integer a lorem pretium dui commodo commodo ac non nisi. In tincidunt leo vel ipsum faucibus efficitur. Maecenas pellentesque pulvinar justo et viverra. Donec purus risus, viverra vel varius eu, tristique non sem. Sed tristique luctus condimentum. Sed ultrices vestibulum orci, eget convallis sem porttitor sed. Vestibulum nec rhoncus urna.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras magna velit, hendrerit nec vestibulum ut, aliquet nec erat. Nunc ligula ipsum, ultricies sed cursus nec, porttitor dapibus arcu. Nulla aliquam efficitur magna, vel feugiat orci scelerisque sit amet. Mauris egestas quam purus, nec consectetur lectus mattis eu. Fusce vestibulum ornare gravida. Integer a lorem pretium dui commodo commodo ac non nisi. In tincidunt leo vel ipsum faucibus efficitur. Maecenas pellentesque pulvinar justo et viverra. Donec purus risus, viverra vel varius eu, tristique non sem. Sed tristique luctus condimentum. Sed ultrices vestibulum orci, eget convallis sem porttitor sed. Vestibulum nec rhoncus urna.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras magna velit, hendrerit nec vestibulum ut, aliquet nec erat. Nunc ligula ipsum, ultricies sed cursus nec, porttitor dapibus arcu. Nulla aliquam efficitur magna, vel feugiat orci scelerisque sit amet. Mauris egestas quam purus, nec consectetur lectus mattis eu. Fusce vestibulum ornare gravida. Integer a lorem pretium dui commodo commodo ac non nisi. In tincidunt leo vel ipsum faucibus efficitur. Maecenas pellentesque pulvinar justo et viverra. Donec purus risus, viverra vel varius eu, tristique non sem. Sed tristique luctus condimentum. Sed ultrices vestibulum orci, eget convallis sem porttitor sed. Vestibulum nec rhoncus urna.",
      optionOne: 'Option One!',
      optionTwo: 'Option Two!',
      optionThree: 'Option Three!',
      ...BOOK,
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
  }

    if(!firebase.apps.length)
      firebase.initializeApp(ApiKeys.FirebaseConfig)
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true}
    firestore.settings(settings);

    this.handleClick = this.handleClick.bind(this)
    this.setName = this.setName.bind(this);
    this.winGame = this.winGame.bind(this);
    this.loseGame = this.loseGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.optionSelect = this.optionSelect.bind(this);
    this.addToInventory = this.addToInventory.bind(this);
    this.getThisPage = this.getThisPage.bind(this);
  }

  componentDidMount(){
    this.getThisPage(0)
  }



  handleClick(firstName){
    firebase.firestore().collection("tests").add({
      first: firstName,
      last: "Add!",
      born: 1337
     })
    alert('Perhaps we have added the entry...')
  }

  

  addToInventory = (item) => {
    this.setState(state => state.user.inventory.push(item))
  }

  async getThisPage(pNum){
    let pageData = await firebase.firestore().collection('Book').where('page.pageNumber', '==', pNum.toString()).get().then((data) => data.docs[0].data().page)
    this.setState({...pageData})
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
    // alert(JSON.stringify(this.state.options[1][option]))
    // alert(this.state.options[1].option[option])
    // if(this.state.options[1].option[option] === 67)
    //   this.winGame()
    // if(this.state.options[1].option[option] === 66)
    //   this.loseGame()
    this.getThisPage(option)
    // if(BOOK[option].inventoryAdd){this.addToInventory(BOOK[option].inventoryAdd)
    // }
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


  render() {
    return (
      <View style={styles.container}>
       
        <ScrollView style={styles.textWrap} contentContainerStyle={styles.contentContainer}>
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
        source={{ uri: 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/ENwbI9D3xilj9k3k8/nature-old-paper-texture-or-background-video-animation_rpiagnsz__F0000.png' }}
      >
      </Image>
          <Image style={styles.chapterImage} source={{uri: "https://image.shutterstock.com/z/stock-photo-sci-fi-contruction-in-the-desert-illustration-digital-painting-556472887.jpg"}}></Image>
          <Text style={styles.titleText}>{this.state.title}</Text>
          <Text style={styles.mainText}>{this.state.text}</Text>    
<View style={styles.buttonWrap}>
          <Button onPress={() => this.optionSelect(this.state.options[1].one)} title={this.state.options[0].one}></Button>   
          <Button onPress={() => this.optionSelect(this.state.options[1].two)} title={this.state.options[0].two}></Button>
          <Button onPress={() => this.optionSelect(this.state.options[1].three)} title={this.state.options[0].three}></Button>
        </View>
        
        </ScrollView>
        
      </View>
    );
  }

}

const styles = StyleSheet.create({
  buttonWrap:{
    justifyContent: 'flex-end'
  },
  textWrap:{
    flex: 1,
    color: 'white'
  },
  titleText:{
    fontSize: 20,
    fontFamily: 'sans-serif',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center'
  },
  mainText:{
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(255,255,255,.3)',
    minHeight: 270,
    fontFamily: 'sans-serif'
  },
  chapterImage: {
    height: 200
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    display: 'flex'
  },
  contentContainer: {
    paddingTop: 25,
  }
});
