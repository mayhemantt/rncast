import React from "react";
import Styled from "styled-components";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    name: state.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: (name) => dispatch({ type: "UPDATE_NAME", name: name }),
  };
}

class Avatar extends React.Component {
  state = {
    photo:
      "https://res.cloudinary.com/joshihemant/image/upload/v1608996070/exot3z5n0rt8heogssgq.jpg",
  };

  componentDidMount() {
    fetch("https://randomuser.me/api/?gender=female&nat=us")
      .then((response) => response.json())
      .then((response) => {
        this.setState({ photo: response.results[0].picture.large });
        this.props.updateName(
          response.results[0].name.first + " " + response.results[0].name.last
        );
        // console.log(
        //   response.results[0].name.first + " " + response.results[0].name.last
        // );
      })
      .catch((err) => console.log(err));
  }

  render() {
    return <Image source={{ uri: this.state.photo }} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = Styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-left: 10px;
`;
