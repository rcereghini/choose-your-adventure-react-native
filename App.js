import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Image } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import ApiKeys from './constants/ApiKeys'
import LoginScreen from './screens/LoginScreen'
import * as firebase from 'firebase'
import 'firebase/firestore'

export default class App extends React.Component {
  

  constructor(props){
    super(props)
    this.state = {
      isLoadingComplete: false,
      authenticated: false
    };

    if(!firebase.apps.length)
      firebase.initializeApp(ApiKeys.FirebaseConfig)
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true}
    firestore.settings(settings);
  }

 
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else if(this.state.authenticated){
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    } else {
      return (
        // <LoginScreen/>
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
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
          <Text style={{fontSize: 32, borderWidth: 2, padding: 10, textAlign: 'center', color: 'white', backgroundColor: '#8C7284', borderColor: '#333232',}} onPress={() => this.setState({authenticated: true})}>LOGIN</Text>
        </View>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
