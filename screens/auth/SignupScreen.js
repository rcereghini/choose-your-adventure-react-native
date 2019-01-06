
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Image } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class SignupScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
            passwordConfirm: "",
        };
    }

    onSignupPress = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });
    }

    onBackToLoginPress = () => {
        var navActions = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "Login"})]
        });
        this.props.navigation.dispatch(navActions);
    }

    render() {
        return (
            <View style={styles.signupScreenWrap}>
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
                <View style={styles.signupScreenInnerWrap}>
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
                <Text style={{paddingBottom: 10, fontSize: 36}}>Signup</Text>

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

                <View style={{paddingTop:10}} />

                <TextInput style={styles.inputStyles}
                    value={this.state.passwordConfirm}
                    onChangeText={(text) => { this.setState({passwordConfirm: text}) }}
                    placeholder="Password (confirm)"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Text style={styles.buttonStyles} onPress={this.onSignupPress}>Signup</Text>

                <Text style={styles.buttonStyles} onPress={this.onBackToLoginPress}>Back to Login</Text>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    signupScreenWrap: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signupScreenInnerWrap: {
        flex: .7,
        width: '93%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyles:{
        textAlign: 'center',
        width: 200,
        height: 40,
        borderWidth: 1,
        paddingTop: 10,
        marginTop: 10,
        backgroundColor: '#8C7284',
        color: 'white'
    },
    inputStyles: {
        width: 200, 
        height: 40, 
        borderWidth: 1 , 
        backgroundColor: 'whitesmoke',
        paddingLeft: 10
    }
});
