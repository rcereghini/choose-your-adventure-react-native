import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Image } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import ApiKeys from './constants/ApiKeys'
import LoginScreen from './screens/LoginScreen'
import * as firebase from 'firebase'
import 'firebase/firestore'

//REDUX
import { Provider } from 'react-redux';
import { store } from './redux/app-redux';
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFavoriteAnimal: (text) => { dispatch(setFavoriteAnimal(text))},
    itemFound: (item) => { dispatch(itemFound(item))}
  }
}

export default class App extends React.Component {
  

  constructor(props){
    super(props)
    this.state = {
      isLoadingComplete: false,
      authenticated: true
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
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    } else {
      return (
        // <LoginScreen/>
        <Provider store={store}>
          <LoginScreen></LoginScreen>
        </Provider>
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


