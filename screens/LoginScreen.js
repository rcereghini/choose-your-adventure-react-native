import React from 'react';
import { View, StyleSheet, Text, TextInput, Button, Image } from 'react-native';

import { connect } from 'react-redux' 
import { setFavoriteAnimal, userAuthenticated } from './../redux/app-redux'

const mapStateToProps = (state) => {
  return {
    favoriteAnimal: state.favoriteAnimal,
    inventory: state.inventory,
    itemToAdd: state.itemToAdd,
    authenticated: state.authenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFavoriteAnimal: (text) => { dispatch(setFavoriteAnimal(text))},
    userAuthenticated: (userId) => { dispatch(userAuthenticated(userId))}
  }
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);
    this.state = {
      favoriteAnimal: this.props.favoriteAnimal,
      itemToAdd: this.props.itemToAdd,
      inventory: this.props.inventory,
      authenticated: this.props.authenticated
    }
  }

  onSetFavoriteAnimalPress = () => {
    this.props.setFavoriteAnimal(this.state.favoriteAnimal)
  }

  onAddToInventoryPress = () => {
    this.props.itemFound(this.state.itemToAdd)
  }

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
        <Text style={{fontSize: 32, borderWidth: 2, padding: 10, textAlign: 'center', color: 'white', backgroundColor: '#8C7284', borderColor: '#333232',}} 
              onPress={() => this.setState({authenticated: true})}>{this.props.favoriteAnimal}</Text>
        {/* <TextInput 
          style={{borderWidth: 1, width: 200, height: 50, backgroundColor: 'white', fontSize: 32, padding: 5, marginTop: 20,}}
          value={this.state.favoriteAnimal}
          onChangeText={(text) => {this.setState({favoriteAnimal: text})}}
        />
        <Button title="Set Button Text" onPress={this.onSetFavoriteAnimalPress} />
        
        <Text style={{marginTop: 50, color: 'white', fontSize: 24}}>{this.state.itemToAdd}</Text>

        <Button title="Add to Inventory!" onPress={this.onAddToInventoryPress} />
        <TextInput 
          style={{borderWidth: 1, width: 200, height: 50, backgroundColor: 'white', fontSize: 32, padding: 5, marginTop: 20,}}
          value={this.state.itemToAdd}
          onChangeText={(item) => {this.setState({itemToAdd: item})}}
        /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)