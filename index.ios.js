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
  ScrollView,
  ListView
} from 'react-native';
var {width, height} = Dimensions.get('window');

export default class rnrssreader extends Component {
  constructor() {
      super();
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(['row 1', 'row 2','row 3', 'row 4']),
      };
    }


componentDidMount() {
  this.getContent()
}

 getContent() {
     return fetch('https://facebook.github.io/react-native/movies.json')
       .then((response) => response.json())
       .then((responseJson) => {
         console.log(responseJson.title)
         this.setState(
           { Text1: responseJson.title,
             Text2: responseJson.movies[0].title,
             Text3: responseJson.movies[1].title,
             Text4: responseJson.movies[2].title,
             Text5: responseJson.movies[3].title,
             Text6: responseJson.movies[4].title,}
         )
       })
       .catch((error) => {
         console.error(error);
       });
   }


  render() {
    return (
      <View style={{flex:1}}>
        <View style={styles.topbanner}>
            <Image source={require("./assets/MHallLogo152b.png")} style={styles.logo}/>
        </View>
        <View style={styles.content}>
          <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <View style={{borderBottomWidth: 1, borderBottomColor: "black"}}><Text style={{fontSize: 20, padding: 10}}>{rowData}</Text></View>}
      />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
topbanner:{
  height: height * 0.18,
  width: width,
  backgroundColor: "white",
  borderBottomWidth: 1,
  borderBottomColor: "black"
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
