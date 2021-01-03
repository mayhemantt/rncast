import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
import Course from "../components/Course";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import Avatar from "../components/Avatar";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import ModalLogin from "../components/ModalLogin";
// console.log = function () {};

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitles
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        content
      }
    }
  }
`;

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () => dispatch({ type: "OPEN_MENU" }),
  };
}

const ScreenWidth = Dimensions.get("window").width;

var cardWidth = ScreenWidth - 40;

if (ScreenWidth >= 120) {
  cardWidth = (ScreenWidth - 80) / 3;
}

class HomeScreen extends React.Component {
  state = { scale: new Animated.Value(1), opacity: new Animated.Value(1) };
  componentDidMount() {
    StatusBar.setBarStyle("transparent", true);
  }

  componentDidUpdate() {
    this.toggleMenu();
    StatusBar.setBarStyle("transparent", true);
  }

  toggleMenu() {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        easing: Easing.in(),
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5,
        useNativeDriver: false,
      }).start();

      StatusBar.setBarStyle("transparent", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        useNativeDriver: false,
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
      }).start();
      Animated.spring(this.state.opacity, {
        useNativeDriver: false,
        toValue: 1,
      }).start();
      StatusBar.setBarStyle("transparent", true);
    }
  }

  render() {
    return (
      <RootView>
        {this.props && this.props.action == "openMenu" && <Menu />}
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity,
          }}>
          <SafeAreaView>
            <ScrollView
              view={{ height: "100%" }}
              showsVerticalScrollIndicator={false}
              onScroll={() => StatusBar.setBarStyle("dark-content", true)}
              onScrollToTop={() => StatusBar.setBarStyle("default", true)}>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.props.openMenu}
                  style={{ position: "absolute", top: 0, left: 20 }}>
                  <Avatar />
                </TouchableOpacity>
                <Title>Welcome Back</Title>
                <Container>
                  <Name>{this.props.name}</Name>
                </Container>
                <NotificationIcon
                  style={{ position: "absolute", right: 20, top: 7 }}
                />
              </TitleBar>
              <ScrollView
                style={{
                  flexDirection: "row",
                  padding: 20,
                  paddingLeft: 12,
                  paddingTop: 30,
                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                {logos.map((logo, index) => {
                  return (
                    <Logo
                      key={index}
                      image={{ uri: logo.image }}
                      text={logo.text}
                    />
                  );
                })}
              </ScrollView>
              <SubTitle>{"Continue Learning".toUpperCase()}</SubTitle>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}>
                <Query query={CardsQuery}>
                  {({ loading, error, data }) => {
                    if (error) {
                      return <Message>Error!!</Message>;
                    }
                    if (loading) {
                      return <Message>Loading ..</Message>;
                    }
                    // console.log(data.cardsCollection.items);
                    return (
                      <CardsContainer>
                        {data.cardsCollection.items.map((card, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              this.props.navigation.navigate("Section", {
                                section: card,
                              });
                            }}>
                            <Card
                              title={card.title}
                              image={card.image}
                              caption={card.caption}
                              logo={card.logo}
                              subtitle={card.subtitle}
                              content={card.content}
                            />
                          </TouchableOpacity>
                        ))}
                      </CardsContainer>
                    );
                  }}
                </Query>
                {/* {cards.map((card, index) => {
                  return (
                    
                  );
                })} */}
              </ScrollView>
              <SubTitle>{"Popular Courses".toUpperCase()}</SubTitle>
              <CoursesContainer>
                {courses.map((course, index) => {
                  return (
                    <Course
                      key={index}
                      image={course.image}
                      title={course.title}
                      subtitle={course.subtitle}
                      logo={course.logo}
                      author={course.author}
                      avatar={course.avatar}
                      caption={course.caption}
                    />
                  );
                })}
              </CoursesContainer>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
        <ModalLogin />
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const CoursesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

const SubTitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform: uppercase;
`;

const CardsContainer = styled.View`
  flex-direction: row;
  padding-left: 10px;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const logos = [
  {
    image:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017911/q0n8twwqlw7psqerctca.png",
    text: "Frame X",
  },
  {
    image:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017912/whhicewt2lbwbnzdzpkb.png",
    text: "Figma",
  },
  {
    image:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017908/mkiqtrklok9q9mjeq71t.png",
    text: "Studio",
  },
  {
    image:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017908/hjaf3kjylamwpxp2rfyh.png",
    text: "React",
  },
  {
    image:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017907/rruhpsf2ue8rcoe1sb7c.png",
    text: "Swift",
  },
  {
    image:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017909/xkzubo1y6bq7pnlxrrjk.png",
    text: "Sketch",
  },
];

const courses = [
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017921/irt5djzxpnx47nk36p6a.jpg",
    logo:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017908/mkiqtrklok9q9mjeq71t.png",
    author: "Meng To",
    avatar:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017911/fboaw2evi6baebld75q3.jpg",
    caption: "Design and interactive prototype",
  },
  {
    title: "React for Designers",
    subtitle: "12 sections",
    image:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017922/fsdcugpwc4bnlofiikuz.jpg",
    logo:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017908/hjaf3kjylamwpxp2rfyh.png",
    author: "Meng To",
    avatar:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017911/fboaw2evi6baebld75q3.jpg",
    caption: "Learn to design and code a React site",
  },
  {
    title: "Design and Code with Framer X",
    subtitle: "10 sections",
    image:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017921/cgx94ezaossbhazor6ty.jpg",
    logo:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017911/q0n8twwqlw7psqerctca.png",
    author: "Meng To",
    avatar:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017911/fboaw2evi6baebld75q3.jpg",
    caption: "Create powerful design and code components for your app",
  },
  {
    title: "Design System in Figma",
    subtitle: "10 sections",
    image:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017905/lgfzq7jkq8pqf5xxi6aw.jpg",
    logo:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017912/whhicewt2lbwbnzdzpkb.png",
    author: "Meng To",
    avatar:
      "https://res.cloudinary.com/joshihemant/image/upload/v1609017911/fboaw2evi6baebld75q3.jpg",
    caption:
      "Complete guide to designing a site using a collaborative design tool",
  },
];
