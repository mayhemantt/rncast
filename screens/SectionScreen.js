import React from "react";
import Styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions, StatusBar } from "react-native";
import Markdown from "react-native-showdown";

const TopPos = StatusBar.currentHeight;

// console.log = function () {};

class SectionScreen extends React.Component {
  state = { imageHeight: 320 };

  componentDidMount() {
    StatusBar.setBarStyle("transparent", true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle("transparent", true);
  }
  reduceImageHeight() {
    this.setState({ imageHeight: 150 });
  }

  increaseImageHeight() {
    this.setState({ imageHeight: 300 });
    // console.log("I am triggered and state is: ", this.state.imageHeight);
  }

  render() {
    const { navigation, route } = this.props;
    const { section } = route.params;
    return (
      <Container>
        <Cover style={{ height: this.state.imageHeight }}>
          <Image
            source={{
              uri: section.image.url,
            }}
            style={{ height: this.state.imageHeight }}
          />

          {this.state.imageHeight > 300 && (
            <Wrapper style={{ paddingTop: 9 }}>
              <Logo
                Source={{
                  uri: section.logo.url,
                }}
              />
              <Subtitle>{section.subtitles}</Subtitle>
            </Wrapper>
          )}
          <TouchableOpacity
            style={{
              top: TopPos,
              left: 300,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <CloseView>
              <Ionicons
                name="close"
                size={44}
                color="#f8faf5"
                // style={{ marginTop: -2 }}
              />
            </CloseView>
          </TouchableOpacity>
          <Title>{section.title}</Title>
          {this.state.imageHeight > 300 && <Caption>{section.caption}</Caption>}
          {/* </ScrollView> */}
        </Cover>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={(e) => {
            var windowHeight = Dimensions.get("window").height,
              height = e.nativeEvent.contentSize.height,
              offset = e.nativeEvent.contentOffset.y;
            if (windowHeight + offset >= height + 110) {
              return this.increaseImageHeight();
            }
            return this.reduceImageHeight();
          }}
          onScrollToTop={(e) => this.increaseImageHeight()}
          onScrollToTop={(e) => this.increaseImageHeight()}
          bounces={true}
          bouncesZoom={true}
          // refreshControl={
          //   <RefreshControl onRefresh={this.increaseImageHeight()} />
          // }
          alwaysBounceVertical={true}
          scrollToOverflowEnabled={true}>
          <Content>
            <Markdown
              body={section.content}
              pureCSS={htmlStyles}
              scalesPageToFit={false}
              scrollEnabled={false}
              style={{ backgroundColor: "transparent" }}
              showsVerticalScrollIndicator={false}
            />
          </Content>
        </ScrollView>
      </Container>
    );
  }
}

const htmlContent = `
  <h2> This is a title</h2>
  <p>This iu <strong>content</strong></p>
  <a href="google.com">Link</a>
  <img src="https://images.ctfassets.net/77vgopavua0u/76NZRyYcrhr6Yi9uGXlRCZ/25ada1e395f9d086574d937bf1335d43/background7.orig.jpg" />
`;

const htmlStyles = `
  <style>
    *{
      font-family: -apple-system, Roboto;
      margin:0;
      padding: 0;
      background-color: "transparent";
    }
    img {
      width: 100%;
      border-radius: 10px;
      margin-top:20px;
    }
  </style>
`;

export default SectionScreen;

const Content = Styled.View`
  height: 1000px;
  padding: 20px 0px 30px;
`;
const Container = Styled.View`
    flex:1;
    position: relative;
`;

const Wrapper = Styled.View`
  flex-direction:row;
  position: absolute;
  top: ${TopPos}px;
  align-items: center;
  left: 20px;
`;

const Logo = Styled.Image`
  width:24px;
  height:24px;
  position: absolute;
`;

const Subtitle = Styled.Text`
  font-size:15px;
  font-weight:600;
  color:rgba(255,255,255,0.8);
  margin-left: 5px;
  text-transform:uppercase
`;

const Title = Styled.Text`
  font-size:24px;
  color:white;
  font-weight:bold;
  width:170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;
const Cover = Styled.View`

`;
const Image = Styled.Image`
  width:100%;

  position: absolute;
`;
const Caption = Styled.Text`
  color:white;
  font-size: 17px;
  position: absolute;
  bottom:20px;
  left:20px;
  width: 300px;
`;

const CloseView = Styled.View`
  width:44px;
  height:44px;
  /* background:white; */
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content:center;
  align-items: center;
`;
