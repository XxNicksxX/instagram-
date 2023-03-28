import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import PostCard from "./postCard";
import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";

let posts = require("./temp.json");

export default class Feed extends Component {
  constructor() {
    super();
    this.state = {
      light_theme: true,
    };
  }
  renderItem = ({ item: post }) => {
    return <PostCard post={post} navigation={this.props.navigation} />;
  };
  componentDidMount() {
    this.fetchUser();
  }
  fetchUser = async () => {
    let theme;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (data) => {
        theme = data.val().current_theme;
        this.setState({
          light_theme: theme === "light" ? true : false,
        });
      });
  };
  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View
        style={
          this.state.light_theme ? styles.Lightcontainer : styles.container
        }
      >
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image
              source={require("../assets/instagram.png")}
              style={styles.iconImage}
            ></Image>
          </View>
          <View style={styles.appTitleTextContainer}>
            <Text
              style={
                this.state.light_theme
                  ? styles.lightappTitleText
                  : styles.appTitleText
              }
            >
              instagram
            </Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={posts}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  Lightcontainer: {
    flex: 1,
    backgroundColor: "white",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "200%",
    height: "200%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.8,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(25),
  },
  lightappTitleText: {
    color: "black",
    fontSize: RFValue(25),
  },
  cardContainer: {
    flex: 0.85,
  },
});
