import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
    };
  }
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
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("Tela de posts", {
            post: this.props.post,
          });
        }}
        style={styles.container}
      >
        <View
          style={
            this.state.light_theme
              ? styles.lightcardContainer
              : styles.cardContainer
          }
        >
          <View style={styles.authorContainer}>
            <View style={styles.authorImageContainer}>
              <Image
                source={require("../assets/profile_img.png")}
                style={styles.profileImage}
              ></Image>
            </View>
            <View style={styles.authorNameContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.lightauthorNameText
                    : styles.authorNameText
                }
              >
                {this.props.post.author}
              </Text>
            </View>
          </View>
          <Image
            source={require("../assets/IMG_5107.JPG")}
            style={styles.postImage}
          />
          <View style={styles.captionContainer}>
            <Text
              style={
                this.state.light_theme
                  ? styles.lightcaptionText
                  : styles.captionText
              }
            >
              {this.props.post.caption}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
              <Ionicons name={"heart"} size={RFValue} color={"white"} />
              <Text
                style={
                  this.state.light_theme
                    ? styles.lightlikeText
                    : styles.likeText
                }
              >
                50
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "black",
    borderRadius: RFValue(20),
    padding: RFValue(20),
  },
  lightcardContainer: {
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    padding: RFValue(20),
  },
  authorContainer: {
    flex: 0.1,
    flexDirection: "row",
  },
  authorImageContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "200%",
    height: "1500%",
    resizeMode: "contain",
    borderRadius: RFValue(100),
  },
  authorNameContainer: {
    flex: 0.85,
    justifyContent: "center",
  },
  authorNameText: {
    color: "white",
    fontSize: RFValue(15),
  },
  lightauthorNameText: {
    color: "black",
    fontSize: RFValue(15),
  },
  postImage: {
    marginTop: RFValue(20),
    resizeMode: "contain",
    width: "100%",
    alignSelf: "center",
    height: RFValue(275),
  },
  captionContainer: {},
  captionText: {
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10),
  },
  lightcaptionText: {
    fontSize: 13,
    color: "black",
    paddingTop: RFValue(10),
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  lightlikeText: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
