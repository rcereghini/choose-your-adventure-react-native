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
                        source={{ uri: 'https://media3.giphy.com/media/d2Z7keyUwp4rzuG4/giphy.gif?cid=3640f6095c3bcb2772364d6d67e51cdb' }}
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
                }>Whistle
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
            <Text style={styles.kribbitText}>Gain Valor</Text>
          </View>
          <View style={styles.kribbitDrag}>
            <Text style={styles.kribbitIcon}>💰</Text>
            <Text style={styles.kribbitText}>Valor: 0</Text>
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
    flex: 5,
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
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 10
  },
  avatarImage: {
    height: '100%'
  },
  attributeContainer:{
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
    backgroundColor: '#333232',
    
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderWidth: 5,
    borderColor: '#545'
  },
  kribbitBalance:{
    flex: 1,
    color: 'white',
    // backgroundColor: 'grey',
  },
  kribbitDrag:{
    flex: 1,
    color: 'white',
    // backgroundColor: 'grey',
  },
  kribbitIcon:{
    textAlign: 'center',
    fontSize: 60
  },
  kribbitText: {
    textAlign: 'center',
    color: 'white',
  },
  invButton: {
    height: 70,
    paddingTop: 20,
    width: 70,
    backgroundColor: '#333',
    color: 'white',
    display: 'flex',
    textAlign: 'center',
    borderColor: '#545',
    borderWidth: 5
  },
  itemButton: {
    height: 70,
    paddingTop: 20,
    width: 70,
    backgroundColor: '#333',
    color: 'white',
    display: 'flex',
    textAlign: 'center',
    borderColor: '#545',
    borderWidth: 5
  },
  itemButtonSelected: {
    height: 70,
    paddingTop: 20,
    width: 70,
    borderWidth: 5,
    backgroundColor: '#333',
    borderColor: 'gold',
    color: 'white',
    display: 'flex',
    textAlign: 'center'
  },
  selectedItem1: {

  }
});


export default connect(mapStateToProps, mapDispatchToProps)(AvatarScreen)
