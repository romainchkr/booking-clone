import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "@/constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.secondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Search",
          headerTitle: "Booking.com",
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'mon-b',
            color: Colors.white
          },
          headerShadowVisible: false,
          headerStyle: {
            height: 100,
            backgroundColor: Colors.primary,
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerRight: () => (
            <FontAwesome name="bell-o" size={24} color={Colors.white} style={{marginRight: 24}} />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />, headerTitleStyle: {
            color: Colors.white,
            fontFamily: 'mon-sb',
          },
          headerStyle: {
            backgroundColor: Colors.primary,
            height: 100,
          },
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          headerTitle: "Trips",
          headerTitleStyle: {
            color: Colors.white,
            fontFamily: 'mon-sb',
          },
          headerStyle: {
            backgroundColor: Colors.primary,
            height: 100,
          },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="suitcase" color={color} />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          headerTitle: "",
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.primary,
            height: 100,
          },
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-circle-o" color={color} />
          ),
          headerRight: () => (
            <FontAwesome name="bell-o" size={24} color={Colors.white} style={{marginRight: 24}} />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
