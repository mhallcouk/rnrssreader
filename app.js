
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  ListView,
  WebView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import _ from "lodash";
var {width, height} = Dimensions.get('window');
var items = null
export default class App extends Component {
  constructor() {
      super();
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(['row 1', 'row 2','row 3', 'row 4']),
        news: ds.cloneWithRows([]),
        webViewPresent: false,
        linkAddress: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftwitrss.me%2Ftwitter_user_to_rss%2F%3Fuser%3Dmhallcouk'
      };
    }


componentDidMount() {
  this.getContent()
}

 getContent() {
     return fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftwitrss.me%2Ftwitter_user_to_rss%2F%3Fuser%3Dmhallcouk')
       .then((response) => response.json())
       .then((response) => {
         console.log(response)
         const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         items = response.items
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


const article = this.state.webViewPresent ? (<WebView source={{uri: this.state.linkAddress}} style={{position: "relative", margin: 0}} />) : <ListView
dataSource={this.state.news}
renderRow={(item) => <TouchableWithoutFeedback onPress={() => {
            this.setState({webViewPresent: true, linkAddress: item.link})
        }}><View style={{borderBottomWidth: 1, borderBottomColor: "black"}}><Text style={{fontSize: 20, padding: 10}}>{_.truncate(item.title, {'length': 110})}</Text><Text style={{fontSize: 20, padding: 10}}>{item.author}</Text></View></TouchableWithoutFeedback>}
/>



    return (
      <View style={{flex: 1}}>

        <View style={styles.topbanner}>
            <TouchableOpacity onPress={() => {
                        this.setState({webViewPresent: false})
                    }}>
            <View style={[styles.logoView]}>
            <Image source={require("./assets/MHallLogo152b.png")} style={[styles.logo]}/>
            </View>
            </TouchableOpacity>
            <View style={{flex:5}}>
            </View>
        </View>

        <View style={styles.content}>
              {article}

        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
topbanner:{
  backgroundColor: "#39C1AC",
  borderBottomWidth: 1,
  borderBottomColor: "black",
  flex:1,
  flexDirection: "row",
  paddingTop: 15
},
content: {
  flex:5
},
logoView: {
  height: 150,
  width: 150,
  flex: 1,
  padding: 10,
  position: "relative"
},
logo: {
  resizeMode: "contain",
  height: 150,
  width: 150,
  flex: 1,
  padding: 10,
  position: "relative"
}
});

module.exports = App;


{/* https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fheadlines.uk.com%2Ffeed%2F */}
