
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Image } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Font } from 'expo'

import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
            fontLoaded: false,
        };
    }

    async componentDidMount(){
        await Font.loadAsync({
            //Can rename to more useful description.
            // 'julius-sans-one': require('../assets/fonts/JuliusSansOne-Regular.ttf')
            'main-text-font': require('../../assets/fonts/Mirza-Regular.ttf')
          })
          this.setState({ fontLoaded: true })
    }

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { Alert.alert('You have signed in!') }, (error) => { Alert.alert('You have failed to authenticate.'); });
    }

    onCreateAccountPress = () => {
        var navActions = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "Signup"})]
        });
        this.props.navigation.dispatch(navActions);
    }

    onForgotPasswordPress = () => {
        var navActions = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "ForgotPassword"})]
        });
        this.props.navigation.dispatch(navActions);
    }

    render() {
        return (
            <View style={styles.loginScreenWrap}>
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
                { this.state.fontLoaded ? 
                <View style={styles.loginScreenInnerWrap}>
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
                    <Text style={{paddingBottom: 10, fontSize: 56, fontFamily: 'main-text-font'}}>Login</Text> 
                    <TextInput style={styles.inputStyles}
                        value={this.state.email}
                        onChangeText={(text) => { this.setState({email: text}) }}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <View style={{paddingTop:10}} />
                    <TextInput style={styles.inputStyles}
                        value={this.state.password}
                        onChangeText={(text) => { this.setState({password: text}) }}
                        placeholder="Password"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Text style={styles.buttonStyles} onPress={this.onLoginPress}>Login</Text>
                    <Text style={styles.buttonStyles} onPress={this.onCreateAccountPress}>Create Account</Text>
                    <Text style={styles.forgotPasswordStyles} onPress={this.onForgotPasswordPress}>Forgot Password?</Text>
                </View> : null}
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginScreenWrap: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginScreenInnerWrap: {
        flex: .93,
        width: '93%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyles:{
        textAlign: 'center',
        fontFamily: 'main-text-font',
        fontSize: 26,
        width: 200,
        height: 45,
        borderWidth: 1,
        // paddingTop: 5,
        marginTop: 10,
        backgroundColor: '#8C7284',
        color: 'white'
    },
    forgotPasswordStyles:{
        fontFamily: 'main-text-font',
        paddingTop: 10,
        paddingBottom: 10,
        color: 'white'
    },
    inputStyles: {
        fontFamily: 'main-text-font',
        width: 200, 
        height: 40, 
        borderWidth: 1 , 
        backgroundColor: 'whitesmoke',
        paddingLeft: 10
    }
});