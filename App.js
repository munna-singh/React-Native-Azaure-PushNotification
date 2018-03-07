/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const NotificationHub = require('react-native-azurenotificationhub');
const connectionString = 'Endpoint=sb://myappns.servicebus.windows.net/;SharedAccessKeyName=DefaultListenSharedAccessSignature;SharedAccessKey=6wvjWAohtuIVvNWtFbI4XH1XH2Eieg8GLa5PLg+L4uU='
const hubName ='myapphub'
const senderID = '241866506708'
const tags = null;


export default class App extends Component { 
  
  register() {    
    var val;
    
    var abc = NotificationHub.register({connectionString, hubName, senderID, tags})
      .catch(reason => console.warn(reason));
      console.log(abc);
  }

  unregister() {
    NotificationHub.unregister()
      .catch(reason => console.warn(reason));
  }

  // constructor(props)  {
  //   super(props);
  //   console.log(this);
  // }

  // componentWillUpdate =() => {
  //   console.log(this);
  // }

  // componentDidUpdate =() => {
  //   console.log(this);
  // }

  // componentDidMount =() => {
  //   console.log(this);
  // }
    componentWillMount = () => {
      alert(JSON.stringify(this.props));
    } 

    // componentWillReceiveProps =() => {
    //   console.log(this);
    // }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.register.bind(this)}>
         <View style={styles.button}>
           <Text style={styles.buttonText}>
             Register
           </Text> 
         </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={this.unregister.bind(this)}>
         <View style={styles.button}>
           <Text style={styles.buttonText}>
             Unregister
           </Text> 
         </View>
       </TouchableOpacity>
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
