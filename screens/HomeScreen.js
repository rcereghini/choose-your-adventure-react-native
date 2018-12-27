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
import { WebBrowser } from 'expo';
import * as firebase from 'firebase'
import 'firebase/firestore'

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      mainText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras magna velit, hendrerit nec vestibulum ut, aliquet nec erat. Nunc ligula ipsum, ultricies sed cursus nec, porttitor dapibus arcu. \n\nNulla aliquam efficitur magna, vel feugiat orci scelerisque sit amet. Mauris egestas quam purus, nec consectetur lectus mattis eu. Fusce vestibulum ornare gravida. Integer a lorem pretium dui commodo commodo ac non nisi. In tincidunt leo vel ipsum faucibus efficitur. Maecenas pellentesque pulvinar justo et viverra. Donec purus risus, viverra vel varius eu, tristique non sem. Sed tristique luctus condimentum. Sed ultrices vestibulum orci, eget convallis sem porttitor sed. Vestibulum nec rhoncus urna.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras magna velit, hendrerit nec vestibulum ut, aliquet nec erat. Nunc ligula ipsum, ultricies sed cursus nec, porttitor dapibus arcu. Nulla aliquam efficitur magna, vel feugiat orci scelerisque sit amet. Mauris egestas quam purus, nec consectetur lectus mattis eu. Fusce vestibulum ornare gravida. Integer a lorem pretium dui commodo commodo ac non nisi. In tincidunt leo vel ipsum faucibus efficitur. Maecenas pellentesque pulvinar justo et viverra. Donec purus risus, viverra vel varius eu, tristique non sem. Sed tristique luctus condimentum. Sed ultrices vestibulum orci, eget convallis sem porttitor sed. Vestibulum nec rhoncus urna.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras magna velit, hendrerit nec vestibulum ut, aliquet nec erat. Nunc ligula ipsum, ultricies sed cursus nec, porttitor dapibus arcu. Nulla aliquam efficitur magna, vel feugiat orci scelerisque sit amet. Mauris egestas quam purus, nec consectetur lectus mattis eu. Fusce vestibulum ornare gravida. Integer a lorem pretium dui commodo commodo ac non nisi. In tincidunt leo vel ipsum faucibus efficitur. Maecenas pellentesque pulvinar justo et viverra. Donec purus risus, viverra vel varius eu, tristique non sem. Sed tristique luctus condimentum. Sed ultrices vestibulum orci, eget convallis sem porttitor sed. Vestibulum nec rhoncus urna.",
      optionOne: 'Option One!',
      optionTwo: 'Option Two!',
      optionThree: 'Option Three!'
    }

    if(!firebase.apps.length)
      firebase.initializeApp(ApiKeys.FirebaseConfig)
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true}
    firestore.settings(settings);

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(firstName){
    firebase.firestore().collection("tests").add({
      first: firstName,
      last: "Add!",
      born: 1337
     })
    alert('Perhaps we have added the entry...')
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
          <Text style={styles.mainText}>{this.state.mainText}</Text>    
<View style={styles.buttonWrap}>
          <Button onPress={() => this.handleClick('sam')} title={this.state.optionOne}></Button>   
          <Button onPress={() => this.handleClick('Travis')} title={this.state.optionTwo}></Button>
          <Button onPress={() => this.handleClick('bart')} title={this.state.optionThree}></Button>
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
  mainText:{
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(255,255,255,.3)',
    fontFamily: 'magic-cards-normal'
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
