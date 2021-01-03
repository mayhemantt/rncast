import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import { Ionicons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ProjectsScreen from "../screens/ProjectsScreen";
import CoursesScreen from "../screens/CoursesScreen";

const Tab = createBottomTabNavigator();

const Home = createStackNavigator();

const Courses = createStackNavigator();

const Projects = createStackNavigator();

function HomeStack({ navigation, route }) {
  const routeName = getFocusedRouteNameFromRoute(route);
  React.useLayoutEffect(() => {
    navigation.setOptions({ tabBarVisible: routeName != "Section" });
  }, [navigation, route]);
  console.log(routeName);
  return (
    <Home.Navigator mode="modal" initialRouteName="Home">
      <Home.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Home.Screen
        name="Section"
        component={SectionScreen}
        options={{
          // style: {
          //   position: "absolute",
          //   backgroundColor: "transparent",
          //   zIndex: 100,
          //   top: 0,
          //   left: 0,
          //   right: 0,
          // },
          // headerTransparent: true,
          // headerTitle: false,
          headerShown: false,
        }}
      />
    </Home.Navigator>
  );
}

const CoursesStack = () => (
  <Courses.Navigator initialRouteName="Section">
    <Courses.Screen name="Courses" component={CoursesScreen} />
  </Courses.Navigator>
);

const ProjectsStack = () => (
  <Projects.Navigator initialRouteName="Project">
    <Projects.Screen
      name="Project"
      component={ProjectsScreen}
      options={{ headerShown: false }}
    />
  </Projects.Navigator>
);

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={(route) => {
          return {
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name="home"
                  size={26}
                  color={focused ? activeColor : inactiveColor}
                />
              );
            },
          };
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsStack}
        options={{
          tabBarLabel: "Projects",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="folder"
              size={26}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Course"
        component={CoursesStack}
        options={{
          tabBarLabel: "Course",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="albums"
              size={26}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
