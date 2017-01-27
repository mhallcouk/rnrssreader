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
        news: ds.cloneWithRows([]),
      };
    }


componentDidMount() {
  this.getContent()
}

 getContent() {
     return fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fheadlines.uk.com%2Ffeed%2F')
       .then((response) => response.json())
       .then((response) => {
         console.log(response)
         const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         const items = response.items
         this.setState(
           { news: ds.cloneWithRows(items)}
         )
         console.log(this.state.news)
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
        dataSource={this.state.news}
        renderRow={(item) => <View style={{borderBottomWidth: 1, borderBottomColor: "black"}}><Text style={{fontSize: 20, padding: 10}}>{item.description.substring(0,100)}</Text><Text style={{fontSize: 20, padding: 10}}>{item.author}</Text></View>}
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
