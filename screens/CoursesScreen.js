import React from "react";
import Styled from "styled-components";
import { Button } from "react-native";
class CoursesScreen extends React.Component {
  render() {
    return (
      <Container>
        <Text>Courses Screen </Text>
      </Container>
    );
  }
}

export default CoursesScreen;

const Container = Styled.View`
    flex:1;
    justify-content:center;
    align-items: center;
`;

const Text = Styled.Text``;
