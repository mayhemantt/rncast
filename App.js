import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import TabNavigator from "./navigator/TabNavigator";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql.contentful.com/content/v1/spaces/77vgopavua0u",
  cache: new InMemoryCache(),
  credentials: "same-origin",
  headers: {
    Authorization: `Bearer NefnO44KYbjdWEVxlQLzhFx_tJexX5OJ8O0qR-DMMcE`,
  },
});

const initialState = {
  action: "",
  name: "_",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MENU":
      return { action: "openMenu" };
    case "CLOSE_MENU":
      return { action: "closeMenu" };
    case "UPDATE_NAME":
      return { name: action.name };
    case "OPEN_CARD":
      return { action: "openCard" };
    case "CLOSE_CARD":
      return { action: "closeCard" };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  </ApolloProvider>
);

export default App;
