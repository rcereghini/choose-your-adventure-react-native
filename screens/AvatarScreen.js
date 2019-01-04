import React from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import { connect } from 'react-redux'

import { setSelectedItem } from './../redux/app-redux'


const mapStateToProps = (state) => {
  return {
    selectedItem: state.selectedItem,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedItem: (item) => { dispatch(setSelectedItem(item))},  }
}

class AvatarScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props)
    this.state = {
      selectedItem: this.props.selectedItem
    }
  }

  onDonkeyNips = () => {
    this.props.setSelectedItem(this.state.selectedItem)
  }

  onCatNip = () => {
    this.props.setSelectedItem(this.state.selectedItem)
  }

  onDonkeyPits = () => {
    this.props.setSelectedItem(this.state.selectedItem)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarLeft}>L</Text>
          <View style={styles.avatarCenter}>
            <Image style={styles.avatarImage} source={{uri:'https://firebasestorage.googleapis.com/v0/b/cya2018-6942c.appspot.com/o/manSilhouette.png?alt=media&token=d5c50063-966b-457f-bbc4-b2351a962b23'}}>
            </Image>
          </View>
          <View style={styles.avatarRight}>
            <Text style={{color: 'white', textAlign: 'center'}}>R</Text>
            <Button title='catNip' onPress={() => this.setState({selectedItem: 'catNip'})} />
            <Button title='Submit' style={{paddingTop: 20, paddingBottom: 20, marginTop: 20, marginBottom: 20}} onPress={() => this.props.setSelectedItem(this.state.selectedItem)} />
            {/* learn to conditionally render here. */}
              <Button title='donkeyPits' onPress={() => this.setState({selectedItem: 'donkeyPits'})} /> 

          </View>
        </View>
        <View style={styles.attributeContainer}>
          <View style={styles.kribbitBalance}>
            <Text style={styles.kribbitIcon}>⛏</Text>
            <Text style={styles.kribbitText}>Scavange Kribbits</Text>
          </View>
          <View style={styles.kribbitDrag}>
            <Text style={styles.kribbitIcon}>💰</Text>
            <Text style={styles.kribbitText}>Kribbits: 0</Text>
          </View>
        </View>
        <Text>Selected Item: {this.props.selectedItem}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarContainer:{
    flex: 3,
    backgroundColor: 'darkgrey',
    flexDirection: 'row',
  },
  avatarRight:{
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#333',
    justifyContent: 'space-around'
  },
  avatarLeft: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#333'
  },
  avatarCenter: {
    flex: 3,
    textAlign: 'center'
  },
  avatarImage: {
    height: '100%'
  },
  attributeContainer:{
    flex: 1,
    flexDirection: 'row'
  },
  kribbitBalance:{
    flex: 1,
    backgroundColor: 'grey',
  },
  kribbitDrag:{
    flex: 1,
    backgroundColor: 'grey',
  },
  kribbitIcon:{
    textAlign: 'center',
    fontSize: 80
  },
  kribbitText: {
    textAlign: 'center'
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(AvatarScreen)
