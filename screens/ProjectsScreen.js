import React from "react";
import Styled from "styled-components";
import Project from "../components/Project";
import { PanResponder, Animated } from "react-native";

function getNextIndex(index) {
  var nextIndex = index + 1;
  if (nextIndex > projects.length - 1) {
    return 0;
  }
  return nextIndex;
}

class ProjectsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(0.9),
      translateY: new Animated.Value(44),
      thirdScale: new Animated.Value(0.8),
      thirdTranslateY: new Animated.Value(44),
      index: 0,
    };
    // console.log("mounted");
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => {
        if (gestureState.dx == 0 && gestureState.dy == 0) {
          return false;
        } else {
          return true;
        }
      },
      onPanResponderGrant: () => {
        Animated.spring(this.state.scale, {
          toValue: 1,
          useNativeDriver: false,
        }).start();
        Animated.spring(this.state.translateY, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
        Animated.spring(this.state.thirdScale, {
          toValue: 0.9,
          useNativeDriver: false,
        }).start();
        Animated.spring(this.state.thirdTranslateY, {
          toValue: 44,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: this.state.pan.x,
            dy: this.state.pan.y,
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
      onPanResponderRelease: () => {
        const positionY = this.state.pan.y.__getValue();
        // console.log(positionY, "gfh");
        // console.log(positionY, "gfh");

        if (positionY < -230) {
          console.log("-230");
          Animated.timing(this.state.pan, {
            toValue: { x: 0, y: -1000 },
            useNativeDriver: false,
          }).start(() => {
            this.state.pan.setValue({ x: 0, y: 0 });
            this.state.scale.setValue(0.9);
            this.state.translateY.setValue(44);
            this.state.thirdScale.setValue(0.8);
            this.state.thirdTranslateY.setValue(-50);
            this.setState({ index: getNextIndex(this.state.index) });
          });
        }
        // || positionY < -230
        else if (positionY > 200) {
          console.log("200");

          Animated.timing(this.state.pan, {
            toValue: { x: 0, y: 1000 },
            useNativeDriver: false,
          }).start(() => {
            this.state.pan.setValue({ x: 0, y: 0 });
            this.state.scale.setValue(0.9);
            this.state.translateY.setValue(44);
            this.state.thirdScale.setValue(0.8);
            this.state.thirdTranslateY.setValue(-50);
            this.setState({ index: getNextIndex(this.state.index) });
          });
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();

          Animated.spring(this.state.scale, {
            toValue: 0.9,
            useNativeDriver: false,
          }).start();
          Animated.spring(this.state.translateY, {
            toValue: 44,
            useNativeDriver: false,
          }).start();

          Animated.spring(this.state.thirdScale, {
            toValue: 0.8,
            useNativeDriver: false,
          }).start();
          Animated.spring(this.state.thirdTranslateY, {
            toValue: -50,
            useNativeDriver: false,
          }).start();
        }
      },
    });
  }

  render() {
    return (
      <Container>
        <Animated.View
          style={{
            transform: [
              { translateX: this.state.pan.x },
              { translateY: this.state.pan.y },
            ],
          }}
          {...this._panResponder.panHandlers}>
          <Project
            shouldClick={true}
            title={projects[this.state.index].title}
            image={projects[this.state.index].image}
            author={projects[this.state.index].author}
            text={projects[this.state.index].text}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY },
            ],
          }}>
          <Project
            shouldClick={false}
            title={projects[getNextIndex(this.state.index)].title}
            image={projects[getNextIndex(this.state.index)].image}
            author={projects[getNextIndex(this.state.index)].author}
            text={projects[getNextIndex(this.state.index)].text}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -3,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              { scale: this.state.thirdScale },
              { translateY: this.state.thirdTranslateY },
            ],
          }}>
          <Project
            shouldClick={false}
            title={projects[getNextIndex(this.state.index + 1)].title}
            image={projects[getNextIndex(this.state.index + 1)].image}
            author={projects[getNextIndex(this.state.index + 1)].author}
            text={projects[getNextIndex(this.state.index + 1)].text}
          />
        </Animated.View>
      </Container>
    );
  }
}

export default ProjectsScreen;

const Container = Styled.View`
    flex:1;
    justify-content:center;
    align-items: center;
    background: #f0f3f5;
`;

const projects = [
  {
    title: "Price Tag",
    image: require("../assets/background5.jpg"),
    author: "Liu Yi",
    text:
      "Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China.",
  },
  {
    title: "The DM App - Ananoumous Chat",
    image: require("../assets/background6.jpg"),
    author: "Chad Goodman",
    text:
      "Design+Code was the first resource I used when breaking into software. I went from knowing nothing about design or code to building a production ready app from scratch. ",
  },
  {
    title: "Nikhiljay",
    image: require("../assets/background7.jpg"),
    author: "Nikhil D'Souza",
    text:
      "Recently finished the React course by @Mengto, and I 10/10 would recommend. I already rewrote my personal website in @reactjs and I'm very excited with it.",
  },
];
