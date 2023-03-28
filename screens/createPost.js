import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

export default class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      previewImage: "image1",
      DropDownHeight: 40,
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
    let preview_images = {
      image1: require("../assets/image_1.jpg"),
      image2: require("../assets/image_2.jpg"),
      image3: require("../assets/image_3.jpg"),
      image4: require("../assets/image_4.jpg"),
      image5: require("../assets/image_5.jpg"),
      image6: require("../assets/image_6.jpg"),
      image7: require("../assets/image_7.jpg"),
    };
    return (
      <View
        style={
          this.state.light_theme ? styles.lightcontainer : styles.container
        }
      >
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.iconImage}
            />
          </View>
          <View style={styles.appTitleTextContainer}>
            <Text
              style={
                this.state.light_theme
                  ? styles.lightappTitleText
                  : styles.appTitleText
              }
            >
              novo post
            </Text>
          </View>
        </View>
        <View style={styles.fieldsContainer}>
          <ScrollView>
            <Image
              source={preview_images[this.state.previewImage]}
              style={styles.previewImage}
            ></Image>
            <View style={{ height: RFValue(this.state.DropDownHeight) }}>
              <DropDownPicker
                items={[
                  { label: "image 1", value: "image1" },
                  { label: "image 2", value: "image2" },
                  { label: "image 3", value: "image3" },
                  { label: "image 4", value: "image4" },
                  { label: "image 5", value: "image5" },
                  { label: "image 6", value: "image6" },
                  { label: "image 7", value: "image7" },
                ]}
                defaultValue={this.state.previewImage}
                containerStyle={{
                  height: 40,
                  borderRadius: 20,
                  marginBottom: 10,
                }}
                onOpen={() => {
                  this.setState({ dropdownHeight: 170 });
                }}
                onClose={() => {
                  this.setState({ dropdownHeight: 40 });
                }}
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "white",
                }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#2a2a2a" }}
                labelStyle={{
                  color: "white",
                }}
                arrowStyle={{
                  color: "white",
                }}
                onChangeItem={(item) =>
                  this.setState({
                    previewImage: item.value,
                  })
                }
                textStyle={{ color: "white" }}
                onSelectItem={(item) =>
                  this.setState({
                    previewImage: item.value,
                  })
                }
              />
            </View>
            <TextInput
              style={
                this.state.light_theme
                  ? styles.lightinputFont
                  : styles.inputFont
              }
              onChangeText={(caption) => this.setState({ caption })}
              placeholder={"caption"}
              placeholderTextColor="white"
            />
          </ScrollView>
        </View>
        <View style={{ flex: 0.08 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  lightcontainer: {
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
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
  },
  lightappTitleText: {
    color: "black",
    fontSize: RFValue(28),
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
  },
  lightinputFont: {
    height: RFValue(40),
    borderColor: "black",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "black",
  },
});
