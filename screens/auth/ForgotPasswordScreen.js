import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, Image } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class ForgotPasswordScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: "",
        };
    }

    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("Password reset email has been sent.");
            }, (error) => {
                Alert.alert(error.message);
            });
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
            <View style={styles.forgotPasswordScreenWrap}>
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
                <View style={styles.forgotPasswordScreenInnerWrap}>
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

                <Text style={{paddingBottom: 10, fontSize: 30}}>Forgot Password?</Text>

                <TextInput style={styles.inputStyles}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Text style={styles.buttonStyles} onPress={this.onResetPasswordPress}>Reset Password</Text>
                <Text style={styles.buttonStyles} onPress={this.onBackToLoginPress}>Back to Login</Text>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    forgotPasswordScreenWrap: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    forgotPasswordScreenInnerWrap: {
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