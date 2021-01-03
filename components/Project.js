import React from "react";
import styled from "styled-components";
import { Animated, Dimensions, StatusBar } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class Project extends React.Component {
  state = {
    cardWidth: new Animated.Value(290),
    cardHeight: new Animated.Value(470),
    titleTop: new Animated.Value(20),
  };

  componentDidUpdate() {
    this.closeCard();
  }

  closeCard = () => {
    console.log("CLOSE");
    Animated.spring(this.state.cardWidth, {
      toValue: 290,
      useNativeDriver: false,
    }).start();
    Animated.spring(this.state.cardHeight, {
      toValue: 470,
      useNativeDriver: false,
    }).start();
    Animated.spring(this.state.titleTop, {
      toValue: 20,
      useNativeDriver: false,
    }).start();
    console.log(this.state.cardHeight, "hre8hg");
  };
  openCard = () => {
    Animated.spring(this.state.cardWidth, {
      toValue: screenWidth,
      useNativeDriver: false,
    }).start();
    Animated.spring(this.state.cardHeight, {
      toValue: screenHeight,
      useNativeDriver: false,
    }).start();
    Animated.spring(this.state.titleTop, {
      toValue: 40,
      useNativeDriver: false,
    }).start();
    console.log(this.state.cardHeight, "hre8hg");
    StatusBar.setBarStyle("transparent", true);
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={
          this.props.shouldClick ? this.openCard : console.log("no click")
        }>
        <AnimatedContainer
          style={{
            width: this.state.cardWidth,
            height: this.state.cardHeight,
          }}>
          <Cover>
            <Image source={this.props.image} />
            <AnimatedTitle
              style={{
                top: this.state.titleTop,
              }}>
              {this.props.title}
            </AnimatedTitle>
            <Author>by {this.props.author}</Author>
          </Cover>
          <Text>{this.props.text}</Text>
        </AnimatedContainer>
      </TouchableWithoutFeedback>
    );
  }
}

export default Project;

const Container = styled.View`
  width: 290px;
  height: 470px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 270px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  height: 270px;
  width: 100%;
`;

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 300px;
`;

const AnimatedTitle = Animated.createAnimatedComponent(Title);
const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`;
