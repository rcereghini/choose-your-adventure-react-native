import React from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import { connect } from 'react-redux'

import { setSelectedItem } from './../redux/app-redux'


const mapStateToProps = (state) => {
  return {
    selectedItem: state.selectedItem
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
                            marginTop: 0
                        }}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cya2018-6942c.appspot.com/o/paper.jpg?alt=media&token=c98d47cf-1ae1-4bd4-890e-165fcd10cf66' }}
                    ></Image>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarLeft}>
            <Text style={styles.invButton} onPress={() => {
              console.log('+1')  
            }}>Helmet</Text> 
            {/* learn to conditionally render here. */}
            <Text style={styles.invButton} onPress={() => {
              console.log('+1')  
            }}>Weapon</Text> 
            <Text style={styles.invButton} onPress={() => {
              console.log('+1')  
            }}>Chest</Text>  
            <Text style={styles.invButton} onPress={() => {
              console.log('+1')  
            }}>Boots</Text> 
          </View>
          <View style={styles.avatarCenter}>
            <Image style={styles.avatarImage} source={{uri:'https://firebasestorage.googleapis.com/v0/b/cya2018-6942c.appspot.com/o/manSilhouette.png?alt=media&token=d5c50063-966b-457f-bbc4-b2351a962b23'}}>
            </Image>
          </View>
          <View style={styles.avatarRight}>
          <Text style={this.state.selectedItem === 'crowd call' ? styles.itemButtonSelected : styles.itemButton} 
                  onPress={this.state.selectedItem === 'crowd call' ? 
                  () => {
                    this.setState({selectedItem: null}, () => this.props.setSelectedItem(this.state.selectedItem))
                  } :
                  () => {
                    this.setState({selectedItem: 'crowd call'}, () => this.props.setSelectedItem(this.state.selectedItem))
                  }
                }>Crowd Call
            </Text> 
            {/* learn to conditionally render here. */}
            <Text style={this.state.selectedItem === 'flash' ? styles.itemButtonSelected : styles.itemButton} 
                  onPress={this.state.selectedItem === 'flash' ? 
                  () => {
                    this.setState({selectedItem: null}, () => this.props.setSelectedItem(this.state.selectedItem))
              } :
                  () => {
                    this.setState({selectedItem: 'flash'}, () => this.props.setSelectedItem(this.state.selectedItem))
              }}>Flash
            </Text> 
            <Text style={this.state.selectedItem === 'emeraldLint' ? styles.itemButtonSelected : styles.itemButton} 
                  onPress={this.state.selectedItem === 'emeraldLint' ? 
                  () => {
                    this.setState({selectedItem: null}, () => this.props.setSelectedItem(this.state.selectedItem))
                  } :
                  () => {
                    this.setState({selectedItem: 'emeraldLint'}, () => this.props.setSelectedItem(this.state.selectedItem))
                  }
                }>Emerald Lint
            </Text> 
            <Text style={this.state.selectedItem === 'potion' ? styles.itemButtonSelected : styles.itemButton} 
                  onPress={this.state.selectedItem === 'potion' ? 
                  () => {
                    this.setState({selectedItem: null}, () => this.props.setSelectedItem(this.state.selectedItem))
                  } :
                  () => {
                    this.setState({selectedItem: 'potion'}, () => this.props.setSelectedItem(this.state.selectedItem))
                  }
                }>Potion
            </Text> 

          </View>
        </View>
        <View style={styles.attributeContainer}>
          <View style={styles.kribbitBalance}>
            <Text style={styles.kribbitIcon}>🔨</Text>
            <Text style={styles.kribbitText}>Upgrade Gear</Text>
          </View>
          <View style={styles.kribbitBalance}>
            <Text style={styles.kribbitIcon}>⛏</Text>
            <Text style={styles.kribbitText}>Scavange Kribbits</Text>
          </View>
          <View style={styles.kribbitDrag}>
            <Text style={styles.kribbitIcon}>💰</Text>
            <Text style={styles.kribbitText}>Kribbits: 0</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  avatarContainer:{
    flex: 4,
    // backgroundColor: 'darkgrey',
    flexDirection: 'row',
  },
  avatarRight:{
    flex: 1,
    textAlign: 'center',
    // backgroundColor: '#333',
    justifyContent: 'space-around'
  },
  avatarLeft: {
    flex: 1,
    textAlign: 'center',
    // backgroundColor: '#333',
    justifyContent: 'space-around'
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
    flexDirection: 'row',
    paddingBottom: 20
  },
  kribbitBalance:{
    flex: 1,
    // backgroundColor: 'grey',
  },
  kribbitDrag:{
    flex: 1,
    // backgroundColor: 'grey',
  },
  kribbitIcon:{
    textAlign: 'center',
    fontSize: 80
  },
  kribbitText: {
    textAlign: 'center',
  },
  invButton: {
    height: 70,
    paddingTop: 20,
    width: 70,
    backgroundColor: '#333',
    color: 'white',
    display: 'flex',
    textAlign: 'center'
  },
  itemButton: {
    height: 70,
    paddingTop: 20,
    width: 70,
    backgroundColor: '#333',
    color: 'white',
    display: 'flex',
    textAlign: 'center'
  },
  itemButtonSelected: {
    height: 70,
    paddingTop: 20,
    width: 70,
    backgroundColor: 'red',
    color: 'white',
    display: 'flex',
    textAlign: 'center'
  },
  selectedItem1: {

  }
});


export default connect(mapStateToProps, mapDispatchToProps)(AvatarScreen)
