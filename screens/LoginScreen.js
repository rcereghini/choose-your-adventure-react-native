import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
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
        <Text>LOGIN</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});
