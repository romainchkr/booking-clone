import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "mon": require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();
  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="stay/listing" options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerBackVisible: false,
        }} />
        <Stack.Screen
          name="stay/[id]/index"
          options={{ headerTitle: "Hotel xxx" }}
        />
        <Stack.Screen
          name="stay/[id]/rooms"
          options={{ headerTitle: "Choose rooms" }}
        />
        <Stack.Screen
          name="login"
          options={{
            presentation: "transparentModal",
            title: "Search",
            headerTitle: "Booking.com",
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: 'mon-b',
              color: Colors.white
            },
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={router.back}>
                <FontAwesome name="close" size={24} color={Colors.white} />
              </TouchableOpacity>
            )
          }}
          // options={{ presentation: "modal", title: "Log in or sign up" }}
        />

        <Stack.Screen
          name="(search)/search"
          options={{
            presentation: "transparentModal",
            headerShown: false,
          }}
        />
      </Stack>
    </BottomSheetModalProvider>
  );
}
