import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Image, Alert } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import RootNavigation from './navigation/RootNavigation';
import MainTabNavigator from './navigation/MainTabNavigator'
import ApiKeys from './constants/ApiKeys'
import * as firebase from 'firebase'
import 'firebase/firestore'

//REDUX
import { Provider } from 'react-redux';
import { store } from './redux/app-redux';


export default class App extends React.Component {
  

  constructor(props){
    super(props)
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
      userName: this.props.userName,
      authenticated: false
    };

    if(!firebase.apps.length)
      firebase.initializeApp(ApiKeys.FirebaseConfig)
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true}
    firestore.settings(settings);
  }

  onAuthStateChanged = (user) => {
    this.setState({isAuthenticatedReady: true})
    this.setState({isAuthenticated: !!user})
    this.setState({userName: user.uid}, () => Alert.alert(this.state.userName))
    
  }

  
  render() {
    
    if ( (!this.state.isLoadingComplete && !this.state.isAuthenticationReady) && !this.props.skipLoadingScreen) {
      return (
        <Provider store={store}>
          <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
          />
        </Provider>
        
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {(this.state.isAuthenticated) ? <MainTabNavigator userUID={this.state.userName}/> : <RootNavigation />}
          </View>
        </Provider>
      );
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