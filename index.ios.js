/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
var {width, height} = Dimensions.get('window');

export default class rnrssreader extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <View style={styles.topbanner}>
          <Image source={require("./assets/backgroundGradient1.png")} style={styles.topbannerimage}>
            <Image source={require("./assets/MHallLogo152.png")} style={styles.logo}/>
          </Image>
        </View>
        <View style={styles.content}>
          <ScrollView>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
topbanner:{
  height: height * 0.18,
  width: width,
  backgroundColor: "red",
},
topbannerimage:{
    height: height * 0.18,
    width: width,
    resizeMode: "stretch"
},
content: {
  flex:6
},
logo: {
  height: width * 0.2,
  width: width * 0.2,
  top: width * 0.07,
  left: width * 0.05,
  position: "absolute"
}
});

AppRegistry.registerComponent('rnrssreader', () => rnrssreader);
